import { Fragment, useEffect, useState } from "react"
import { 
    Box, Input, Modal, ModalBody, ModalCloseButton, 
    ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, 
    Text, Stack, Divider, Button, Center
} from "@chakra-ui/react";
import {useDropzone} from 'react-dropzone';
import "../../../../../css/dropzone.css";
import UIButton from "../../button/UIButton";
import Item from "./item";
import QueueAnim from 'rc-queue-anim';
import { Loader } from "../../../../loaders";


function getFileExtension(filename) {
    return filename.split('.').pop();
}

export default function Upload(props) {
    const [filesForUpload, setFilesForUpload] = useState([]);
    const [uploadState, setUploadState] = useState(false);
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();  
    
    useEffect(() => {
        setFilesForUpload([]);
    }, [props?.isOpen]);

    // Monitor changes/updates on acceptedFiles
    useEffect(() => {
        acceptedFiles?.map((file) => {
            file = {
                docType: null,
                extension: getFileExtension(file?.name),
                file: file
            }
            setFilesForUpload(filesForUpload => [...filesForUpload, file]);
        })
    }, [acceptedFiles])

    // Monitor changes on filesForUpload
    useEffect(() => {
        // set uploadState to true when there is no file to upload, shorthand
        setUploadState(filesForUpload.length === 0);

        // search for each file in filesForUpload to see if docType is set then set uploadState to false if not set uploadState to true
        filesForUpload.map((file) => {
            if (file.docType === null) {
                setUploadState(true);
            }
        })
    }, [filesForUpload]);

    // Remove
    const handleFileRemove = (k) => {
        let a = filesForUpload?.splice(0);
        a?.splice(k, 1);
        setFilesForUpload(a)
    }

    // Doc Type
    const handleFileDocTypeChange = (i, e) => {
        // update docType as integer of file at index i
        let a = filesForUpload?.splice(0);
        a[i].docType = e?.target?.value >= 1 ? parseInt(e?.target?.value) : null;
        setFilesForUpload(a);
    }

    // Handle Upload
    const handleUpload = () => {
        // check if there is no file to upload
        if (filesForUpload.length === 0) {
            alert("No file to upload");
            return;
        } else {
            // check if there is no docType set
            if (filesForUpload.some(file => file.docType === null)) {
                alert("Please select a document type");
                return;
            }
        }

        props?.onUpload(filesForUpload)
    }

    // Handle props.progress
    useEffect(() => {
        // check if status props?.progress[i].status contains 'in_progress'
        if (props?.progress?.some(p => p.status === 'in_progress')) {
            setUploadState(true);
        } else {
            setUploadState(false);
        }

    }, [props?.progress]);

    

    return (
        <Fragment>
            <Modal
                isOpen={props?.isOpen}
                isCentered={true}
                bg={'transparent'}
                scrollBehavior={'inside'}
                onClose={props?.onClose}
                borderRadius={8}
                transition={'all ease 0.3s'}
            >
                <ModalOverlay 
                    bg={'blackAlpha.500'} 
                    backdropFilter='blur(2px)'
                />

                <ModalContent
                    bg={'white'}
                    shadow={'none'}
                    h={'auto'}
                    width={'100%'}
                    maxWidth={'600px'}
                    mx={5}
                    borderRadius={8}
                    transition={'all ease 0.3s'}
                >
                    <ModalHeader
                        color={'brand.200'}
                        borderBottom={'1px solid'}
                        borderBottomColor={'gray.100'}
                        
                        borderRadius={8}
                        alignItems={'center'}
                        justifyContent={'center'}
                        
                    >
                        <Box mt={1} mb={5}>
                            <Text fontSize={14}>Upload File</Text>
                            <ModalCloseButton 
                                display={'inline-block'}
                                onClick={props?.onClose} 
                                _focus={{
                                    outline: 0
                                }}
                            />
                        </Box>
                        

                        <Box 
                            as={'div'} 
                            {...getRootProps({
                                className: 'dropzone'
                            })}
                        >
                            <Input {...getInputProps()} />
                            <Text 
                                cursor={'pointer'} 
                                fontSize={13}
                            >
                                Drag files here
                            </Text>
                            <Text 
                                cursor={'pointer'} 
                                fontSize={13} 
                                ml={2}
                            >
                                or
                            </Text>
                            <Text 
                                fontSize={13} 
                                ml={2} 
                                color={'brand.200'} 
                                fontWeight={'bold'}
                                cursor={'pointer'}
                            >
                                Choose Files
                            </Text>
                        </Box>
                    </ModalHeader>
                    
                    {filesForUpload?.length >= 1
                    ?
                    <ModalBody>
                        <Box
                            px={1}
                            py={4}
                        >
                            <Stack direction={'column'}>
                                
                                <Box
                                    maxHeight={'500px'}
                                    overflow={'y'}
                                >
                                    <Stack direction={'column'}>
                                {
                                    
                                    <QueueAnim
                                        type={['right', 'left']} 
                                        reversed
                                    >
                                    { 
                                        filesForUpload?.map((file, i) => (
                                        <div key={i + 1} style={{
                                            marginBottom: '15px'
                                        }}>
                                            <Item 
                                                key={i} 
                                                index={i}
                                                
                                                {...file} 
                                                docTypeSelector={props?.docType} 
                                                onRemove={handleFileRemove}
                                                onDocTypeChange={handleFileDocTypeChange}
                                            />
                                        </div>
                                        ))
                                    }
                                    </QueueAnim>
                                    
                                    
                                }
                                    </Stack>
                                </Box>
                            </Stack>
                        </Box>
                    </ModalBody>
                    :
                    ''}
                    
                    <ModalFooter>
                        <Box
                            width={'100%'}
                            textAlign={'right'}
                        >
                            <UIButton
                                width={'auto'}
                                disabled={uploadState}
                                onClick={handleUpload}
                            >
                                {
                                    props?.progress?.some(p => p.status === 'in_progress') ?
                                    <Loader.Default size={'sm'} mr={2}/>
                                    :
                                    ''
                                }
                                
                                Upload
                            </UIButton>
                        </Box>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Fragment>
    )
}