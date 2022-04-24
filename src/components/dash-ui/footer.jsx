import { Box, Badge, Container, Divider, Grid, GridItem, Image, Stack, Text } from '@chakra-ui/react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

function AppFooter() {
    return (
        <Fragment>
            <Box
                bg={'rgba(0,0,0,0.03)'}
                width={'100%'}
                minHeight={'70px'}
                alignItems={'center'}
                display={'flex'}
                py={6}
                
            >
                <Container 
                    maxWidth={'1200px'}
                >
                    <Stack direction={'row'} mb={5}>
                        <Link to={'/about'}>
                            <Text fontSize={12} color={'brand.400'} fontWeight={'bold'} cursor={'pointer'} mr={3}>About ECS</Text>
                        </Link>
                        <Link to={'/privacy-policy'}>
                            <Text fontSize={12} color={'brand.400'} fontWeight={'bold'} cursor={'pointer'} mr={3}>Privacy Policy</Text>
                        </Link>
                        <Link to={'/contact'}>
                            <Text fontSize={12} color={'brand.400'} fontWeight={'bold'} cursor={'pointer'} mr={3}>Contact Us</Text>
                        </Link>
                        
                    </Stack>
                    <Grid
                        templateColumns={'repeat(12, 1fr)'} 
                        width={'100%'} 
                        height={'100%'}
                        gap={2}
                        alignItems={'center'}
                    >
                       <GridItem colSpan={[8, 8, 8, 6]}>
                           <Stack direction={['column', 'column', 'column', 'column', 'row']}>
                            <Text 
                                    color={'gray.500'} 
                                    fontWeight={'bold'}
                                    fontSize={18}
                                >
                                    BFP ECS
                                </Text>
                                <Box px={1.5}>
                                    <Box width={'1px'} height={'100%'} bg={'gray.500'} />
                                </Box>
                                <Text 
                                    color={'gray.500'} 
                                    
                                    fontWeight={300}
                                    fontSize={11}
                                >
                                    An application developed for the Bureau of Fire Protection (Region 11), <br />In partial fulfillment of <b>IT Capstone Project</b>.
                                </Text>
                                
                           </Stack>
                           
                        </GridItem> 

                        <GridItem colSpan={[4, 4, 4, 6]}>
                            <Stack
                                direction='row'
                                justify={'end'}
                            >
                                <Badge colorScheme={'green'} textTransform={'none'} cursor={'pointer'} p={2}>v{process.env.REACT_APP_VERSION}</Badge>
                            </Stack>
                        </GridItem>
                    </Grid>
                    
                </Container>
                
            </Box>
        </Fragment>
    );
}

export { AppFooter }