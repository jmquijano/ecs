import { Center, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { Document } from "react-pdf";
import PDFViewer from 'pdf-viewer-reactjs'
import { Fragment, useEffect } from "react";
import { Loader } from "../../../loaders";
import "../../../../css/pdfviewer.css";

export default function Viewer(props) {
    useEffect(() => {
        // console.log(props?.path);
    }, [props])
    return (
        <Fragment>
            <Modal 
                isOpen={props?.isOpen}
                isCentered={true}
                bg={'transparent'}
                scrollBehavior={'inside'}
            >
                <ModalOverlay 
                    bg={'blackAlpha.500'} 
                    backdropFilter='blur(5px)'
                />
                
                <ModalContent
                    bg={'white'}
                    shadow={'none'}
                    h={'100%'}
                    width={'100%'}
                    maxWidth={'1200px'}
                    mx={5}
                >

                    <ModalHeader
                        color={'white'}
                        bg={'brand.200'}
                        borderBottom={'1px solid'} 
                        borderBottomColor={'gray.200'}
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        <Text fontSize={14}>{props?.name}</Text>

                        <ModalCloseButton onClick={props?.onClose} />
                    </ModalHeader>
                    
                    <ModalBody px={0} py={0} textAlign={'center'}>
                        
                            <PDFViewer
                                
                                document={{
                                    url: props?.path,
                                }}
                                canvasCss={'pdfViewerCanvas'}
                                loader={<Center><Loader.Default size={35}/></Center>}
                            />
                        
                        
                        
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Fragment>
    )
}