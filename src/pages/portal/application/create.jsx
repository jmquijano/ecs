import { Grid, GridItem, Container, Heading, Text, Button, Stack, Box } from "@chakra-ui/react"
import { Fragment } from "react"
import { BiArrowToLeft, BiCaretRight, BiChevronLeft, BiPlus } from "react-icons/bi"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async";


export default function CreateApplication () {
    return (
        <Fragment>
            <Helmet>
                <title>Create New Application</title>
            </Helmet>
            <Container 
                maxWidth={'1200px'}
                py={[5, 5, 5, 5, 10]}
            >
                <Grid templateColumns={'repeat(12, 1fr)'} width={'100%'} gap={[2, 5, 10, 10]}>
                    <GridItem 
                        colSpan={[12, 6, 6, 6, 6]} 
                        maxWidth={'100%'}
                    >
                        <Heading 
                            color={'brand.300'}
                            fontSize={['150%']}
                            cursor={'pointer'}
                        >
                            Create New Application
                        </Heading>
                    </GridItem>
                    <GridItem 
                        colSpan={[12, 6, 6, 6, 6]} 
                        maxWidth={'100%'}
                    >
                        <Stack 
                            direction={'row'}
                            justify={'end'}
                        >
                            <Link to={'/application'} style={{
                                width: '100%',
                                textAlign: 'right'
                            }}>
                                <Button 
                                    width={['100%', 'auto', 'auto', 'auto']}
                                    my={[3, 0, 0, 0]}
                                    colorScheme={'brand.200'} 
                                    variant={'outline'}
                                    fontSize={13}
                                    px={4}
                                    py={2}
                                    borderRadius={'full'}
                                    fontWeight={600}
                                >
                                    <BiChevronLeft fontSize={25} />
                                    <Text ml={0}>
                                        Back to My Application
                                    </Text>
                                </Button>
                            </Link>
                            
                        </Stack>
                    </GridItem>
                </Grid>
                <Box
                    bg={'white'}
                    width={'100%'}
                    minHeight={'60vh'}
                    borderRadius={10}
                    border={'1px solid'}
                    borderColor={'gray.200'}
                    mt={5}
                    overflowX={'scroll'}
                >
                    <Stack direction={'column'}>
                        <Box background={'gray.100'} py={3} px={4}>
                        </Box>
                    </Stack>

                </Box>
            </Container>
        </Fragment>
    )
}