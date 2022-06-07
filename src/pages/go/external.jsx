import { Box, Image, Center, Container, Text, Stack, Button } from "@chakra-ui/react";
import ecs_logo from '../../assets/images/ECS-Logo-300dpi.png';
import { useSearchParams } from 'react-router-dom';
import base64 from 'base-64';

function GoExternalLink() {
    const [searchParams] = useSearchParams();

    const extLink = base64.decode(searchParams.get('u'));

    return (
        <Box>
            <Container maxWidth={'1200px'}>
                <Box py={5} px={3} borderBottom={'1px solid'} borderBottomColor={'gray.200'}>
                    <Stack direction={'row'} alignItems={'center'} textAlign={'center'}>
                        <Image src={ecs_logo} width={'auto'} height={'40px'} textAlign={'center'} />
                        <Text 
                            textAlign={'center'} 
                            display={'inline-block'}
                            fontSize={16}
                            fontWeight={'bold'}
                            color={'gray.500'}
                        >
                            External Link Warning
                        </Text>
                    </Stack>
                </Box>

                <Center height={'70vh'}>
                    <Stack direction={'column'}>
                        <Box 
                            mt={10}
                            py={5} 
                            px={3} 
                            border={'0px solid'} 
                            borderColor={'gray.200'}
                            width={'100%'}
                            maxWidth={'600px'}
                            textAlign={'center'}
                        >
                            <Text fontSize={15}>
                                By clicking the "Proceed" button, you will be leaving "BFP-ECS" and you will then be redirected to "<b>{extLink}</b>".
                            </Text>
                            
                        </Box>

                        <Button colorScheme={'brand'} onClick={() => {
                            window.location.assign(extLink);
                        }}>Proceed</Button>
                    </Stack>
                    
                </Center>
                
            </Container>
            
            
        </Box>

    );
}

export { GoExternalLink }