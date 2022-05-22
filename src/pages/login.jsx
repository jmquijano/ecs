import React, { Fragment, useState } from 'react';
import { Helmet } from "react-helmet-async";
import { Badge, Box, Button, Center, Divider, Image, Text, Stack } from "@chakra-ui/react";
import ecs_logo from '../assets/images/ECS-Logo-300dpi.png';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PageBaseUrl } from '../utils/urlbase';
import { useAuth } from '../libs/auth';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { LoginForm } from '../components/login';

export default function Login() {
    const navigate = useNavigate();
    const [ loadingState, setLoadingState ] = useState(false);
    const AuthContext = useAuth();

    let [searchParams, setSearchParams] = useSearchParams();
    
    const authFromBackend = () => {
       setLoadingState(true);
       Login({userId:"test",password:"tests"});
       
    }

    /**
     * formikValidationSchema
     */
     const formikValidationSchema = {
        LoginForm: Yup.object().shape({
            username: Yup.string()
                .max(50, 'User ID length too long.')
                .required('User ID is a mandatory field.'),
            password: Yup.string().required('Password is a mandatory field.')
        })
    }

    /**
     * formikInitialValues
     */
     const [formikInitialValues, setFormikInitialValues] = useState({
        LoginForm: {
            username: '',
            password: ''
        }
    });

    /**
     * formikSubmitHandler
     */
     const formikSubmitHandler = {
        LoginForm: async (values, { setErrors, resetForm }) => {
            const redirect_url = searchParams.get('next') ?? searchParams.get('ReturnUrl') ?? searchParams.get('return_to') ?? PageBaseUrl.Dashboard;
            AuthContext.Login({
                onStart: () => setLoadingState(true),
                param: values,
                onSuccess: res => {
                    localStorage.setItem('token', res?.data?.access_token);
                    navigate(redirect_url);
                },
                onFailure: error => setErrors(error),
                onEnd: end => setLoadingState(false)
            });
        }
    }

    /**
     * formik
     */
    const formik = {
        LoginForm: useFormik({
            initialValues: formikInitialValues.LoginForm,
            validationSchema: formikValidationSchema.LoginForm,
            onSubmit: formikSubmitHandler.LoginForm
        })
    };

    return (
        <Fragment>
            <div>
                <Helmet title={'Login'}></Helmet>
            </div>
            <Center  
               bg={'gray.50'} 
               height={'100vh'} 
               display="flex"
               margin={["0px", "30px", "30px", "30px"]}
            >
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
                            base: 0,
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
                            <LoginForm 
                                formik={formik.LoginForm} 
                                loading={loadingState} 
                            />
                            
                            

                            <Divider 
                                marginY={5} 
                                color={'gray.100'} 
                            />

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
                            {/*
                            <Text display={'inline'}>Developer Information</Text>
                            <Text display={'inline'}> - </Text>
                            */}
                           
                            <Badge colorScheme={'green'} textTransform={'none'}>v{process.env.REACT_APP_VERSION}</Badge>
                            
                        </Box>
                        
                    </Box>
                </Box>
            </Center>
            
            
        </Fragment>
        
    );
}
