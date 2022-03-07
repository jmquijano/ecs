import React, { Component, Fragment, useState } from 'react';
import { Helmet } from "react-helmet-async";
import { Badge, Box, Button, Center, Divider, FormControl, FormLabel, Image, Input, Text, VStack, HStack, Stack } from "@chakra-ui/react";
import ecs_logo from '../assets/images/ECS-Logo-300dpi.png';
import { PulseLoader } from "react-spinners";
import { useNavigate } from 'react-router-dom';
import { PageBaseUrl } from '../utils/urlbase';
import { Maps, Pin } from '../components/maps';
import { useAuth } from '../libs/auth';



export default function Login() {
    const navigate = useNavigate();
    const [ loadingState, setLoadingState ] = useState(false);
    const { Login } = useAuth()

    const authFromBackend = () => {
       setLoadingState(true)
       Login({userId:"test",password:"tests"})
       
    }

    return (
        <React.Fragment>
            <div>
                <Helmet title={'Login'}></Helmet>
            </div>
            <Center  
               bg={'gray.50'} 
               height={'100vh'} 
            >
                
                {/* <div style={{height:"800px",width:"800px"}}>
                    <Maps 
                        center={{ lat: 51.505, lng: -0.09 }}
                        zoom={17}
                        scrollWheelZoom={false}
                    >
                        <Pin 
                            position={{ lat: 51.505, lng: -0.09 }}
                            PopupMessage={'Your are located here'}
                            onChange={(e) => { console.log(e) }}
                        />
                    </Maps>
                    
                </div> */}
                <Box 
                    width={'100%'}
                     // para ma scroll sa gamay nga device
                     maxH="100%"
                     // para ma scroll sa gamay nga device
                    maxWidth={500} 
                    textAlign={'center'}
                >
                    <Center marginBottom={5}>
                        <Image src={ecs_logo} width={'auto'} height={'40px'} textAlign={'center'} />
                        <Text
                            color={'gray.500'}
                            fontWeight={'500'}
                            paddingX={'15px'}
                            display={{
                                base: 'none',
                                md: 'block',
                                
                            }}
                        >
                            Electronic Certification System
                        </Text>
                    </Center>
                    
                    { /* Login Card */ }
                    <Box 
                        marginX={{
                            base: 5,
                            md: 0
                        }}
                    >
                        <Box 
                            bg={'white'} 
                            width={'100%'}
                            maxWidth={500} 
                            
                            border={'1px'}
                            borderColor={'gray.200'}
                            paddingX={{
                                base: 5,
                                md: 10

                            }}
                            paddingY={{
                                base: 5,
                                md: 10
                            }}
                        >
                            <VStack spacing={5}>
                                <Box width={'100%'}>
                                    <FormControl isRequired>
                                        <FormLabel htmlFor={'UserID'}>User ID</FormLabel>
                                        <Input id={'UserID'} />
                                    </FormControl>
                                </Box>
                                <Box width={'100%'}>
                                    <FormControl isRequired>
                                        <FormLabel htmlFor={'Password'}>Password</FormLabel>
                                        <Input id={'Password'} type={'password'} />
                                    </FormControl>
                                </Box>
                                <Box width={'100%'}>
                                    <Button 
                                        isLoading={loadingState}
                                        spinner={<PulseLoader size={8} color='white' />}
                                        colorScheme={'brand'} 
                                        width={'100%'}
                                        onClick={authFromBackend}
                                    >
                                        Login
                                    </Button>
                                </Box>
                            </VStack>

                            <Divider marginY={5} color={'gray.100'} />

                            <Stack spacing={2} justifyContent={'center'}>
                                <Box width={'100%'}>
                                    <Text
                                        fontSize={12}
                                        color={'blackAlpha.600'}
                                    >
                                        Don't have an account?
                                    </Text>
                                    
                                </Box>
                                <Box>
                                    <Button 
                                        disabled={loadingState}
                                        variant={'outline'}
                                        size={'sm'}
                                        paddingX={5}
                                        paddingY={5}
                                        onClick={(e) => navigate(PageBaseUrl.Auth.Register)}
                                    >
                                        Create an account
                                    </Button>
                                </Box>
                            </Stack>
                        </Box>
                    </Box> 
                    

                    {/* Copyright & Application Information */}
                    <Box marginTop={5}>
                        <Text 
                            display={'block'}
                            fontSize={14}
                            color={'gray.400'}
                            cursor={'pointer'}
                            marginX={1}
                        >
                            © {new Date().getFullYear()} {process.env.REACT_APP_NAME}
                        </Text>
                        <Box 
                            display={'block'}
                            fontSize={14}
                            color={'gray.400'}
                            cursor={'pointer'}
                            my={1}
                            
                        >
                            {/**
                            <Text display={'inline'}>Developer Information</Text>
                            <Text display={'inline'}> - </Text>
                            */}
                            <Badge colorScheme={'green'} textTransform={'none'}>v{process.env.REACT_APP_VERSION}</Badge>
                            
                        </Box>
                        
                    </Box>
                </Box>
            </Center>
            
            
        </React.Fragment>
        
    );
}
