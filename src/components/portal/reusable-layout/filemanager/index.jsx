import { Box, Center, Container, Grid, GridItem, Stack, Text, Progress } from "@chakra-ui/react";
import { cloneElement, Fragment, useEffect } from "react";
import { BiChevronLeft, BiChevronRight, BiUpload } from "react-icons/bi";
import UIButton from "../button/UIButton";
import Item from "./item";
import Footer from "./footer";

export default function FileManager(props) {
    const Child = cloneElement(props?.children);

    // Style Props
    const { styleProps } = props;

    useEffect(() => {
        
    }, [props]);

    return (
        <Fragment>
            <Container
                maxWidth={'100%'}
                py={0}
                px={0}
                minHeight={'auto'}
            >

                <Grid
                    templateColumns={'repeat(12, 1fr)'} 
                    width={'100%'} 
                    gap={0}
                    marginTop={'0px !important'}
                >
                    <GridItem
                        colSpan={[12, 12, 12, 12]}
                    >
                        <Stack
                            direction={['column', 'column', 'row', 'row']}
                            alignItems={'center'}
                            borderBottom={'1px solid'}
                            borderBottomColor={'gray.200'}
                            py={2}
                            px={10}
                        >
                            <Box
                                fontWeight={'800'}
                            >
                                <Text 
                                    color={ styleProps?.title?.color ?? 'gray.600'}
                                    fontSize={ styleProps?.title?.fontSize ?? 15}
                                >
                                    { props?.title ?? 'My Uploaded Files' }
                                </Text>
                            </Box>
                            <Box>
                                <UIButton
                                    variant={'ghost'}
                                    onClick={props?.onAddFile}
                                >
                                    <BiUpload size={17} />
                                    <Text fontSize={13} ms={2}>
                                        Add File
                                    </Text>
                                    
                                </UIButton>
                            </Box>
                        </Stack>
                        {
                            props?.isFileListLoading
                            ?
                            <Progress 
                                colorScheme={'brand'}
                                size='xs' 
                                isIndeterminate 
                            />
                            :
                            null
                        }
                        
                    </GridItem>
                    <GridItem colSpan={[12, 12, 12, 12]} minHeight={'30vh'}>
                        <Grid
                            templateColumns={'repeat(12, 1fr)'} 
                            width={'100%'} 
                            
                            gap={0}
                            marginTop={'0px !important'}
                        >   
                            {
                                props?.files?.length >= 1 ?
                                props?.files?.map((d, i) => (
                                    <GridItem colSpan={[12, 12, 12, 12]}>
                                        <Item 
                                            {...d} 
                                            onRemove={props?.onRemove} 
                                            onOpen={props?.onOpen} 
                                        />
                                    </GridItem>
                                ))
                                :
                                <GridItem colSpan={[12, 12, 12, 12]} >
                                    <Center minHeight={'30vh'} flexDirection={'column'}>
                                        {props?.noFilesText}
                                    </Center>
                                </GridItem>
                            }
                        </Grid>
                    </GridItem>
                    
                    
                    
                    
                </Grid>

                {props?.children}
            </Container>
            <Footer fileCount={props?.files?.length} />
        </Fragment>
        
        
    )
}