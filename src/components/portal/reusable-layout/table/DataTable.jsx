import { Box, Center, Stack, Table, Tbody, Th, Thead, Tr, Td, Text, Grid, GridItem, Select } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { Loader } from "../../../loaders";
import dotize from "dotize";
import PageLinkButton from "../button/PageLinkButton";
import moment from "moment";

function RenderFooter(props) {
    const limitSelector = [2, 5, 10, 15, 20, 25, 30];
    const [data, setData] = useState();
    
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [totalItemCount, setTotalItemCount] = useState(0);

    const { limit } = props;

    useEffect(() => {
        console.log(props);
    }, [props]);

    const paginationSelector = (count) => {
        var c = [];
        for (let i = 0; i < count; i++) {
            c.push(i+1);
        }
        return c;
    }

    return (
        <Box minWidth={'100%'} background={'white'} py={3} px={4}>
            <Grid templateColumns={'repeat(12, 1fr)'} width={'100%'} gap={2}>
                <GridItem colSpan={[12, 6]}>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={['center','left']}>
                        <Text fontSize={13}>Page</Text>
                        <Select 
                            width={'auto'} 
                            fontSize={13} 
                            px={1} 
                            py={0} 
                            background={'white'}
                            onChange={(e) => {
                                props?.onPageChange(e?.target?.value);
                            }}
                        >
                            {paginationSelector(props?.pageCount).map((d, k) => {
                                return (
                                    <option selected={props?.currentPage == d ? true : false} value={d}>{d}</option>
                                )
                            })}
                            
                        </Select>
                        <Text fontSize={13}>
                            of {props?.pageCount}
                        </Text>
                    </Stack>
                </GridItem>
                <GridItem colSpan={[12, 6]}>
                    <Stack 
                        direction={'row'} 
                        alignItems={'center'} 
                        justifyContent={['center', 'right']}
                    >
                        <Text 
                            fontSize={13}
                        >
                            Limit
                        </Text>
                        <Select 
                            width={'auto'} 
                            fontSize={13} 
                            px={1} 
                            py={0} 
                            background={'white'}
                            onChange={(e) => {
                                props?.onPageLimitChange(e?.target?.value);
                            }}
                        >
                            {limitSelector?.map((d, k) => {
                                return <option disabled={d > props?.totalItemCount ? true : false} selected={parseInt(limit) == d ? true : false} value={d}>{d}</option>;
                            })}
                            
                        </Select>
                        <Text fontSize={13}>per page</Text>
                    </Stack>
                </GridItem>
            </Grid>
        </Box>
    )
}

function RenderRowCol(props) {
    switch (props?.dataType) {
        case "text":
            return (
                <Text {...props?.textProps}>
                    {props?.children}
                </Text>
            )
        break;
        case "button-link":
            return (
                <PageLinkButton
                    to={props?.buttonLinkProps?.baseUrl + props?.children}
                    text={props?.buttonLinkProps?.text}
                />
            )
        break;
        case "date":
            return (
                <Text {...props?.dateProps}>
                    {(new Date(props?.children)).toLocaleString(props?.dateProps?.locale, { timeZone: props?.dateProps?.timeZone }) ?? ''}
                </Text>
            )
        break
    }
}

export default function DataTable(props) {
    useEffect(() => {
        // console.log(dotize.convert(props?.dataSource));
    }, [props]);
    return (
        <Box
            bg={'white'}
            width={'100%'}
            minHeight={'60vh'}
            borderRadius={10}
            border={'1px solid'}
            borderColor={'gray.200'}
            mt={0}
            overflowX={'auto'}
        >
            {
                props?.loading ?
                <Center minHeight={props?.minHeight ?? '60vh'}>
                    <Stack direction={'column'}>
                        <Loader.ScaleLoader />
                    </Stack>
                </Center>
                :
                <Fragment>
                    <Box minHeight={props?.minHeight ?? '55vh'}>
                        <Table {...props?.tableProps}>
                            <Thead {...props?.theadProps}>
                                {
                                props?.columns instanceof Object ?
                                <Tr>
                                {props?.columns?.map((col) => (
                                    <Th 
                                        width={col?.width ?? 'auto'} 
                                        minWidth={col?.minWidth ?? 'auto'} 
                                        textTransform={'revert'}
                                    >
                                        {col?.name ?? ''}
                                    </Th> 
                                ))}
                                </Tr>
                                :
                                ''
                                }
                            </Thead>
                            <Tbody>
                                {
                                    props?.dataSource?.length >= 1 ?
                                    
                                        
                                        props?.dataSource.map((data) => {
                                            data = dotize.convert(data);
                                            return <Tr>
                                                {props?.columns instanceof Object ?
                                                    props?.columns?.map((col) => (
                                                        <Td>
                                                            <RenderRowCol
                                                                {...col}
                                                            >
                                                                {data[col?.dataKey]}
                                                            </RenderRowCol>
                                                            
                                                        </Td>
                                                    ))
                                                :
                                                ''
                                                }
                                            </Tr>
                                           
                                        })
                                        
                                   
                                    :
                                    <Td colSpan={props?.columns?.length ?? 0}>
                                        <Center minHeight={props?.minHeight} width={'100%'}>
                                            <Text>No records found.</Text>
                                        </Center>
                                    </Td> 
                                }
                            </Tbody>
                        </Table>
                    </Box>
                    <RenderFooter 
                        pageCount={props?.pagination?.pageCount}
                        onPageChange={props?.pagination?.onPageChange}
                        onPageLimitChange={props?.pagination?.onPageLimitChange}
                        totalItemCount={props?.pagination?.totalItemCount}
                        currentPage={props?.pagination?.currentPage}
                        limit={props?.pagination?.limit}
                    />
                </Fragment>
                
            }
        </Box>
    )
}