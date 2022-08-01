import { 
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalOverlay, 
    ModalCloseButton, 
    Box, 
    Text, 
    ModalBody
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Fragment } from "react";
import Form from "./form";

export default function Add(props) {
    
    return (
        <Fragment>
            <Modal
                isOpen={props?.isOpen}
                isCentered
            >
                <ModalOverlay 
                    bg={'blackAlpha.500'} 
                    backdropFilter='blur(0px)' 
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
                    >
                        <Box 
                            alignItems={'center'}
                        >
                            <Text fontSize={14}>Add Equipment</Text>
                            <ModalCloseButton 
                                display={'flex'}
                                onClick={props?.onClose} 
                                _focus={{
                                    outline: 0
                                }}

                            />
                        </Box>
                    </ModalHeader>

                    <ModalBody>
                        <Box
                            px={4}
                            py={4}
                            mb={5}
                        >
                            <Form />
                        </Box>
                        
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Fragment>
    )
}