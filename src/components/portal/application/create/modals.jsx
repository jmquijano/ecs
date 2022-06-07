import { Button, Center, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack } from "@chakra-ui/react"
import { Loader } from "../../../loaders"
import { DPPStatement } from "../../../misc/privacypolicy"

function LoadingModal(props) {
    return (
        <Modal isOpen={props?.isOpen} isCentered bg={'transparent'}>
            <ModalOverlay 
                bg='blackAlpha.500'
            />
            <ModalContent bg={'transparent'} shadow={'none'} w={'auto'} h={'auto'} px={4} py={4}>
                <Center
                    alignItems={'center'}
                    alignContent={'center'}
                >
                    <Loader.PulseLoader color={'white'} />
                </Center>
                
            </ModalContent>
        </Modal>
    )
}

function DataPrivacyPolicyModal(props) {
    return (
        <Modal 
            isOpen={props?.isOpen} 
            isCentered 
            bg={'transparent'}
            scrollBehavior={'inside'}
        >
            <ModalOverlay
                bg='blackAlpha.500'
            />
            
            <ModalContent 
                bg={'white'} 
                shadow={'none'} 
                
                h={'auto'}
                width={'100%'} 
                maxWidth={'800px'}
            >
                <ModalHeader 
                    color={'white'}
                    bg={'brand.200'}
                    borderBottom={'1px solid'} 
                    borderBottomColor={'gray.200'}
                >
                    Data Privacy Policy
                </ModalHeader>
                <ModalBody>
                    <DPPStatement 
                        container={{
                            py: 2
                        }}
                    />
                </ModalBody>
                
                <ModalFooter>
                    <Stack direction={'row'}>
                        <Button 
                            width={['100%', 'auto']}
                            colorScheme={'brand'}
                            variant={'outline'}
                            borderRadius={'full'}
                            fontSize={16}
                            py={'1em'}
                            px={'2em'}
                            fontWeight={400} 
                            onClick={props?.onClose}
                            
                        >
                            Close
                        </Button>
                        <Button 
                            width={['100%', 'auto']}
                            colorScheme={'brand'}
                            variant={'active'}
                            borderRadius={'full'}
                            fontSize={16}
                            py={'1em'}
                            px={'2em'}
                            fontWeight={400} 
                            onClick={props?.onAgree}
                        >
                            I agree
                        </Button>
                        
                    </Stack>
                    
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export { LoadingModal, DataPrivacyPolicyModal }