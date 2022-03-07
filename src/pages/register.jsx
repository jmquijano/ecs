import React, { useState } from 'react';
import { Helmet } from "react-helmet-async";
import { Badge, Box, Button, Center, Divider, Image, Text, VStack, Stack, Grid, GridItem } from "@chakra-ui/react";
import ecs_logo from '../assets/images/ECS-Logo-300dpi.png';
import { PulseLoader } from "react-spinners";
import { useNavigate } from 'react-router-dom';
import { ApiBaseUrl, PageBaseUrl } from '../utils/urlbase';
import { Step, Steps, useSteps } from "chakra-ui-steps"
import { UserCredentials, UserInformation, VerifySMS } from '../components/register';
import { useFormik } from 'formik';
import * as Yup from 'yup';


export default function Register() {
    const navigate = useNavigate();
    const [loadingState, setLoadingState] = useState(false);

    const { nextStep, prevStep, reset, activeStep } = useSteps({
        initialStep: 0,
    })

    /**
     * validateEmailFormat
     */
    const validateEmailFormat = (email) => {
        return email?.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    
    /**
     * formikValidationSchema
     */
    const formikValidationSchema = {
        UserCredentials: Yup.object().shape({
            username: Yup.string()
                .max(50, 'User ID length too long.')
                .required('User ID is a mandatory field.'),
            password: Yup.string().required('Password is a mandatory field.'),
            confirmpassword: Yup.string().required('Confirm password is a mandatory field.'),
            mobilenumber: Yup.string().required('Mobile Number is a mandatory field.'),
            emailaddress: Yup.string().required('Email address is a mandatory field.')
        })
    }

    /**
     * formikInitialValues
     */
    const formikInitialValues = {
        UserCredentials: {
            username: '',
            password: '',
            confirmpassword: '',
            emailaddress: '',
            mobilenumber: ''
        }
    }

    /**
     * formikSubmitHandler
     */
    const formikSubmitHandler = {
        UserCredentials: async (values, { setErrors, resetForm }) => {
            setLoadingState(true);
            await fetch(ApiBaseUrl.Applicant.Base + ApiBaseUrl.Applicant.Auth.RegistrationValidationFromBackend, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            .then(response => response.json())
            .then((res) => {
                if (res.status) {
                    nextStep();
                    console.log('true');
                    
                }
                setErrors(res.errordata)
            })
            .finally((res) => {
                setLoadingState(false);
            });
        }
    }

    /**
     * formik
     */
    const formik = {
        UserCredentials: useFormik({
            initialValues: formikInitialValues.UserCredentials,
            validationSchema: formikValidationSchema.UserCredentials,
            onSubmit: formikSubmitHandler.UserCredentials
        })
    };

    const registrationSteps = [
        {
            label: 'Step 1',
            description: 'User Credentials and Contact',
            component: <UserCredentials formik={formik.UserCredentials} loading={loadingState} />
        }, 
        {
            label: 'Step 2',
            description: 'Basic Information',
            component: <UserInformation />
        },
        {
            label: 'Step 3',
            description: 'Verify Phone Number',
            component: <VerifySMS />
        },
        {
            label: 'Step 4',
            description: 'Verify Email Address',
            component: <VerifySMS />
        }
    ];

    

    return (
        <React.Fragment>
            <div>
                <Helmet title={'Register'}>
                    <body id={'register'}></body>
                </Helmet>
            </div>
            <Center 
               bg={'gray.50'} 
               py={10}

            >
                <Box 
                    minHeight={'100vh'}
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
                            <Box flexDir={'column'} width={'100%'} justifyContent={'start'}>
                                <Steps orientation={'vertical'} colorScheme={'brand'} activeStep={activeStep} justifyContent={'start'} marginY={5}>
                                    {registrationSteps.map(({label, description, component}, i) => (
                                        
                                        <Step label={label} description={description}>
                                            {component}
                                        </Step>
                                    ))}
                                    
                                    
                                </Steps>
                                
                            </Box>
                            <VStack spacing={5}>
                                
                                <Grid templateColumns={'repeat(12, 1fr)'} width={'100%'} gap={0} my={5}>
                                    {activeStep >= 1 ?
                                    (
                                    <GridItem colSpan={6}>
                                        <Button 
                                            isLoading={loadingState}
                                            spinner={<PulseLoader size={8} color='white' />}
                                            colorScheme={'brand'}
                                            variant={'outline'} 
                                            width={'100%'}
                                            onClick={prevStep}
                                            borderTopRightRadius={0}
                                            borderBottomRightRadius={0}
                                        >
                                            {activeStep >= 1 ? "Back" : ""}
                                        </Button>
                                    </GridItem>
                                    ) : null}
                                    <GridItem colSpan={activeStep >= 1 ? 6 : 12}>
                                        <Button 
                                            isLoading={loadingState}
                                            spinner={<PulseLoader size={8} color='white' />}
                                            colorScheme={'brand'} 
                                            width={'100%'}
                                            onClick={() => {
                                                console.log(activeStep);

                                                switch (activeStep) {
                                                    case 0:
                                                        formik.UserCredentials.submitForm();
                                                    break;
                                                }
                                            }}
                                            
                                            borderTopLeftRadius={activeStep >= 1 ? 0 : 'base'}
                                            borderBottomLeftRadius={activeStep >= 1 ? 0 : 'base'}
                                        >
                                            {activeStep >= 2 ? "Verify" : "Next"}
                                        </Button>
                                    </GridItem>
                                </Grid>
                            </VStack>

                            <Divider marginY={5} color={'gray.100'} />

                            <Stack spacing={2} justifyContent={'center'}>
                                <Box>
                                    <Text
                                        display={'inline'}
                                        fontSize={12}
                                        color={'blackAlpha.600'}
                                    >
                                        Already have an account?
                                    </Text>
                                    <Button 
                                        variant={'outline'}
                                        size={'sm'}
                                        fontSize={12}
                                        onClick={(e) => navigate(PageBaseUrl.Auth.Login)}
                                        mx={2}
                                    >
                                        Back to login
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
                            <Badge colorScheme={'green'} textTransform={'none'}>v{process.env.REACT_APP_VERSION}</Badge>
                            
                        </Box>
                        
                    </Box>
                </Box>
            </Center>
            
            
        </React.Fragment>
        
    );
}
