import { Box, Button, Container, Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import { cloneElement, Fragment, useEffect } from "react";
import { BiChevronLeft, BiChevronRight, BiUpload } from "react-icons/bi";
import UIButton from "../button/UIButton";
import Item from "./item";
import Footer from "./footer";

export default function FileManager(props) {
    const Child = cloneElement(props?.children);

    useEffect(() => {
        
    }, [props]);
    return (
        <Fragment>
            <Container
                maxWidth={'100%'}
                py={0}
                px={0}
                minHeight={'40vh'}
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
                                <Text color={'gray.600'}>My Uploaded Files</Text>
                            </Box>
                            <Box>
                                <UIButton
                                    variant={'ghost'}
                                >
                                    <BiUpload size={17} />
                                    <Text fontSize={13} ms={2}>
                                        Add File
                                    </Text>
                                    
                                </UIButton>
                            </Box>
                        </Stack>
                    </GridItem>
                    {
                        props?.files?.length >= 1 ?
                        props?.files?.map((d, i) => (
                            <GridItem colSpan={[12, 12, 12, 12]}>
                                <Item {...d} onRemove={props?.onRemove} onOpen={props?.onOpen} />
                            </GridItem>
                        ))
                        :
                        ''
                    }
                    
                    
                </Grid>

                {props?.children}
            </Container>
            <Footer fileCount={props?.files?.length} />
        </Fragment>
        
        
    )
}