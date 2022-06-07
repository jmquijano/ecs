import { Container, Grid, Heading, GridItem, Stack, Button, Box, Text, Center, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, chakra, Select } from "@chakra-ui/react";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Loader } from "../../../components/loaders";
import { ApiBaseUrl, PageBaseUrl, UrlWithParam } from "../../../utils/urlbase"; 

const CreateCounter = (maxValue) => {
    let arr = [];
    for (let i = 0; i < maxValue; i++) {
        arr.push("'" + i+1 + "'");
    }

    return arr;
}

const FiledApplicationTable = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [totalItemCount, setTotalItemCount] = useState(0);

    const token = localStorage.getItem('token');

    const limitSelector = [2, 5, 10, 15, 20, 25, 30];

    const paginationSelector = (count) => {
        var c = [];
        for (let i = 0; i < count; i++) {
            c.push(i+1);
        }
        return c;
    }

    function fetchApplication() {
        setLoading(true);
        fetch(ApiBaseUrl.Applicant.Base + UrlWithParam({
            'limit': limit,
            'page': page,
            'paginate': true
        }, ApiBaseUrl.Applicant.Application.MySubmittedApplication.url), {
            method: ApiBaseUrl.Applicant.Application.MySubmittedApplication.method,
            headers: {
                ...ApiBaseUrl.Applicant.Application.MySubmittedApplication.headers,
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(res => {
            if (res?.success) {
                setData(res?.data);
                setPageCount(res?.last_page);
                setTotalItemCount(res?.total);
            }
            
        })
        .finally(res => {
            setLoading(false);
        });
    }

    

    useEffect(() => {
        fetchApplication();
    }, [limit, page]);

    return (
        <Box
            bg={'white'}
            width={'100%'}
            minHeight={'60vh'}
            borderRadius={10}
            border={'1px solid'}
            borderColor={'gray.200'}
            mt={5}
            overflowX={'auto'}
        >
            {
                loading ? 
                <Center minHeight={'60vh'}>
                    <Stack direction={'column'}>
                        <Loader.ScaleLoader />
                    </Stack>
                    
                </Center>
                : 
                <Fragment>
                    <Box minHeight={'55vh'}>
                        <Table variant='simple'>
                            <Thead background={'gray.100'}>
                                <Tr>
                                    
                                    <Th width={'10%'} minWidth={'30px'} textTransform={'revert'}>
                                        Application Reference Number
                                    </Th>
                                    
                                    <Th width={'30%'} textTransform={'revert'}>
                                        <Stack direction={'column'} spacing={0}>
                                            <Text mt={0}>Taxpayer Name</Text>
                                        </Stack>
                                        
                                    </Th>
                                    <Th width={'10%'} minWidth={'30px'} textTransform={'revert'}>
                                        Business ID
                                    </Th>
                                    <Th width={'10%'} textTransform={'revert'}>Ownership</Th>
                                    <Th width={'5%'} textTransform={'revert'}>Status</Th>
                                    <Th width={'20%'} minWidth={'30px'} textTransform={'revert'} py={'2em'}>
                                        Created
                                    </Th>
                                    <Th width={'15%'} textTransform={'revert'}></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    data?.length >= 1 ?
                                    data?.map((d, k) => {
                                        return (
                                            <Tr cursor={'pointer'} _hover={{
                                                background: 'gray.100'
                                            }}>
                                                
                                                <Td py={'1em'}>
                                                    <Text color={'gray.600'} fontSize={14}>
                                                        {d?.application_reference_number}
                                                    </Text>
                                                    
                                                </Td>
                                                <Td>
                                                    <Stack direction={'column'} spacing={0}>
                                                        
                                                        <Text color={'gray.600'} fontSize={14}>
                                                            {d?.taxpayer_name ?? d?.trade_name}
                                                        </Text>
                                                        
                                                    </Stack>
                                                    
                                                </Td>
                                                <Td>
                                                    <Text color={'gray.600'} fontWeight={800} fontSize={14}>
                                                        {d?.business_id}
                                                    </Text>
                                                </Td>
                                                <Td>
                                                    <Text color={'gray.600'} fontSize={14}>
                                                        {d?.businesstype?.fullname}
                                                    </Text>
                                                </Td>
                                                <Td>
                                                    <Text color={'gray.600'} fontSize={14}>
                                                    {d?.status?.fullname}
                                                    </Text>
                                                </Td>
                                                
                                                <Td>
                                                    <Text color={'gray.600'} fontSize={14}>
                                                        {(new Date(d?.created_at)).toLocaleString('en-PH', { timeZone: 'Asia/Manila' })}
                                                    </Text>
                                                </Td>

                                                <Td>
                                                    <Stack 
                                                        direction={'row'}
                                                        justifyContent={['start']}
                                                    >
                                                        <Link to={'/application/' + d?.id}>
                                                            <Button 
                                                                width={['100%', 'auto']}
                                                                colorScheme={'brand'}
                                                                variant={'outline'}
                                                                borderRadius={'full'}
                                                                fontSize={14} 
                                                            >
                                                                
                                                                    Open
                                                                
                                                            </Button>
                                                        </Link>
                                                        
                                                    </Stack>
                                                </Td>
                                            </Tr>
                                        );
                                    
                                    
                                    })
                                    :
                                    <Td colSpan={7}>
                                        <Center minHeight={'45vh'} width={'100%'}>
                                            <Text>No records found.</Text>
                                        </Center>
                                    </Td> 
                                    
                                }
                            </Tbody>
                        </Table>
                    </Box>
                    
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
                                            setPage(e?.target?.value);
                                        }}
                                    >
                                        {paginationSelector(pageCount).map((d, k) => {
                                            return (
                                                <option selected={page == d ? true : false} value={d}>{d}</option>
                                            )
                                        })}
                                        
                                    </Select>
                                    <Text fontSize={13}>
                                        of {pageCount}
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
                                            setLimit(e?.target?.value)
                                        }}
                                    >
                                        {limitSelector?.map((d, k) => {
                                            return <option disabled={d > totalItemCount ? true : false} selected={limit == d ? true : false} value={d}>{d}</option>;
                                        })}
                                        
                                    </Select>
                                    <Text fontSize={13}>per page</Text>
                                </Stack>
                            </GridItem>
                        </Grid>
                    </Box>
                </Fragment>
                
            }
        </Box>
    )
}

export default function ApplicationIndex() {
    return (
        <Fragment>
            <Helmet>
                <title>My Application</title>
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
                            My Application
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
                            <Link to={PageBaseUrl.Application.New.Index} style={{
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
                                    <BiPlus size={20} />
                                    <Text ml={1}>
                                        Create
                                    </Text>
                                </Button>
                            </Link>
                            
                        </Stack>
                    </GridItem>
                </Grid>
                <FiledApplicationTable />
            </Container>
        </Fragment>
    );
}