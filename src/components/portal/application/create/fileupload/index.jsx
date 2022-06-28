import { Box, Center, Grid, GridItem, Input, Stack, Text } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUploadedFile, fetchUploadedFilesApplicationById, uploadFilesByApplicationId } from "../../../../../utils/fetch/application";
import { fetchDocType } from "../../../../../utils/fetch/basedata";
import { PageBaseUrl, PageRouteWithParam } from "../../../../../utils/urlbase";
import { Loader } from "../../../../loaders";
import UIButton from "../../../reusable-layout/button/UIButton";
import FileManager from "../../../reusable-layout/filemanager";
import Upload from "../../../reusable-layout/filemanager/upload";
import Viewer from "../../../reusable-layout/filemanager/viewer";
import ApplicationDetails from "./applicationdetails";

function serializeFile(f) {
    let serialize = [];
    if (f instanceof Object) {
        // Map
        f?.map((d) => {
            if (d?.context?.path !== null) {
                serialize.push({
                    id: d?.id,
                    path: d?.context?.path,
                    name: d?.context?.file?.name,
                    mimetype: d?.context?.file?.mime_type,
                    extension: d?.context?.file?.extension,
                    size: d?.context?.file?.size,
                    checksum: {
                        md5: d?.context?.hash?.md5,
                        sha1: d?.context?.hash?.sha1,
                        sha256: d?.context?.hash?.sha256
                    },
                    isRemoving: d?.isRemoving,
                    created_at: d?.created_at,
                    locale: 'en-ph'
                });
            }
            
        })
        // console.log(serialize);
        return serialize;
    }
}

export default function FileUpload(props) {
    const { id, applicationData } = props;

    // useNavigate
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState([]);
    const [fileViewer, setFileViewer] = useState({});
    const [fileUpload, setFileUpload] = useState({});

    // The purpose of this state is to store the file that is currently being uploaded, so that a progress bar can be shown.
    const [fileUploadQueue, setFileUploadQueue] = useState([]);
    // The purpose of this state is to set the upload state whether or not the file is being uploaded.
    const [uploadState, setUploadState] = useState(false);
    // The purpose of this state is to set whether or not the file list is in loading state.
    const [fileListLoadingState, setFileListLoadingState] = useState(false);

    // Handle fetching of Uploaded Files
    const handleFetchUploadedFiles = (disableLoading = false, finallyClbk) => {
        fetchUploadedFilesApplicationById(
            () => !disableLoading ? setFileListLoadingState(true) : null,
            id
        )
        .then(res => res.json())
        .then(res => {
            if (res?.success) {
                setFiles(res?.data);
            } else {

            }

            finallyClbk();
        })
        .catch(e => { setFileListLoadingState(false); })
        .finally(e => { setFileListLoadingState(false); })
    }

    // Navigate to the next step
    
    // Handle next step
    const handleNextStep = () => {
        navigate(
            PageRouteWithParam({
                'id': id,
                'path': 'submit'
            }, PageBaseUrl?.Application?.New?.WithType)
        )
    }

    useEffect(() => {
        handleFetchUploadedFiles();

        fetchDocType(
            () => setLoading(true)
        )
            .then(res => res.json())
            .then(res => {
                if (res?.success) {
                    setFileUpload({
                        ...fileUpload,
                        docType: res?.data
                    });
                }
            })
            .finally(e => setLoading(false))

    }, [id]);

    const handleOpenFile = (e) => {
        setFileViewer({
            ...e,
            isOpen: fileViewer?.isOpen ? false : true
        });
    }

    const handleCloseFile = (e) => {
        setFileViewer({
            isOpen: fileViewer?.isOpen ? false : true
        });
    }

    const handleToggleFileUpload = (e, forcedClose = false) => {
        setFileUpload({
            ...fileUpload,
            isOpen: forcedClose ? false : (fileUpload?.isOpen ? false : true)
        })
    }

    // Handle update of index in fileUploadQueue
    const handleFileUploadQueueUpdate = (i, progressPercentage, status) => {
        let a = fileUploadQueue?.splice(0);
        a[i] = {
            id: i,
            status: status,
            percentage: progressPercentage
        };
        setFileUploadQueue(fileUploadQueue => a);
    }

    
    
    // Handle file upload
    const handleUploadFile = (e) => {
        if (e?.length >= 1) {
            // For each element in e, upload to server
            e.map((file, i) => {
                // read file
                const formdata = new FormData();
                formdata.append('document', file.file, file?.file?.name);
                
                uploadFilesByApplicationId(
                    () => setUploadState(true),
                    // Application ID
                    id,
                    // Document Type
                    file?.docType,
                    // Form data to be uploaded
                    formdata,
                    // Handle progress
                    (p) => {
                        // console.log(p.loaded / p.total);
                        handleFileUploadQueueUpdate(i, (p.loaded / p.total) * 100, 'in_progress');
                    }
                )
                .then(res => res.json())
                .then(res => {
                    if (res?.success) {
                        
                    } else {
                        alert(res?.message);
                    }
                })
                .finally(e => {
                    setUploadState(false);
                    handleFileUploadQueueUpdate(i, 100, 'done')
                })
            });
            
        }
    }

    const setFileRemoveLoadState = (e, state) => {
        // find in files[x].id === e.id && set files[x].removeLoadState = true;
        let a = files?.splice(0);
        a.map((file, i) => {
            if (file?.id === e?.id) {
                a[i] = {
                    ...file,
                    isRemoving: state
                }

                setFiles(a);
            }
        });
    }

    const handleRemoveFile = (e) => {
        // console.log(e);

        deleteUploadedFile(
            () => {
                setFileRemoveLoadState(e, true);
            },
            id,
            e?.id
        )
        .then(res => res.json())
        .then(res => {
            if (res?.success) {
                // DisableLoading = true;
                handleFetchUploadedFiles(true, () => {
                    setFileRemoveLoadState(e, false);
                });
            } else {
                alert(res?.message);
            }
        })
        .finally(e => {
            
        });
        
    }

    useEffect(() => {
        // Find fileUploadQueue[i]?.status if all are done, then set uploadState to false
        if (fileUploadQueue?.length > 0) {
            let allDone = true;
            fileUploadQueue?.map((d) => {
                if (d?.status !== 'done') {
                    allDone = false;
                }
            })
            if (allDone) {
                // console.log('All done');
                // window.location.reload();

                // Set ToogleFileUpload to false
                handleToggleFileUpload(null, true);
                handleFetchUploadedFiles(false);
            } else {
                console.log('not all done');
            }
        }

        

    }, [fileUploadQueue]);

    return (
        <Box minHeight={'auto'} mt={'0 !important'}>
            {loading ?
                <Center height={'40vh'}>
                    <Loader.Default size={'xl'} thickness={'5px'} />
                </Center>
                :
                <>
                    <ApplicationDetails {...applicationData} />
                    <FileManager 
                        files={serializeFile(files)} 
                        onOpen={handleOpenFile} 
                        onRemove={handleRemoveFile}
                        onAddFile={handleToggleFileUpload}
                        noFilesText={
                            <>
                                <Text fontSize={13} textAlign={'center'} display={'block'}>You haven't added any file.</Text>
                                <Text fontSize={10} display={'block'}>You can still add files after submission.</Text>
                            </>
                            
                        }
                        isFileListLoading={fileListLoadingState}
                    >

                        <Viewer 
                            {...fileViewer} 
                            onClose={handleCloseFile} 
                        />
                        <Upload 
                            {...fileUpload} 
                            onClose={handleToggleFileUpload}
                            onUpload={handleUploadFile}
                            progress={fileUploadQueue}
                    
                        >
                            
                        </Upload>
                        <Box px={[5, 5, 10, 10]} py={[5, 5, 5, 5]}>
                            <Stack direction={'row'} justifyContent={'end'} alignItems={'center'}>
                                <UIButton 
                                    variant={'active'}
                                    onClick={handleNextStep}
                                >
                                    Next
                                </UIButton>
                            </Stack>
                        </Box>
                        
                    </FileManager>
                    
                </>
            }
        </Box>
    );
}