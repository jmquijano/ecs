import { Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { deleteUploadedFile, fetchUploadedFilesApplicationById, uploadFilesByApplicationId } from "../../../../../utils/fetch/application";
import { fetchDocType } from "../../../../../utils/fetch/basedata";
import FileManager from "../../../reusable-layout/filemanager";
import serialize from "../../../reusable-layout/filemanager/serialize";
import Upload from "../../../reusable-layout/filemanager/upload";
import Viewer from "../../../reusable-layout/filemanager/viewer";

export default function Documents(props) {

    // loading state
    const [loading, setLoading] = useState(false);

    // Get the application id from the props
    const { id } = props;

    // uploaded files state
    const [files, setFiles] = useState([]);

    // file upload state
    const [fileUpload, setFileUpload] = useState({});

    // File viewer state
    const [fileViewer, setFileViewer] = useState(null);

    // The purpose of this state is to set the upload state whether or not the file is being uploaded.
    const [uploadState, setUploadState] = useState(false);

    // The purpose of this state is to set whether or not the file list is in loading state.
    const [fileListLoadingState, setFileListLoadingState] = useState(false);

    // The purpose of this state is to store the file that is currently being uploaded, so that a progress bar can be shown.
    const [fileUploadQueue, setFileUploadQueue] = useState([]);

    // Handle Opening the file.
    const handleOpenFile = (e) => {
        setFileViewer({
            ...e,
            isOpen: fileViewer?.isOpen ? false : true
        });
    }

    // Handle Closing the file.
    const handleCloseFile = (e) => {
        setFileViewer({
            ...e,
            isOpen: fileViewer?.isOpen ? false : true
        });
    }

    // Handle the fetching of the uploaded files
    const handleFetchUploadedFiles = (disableLoading = false, finallyClbk) => {
        fetchUploadedFilesApplicationById(
            () => !disableLoading ? setFileListLoadingState(true) : null,
            id
        )
        .then(res => res.json())
        .then(res => {
            setFiles(res?.data);

            finallyClbk();
        })
        .catch(e => { setFileListLoadingState(false); })
        .finally(e => { setFileListLoadingState(false); })
    }

    // Handle toggle file upload
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
            handleFetchUploadedFiles(true, () => {
                setFileRemoveLoadState(e, false);
            });
        })
        .finally(res => {
            handleFetchUploadedFiles();
        });
        
    }

    // Use effect to fetch files
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


    // Monitor fileUploadQueue
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
                // Set ToogleFileUpload to false
                handleToggleFileUpload(null, true);
                handleFetchUploadedFiles(false);
            } else {
                // console.log('not all done');
            }
        }

        

    }, [fileUploadQueue]);

    return (
        <>
            <FileManager
                files={serialize(files)}
                onOpen={handleOpenFile}
                onRemove={handleRemoveFile}
                onAddFile={handleToggleFileUpload}
                title={'Uploaded Files'}
                styleProps={{
                    title: {
                        fontSize: 15
                    }
                }}
                noFilesText={
                    <>
                        <Text 
                            fontSize={13} 
                            textAlign={'center'} 
                            display={'block'}
                        >
                            You haven't added any file.
                        </Text>
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
                />
            </FileManager>
        </>
    )
}