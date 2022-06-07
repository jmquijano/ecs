import { Box, Button, Center, Stack, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { Fragment } from "react";
import { Loader } from "../../../../loaders";

export default function BusinessLineTable(props) {
    const handleOnRemove = (a, i) => {
        props?.onRemove(a, i);
    }

    return (
        <Box
            bg={'white'}
            width={'100%'}
            minHeight={'30vh'}
            borderRadius={10}
            border={'1px solid'}
            borderColor={props?.errorMessage ? 'red' : 'gray.200'}
            mt={5}
            overflowX={'auto'}
        >
            {
                props?.loading ?
                <Center minHeight={'30vh'}>
                    <Stack direction={'column'}>
                        <Loader.ScaleLoader />
                    </Stack>
                    
                </Center>
                :
                <Fragment>
                    <Box minHeight={'30vh'}>
                        <Table variant={'simple'}>
                            <Thead background={'gray.100'}>
                                <Tr>
                                    <Th width={'11%'} textTransform={'revert'}>
                                        <Text mt={0}>PSIC Class</Text>
                                    </Th>
                                    <Th width={'80%'} textTransform={'revert'}>
                                        <Text mt={0}>Industry Description</Text>
                                    </Th>
                                    <Th width={'5%'} textTransform={'revert'}>

                                    </Th>
                                    
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                props?.data?.length >= 1
                                ?
                                props?.data?.map((d, i) => (
                                        <Tr cursor={'pointer'} _hover={{
                                            background: 'gray.100'
                                        }}>
                                            
                                            <Td>
                                                <Text color={'gray.600'} fontSize={14}>
                                                {d?.psic_class}
                                                </Text>
                                            </Td>
                                            <Td>
                                                <Text color={'gray.600'} fontSize={14}>
                                                {d?.psic_industry_description}
                                                </Text>
                                            </Td>
                                            <Td>
                                                
                                                <Stack direction={'row'}>
                                                    <Button 
                                                        width={['100%', 'auto']}
                                                        colorScheme={'brand'}
                                                        variant={'outline'}
                                                        borderRadius={'full'}
                                                        fontSize={13} 
                                                        onClick={() => handleOnRemove(props?.data, i)}
                                                    >
                                                            Remove
                                                    </Button>


                                                </Stack>
        
                                            </Td>
                                        </Tr>
                                ))
                                :
                                <Td colSpan={3}>
                                    <Center minHeight={'30vh'} width={'100%'}>
                                        <Text></Text>
                                    </Center>
                                </Td>
                            }
                            </Tbody>
                        </Table>
                        {props?.errorMessage !== null ? 
                            <Box 
                                width={'100%'}
                                py={2}
                                px={4}
                                bg={'transparent'}
                            >
                            {props?.errorMessage instanceof Map ? 
                            props?.errorMessage?.map((d) => (
                                
                                <Text 
                                    fontSize={13}
                                    color={'red'}
                                    fontWeight={600}
                                    textAlign={'left'}
                                >
                                    {d}
                                </Text>
                            ))
                            : 
                            <Text 
                                fontSize={13}
                                color={'red'}
                                fontWeight={600}
                                textAlign={'left'}
                            >
                                {props?.errorMessage}
                            </Text>
                            }
                            </Box>

                        : ''}
                        
                        
                    </Box>
                </Fragment>
            }
        </Box>
    )
}