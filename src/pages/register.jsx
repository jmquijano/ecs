import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from "react-helmet-async";
import { Badge, Box, Button, Center, Divider, Image, Text, VStack, Stack, Grid, GridItem } from "@chakra-ui/react";
import ecs_logo from '../assets/images/ECS-Logo-300dpi.png';
import { PulseLoader } from "react-spinners";
import { useNavigate } from 'react-router-dom';
import { ApiBaseUrl, PageBaseUrl } from '../utils/urlbase';
import { Step, Steps, useSteps } from "chakra-ui-steps"
import { UserCredentials, UserInformation, Verify } from '../components/register';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../libs/auth';


export default function Register() {
    // React Router Navigate
    const navigate = useNavigate();

    const { RegisterContext, ContactChannelVerification } = useAuth();

    const { nextStep, prevStep, reset, activeStep, setStep } = useSteps({
        initialStep: 0,
    })
    
    const [loadingState, setLoadingState] = useState(false);
    const [smsResendInterval, setSMSResendInterval] = React.useState(0);
    const [emailResendInterval, setEmailResendInterval] = React.useState(0);

    const runInterval = () => {
        if (smsResendInterval >= 1) {
            let smsInterval = setInterval(() => {
                setSMSResendInterval(smsResendInterval - 1);
            }, 1000);
    
            setTimeout(function () {
                clearInterval(smsInterval);
                // console.log('Seconds no longer passes');
            }, 1000);
        } 

        if (emailResendInterval >= 1) {
            let emailInterval = setInterval(() => {
                setEmailResendInterval(emailResendInterval - 1);
            }, 1000);
    
            setTimeout(function () {
                clearInterval(emailInterval);
                // console.log('Seconds no longer passes');
            }, 1000);
        } 

    }

    const runContactChannelVerification = () => {
        ContactChannelVerification({
            onStart: () => setLoadingState(true),
            currentStep: activeStep,
            onValidationCheck: {
                onStart: () => setLoadingState(true),
                email: verified => {
                    if (verified) {
                        navigate(PageBaseUrl.Dashboard); 
                    }
                },
                mobile: verified => {
                    if (verified) {
                        setStep(3);
                    } else {
                        setStep(2);
                    }
                },
                onEnd: end => setLoadingState(false)
            },
            onResendInterval: {
                email: i => setEmailResendInterval(i),
                sms: i => setSMSResendInterval(i)
            },
            onEnd: end => {
                if (!end) {
                    setLoadingState(false);
                }
            }
        });
    }

    useEffect(() => {
        runContactChannelVerification();
    }, []);

    useEffect(() => {
        switch (activeStep) {
            case 2:
                runInterval();
            break;
            case 3:
                runInterval();
            break;
        }
        
    });
    
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
        }),
        BasicInformation: Yup.object().shape({
            salutation: Yup.string().nullable(true),
            firstname: Yup.string().required('Firt name is a mandatory field.'),
            middlename: Yup.string().nullable(true),
            lastname: Yup.string().required('Last name is a mandatory field.')
        }),
        Verify: Yup.object().shape({
            code: Yup.string().required('Verification code is required.')
        })
    }

    /**
     * formikInitialValues
     */
    const [formikInitialValues, setFormikInitialValues] = useState({
        UserCredentials: {
            username: '',
            password: '',
            confirmpassword: '',
            emailaddress: '',
            mobilenumber: ''
        },
        BasicInformation: {
            salutation: '',
            firstname: '',
            middlename: '',
            lastname: ''
        },
        Verify: {
            code: ''
        }
    });

    /**
     * formikSubmitHandler
     */
    const formikSubmitHandler = {
        UserCredentials: async (values, { setErrors, resetForm }) => {
            RegisterContext.CheckCredentials({
                onStart: () => setLoadingState(true),
                param: values, 
                onSuccess: res => {
                    setFormikInitialValues({
                        ...formikInitialValues,
                        UserCredentials: values
                    });

                    runContactChannelVerification();

                    nextStep();
                },
                onFailure: error => setErrors(error),
                onEnd: response => setLoadingState(false)
            });
        },
        BasicInformation: async (values, { setErrors, resetForm }) => {
            setLoadingState(true);
            RegisterContext.CheckBasicInformation({
                param: values,
                onSuccess: (res) => {
                    setFormikInitialValues({
                        ...formikInitialValues,
                        BasicInformation: values
                    });

                    // Call registrater finalization context
                    RegisterContext.FinalizeRegistrationProcess({
                        param: JSON.stringify({...formikInitialValues.UserCredentials, ...values}),
                        onSuccess: token => { localStorage.setItem('token', token);  nextStep(); },
                        onEnd: res => setLoadingState(false),
                        onFailure: error => setErrors(error)
                    });
                },
                onFailure: error => setErrors(error),
                // Null dapat ang onEnd kasi may gagawin pa sa onSuccess.
                onEnd: response => null
            });
            
        },
        VerifySMS: async (values, { setErrors, resetForm }) => {
            RegisterContext.ContactChannelVerification.sms({
                param: values,
                onStart: () => setLoadingState(true),
                onSuccess: response => nextStep(),
                onFailure: error => setErrors(error),
                onEnd: end => setLoadingState(false)
            });
        },
        VerifyEmail: async (values, { setErrors, resetForm }) => {
            RegisterContext.ContactChannelVerification.email({
                param: values,
                onStart: () => setLoadingState(true),
                // Anong hihintayin mo? Pasko? Redirect na kaagad sa dashboard.
                onSuccess: response => navigate(PageBaseUrl.Dashboard),
                onFailure: error => setErrors(error),
                onEnd: end => setLoadingState(false)
            });
        },
    }



    /**
     * formik
     */
    const formik = {
        UserCredentials: useFormik({
            initialValues: formikInitialValues.UserCredentials,
            validationSchema: formikValidationSchema.UserCredentials,
            onSubmit: formikSubmitHandler.UserCredentials
        }),
        BasicInformation: useFormik({
            initialValues: formikInitialValues.BasicInformation,
            validationSchema: formikValidationSchema.BasicInformation,
            onSubmit: formikSubmitHandler.BasicInformation
        }),
        VerifySMS: useFormik({
            initialValues: formikInitialValues.Verify, // Share the same initial values
            validationSchema: formikValidationSchema.Verify, // Share the same validation schema
            onSubmit: formikSubmitHandler.VerifySMS
        }),
        VerifyEmail: useFormik({
            initialValues: formikInitialValues.Verify, // Share the same initial values
            validationSchema: formikValidationSchema.Verify, // Share the same validation schema
            onSubmit: formikSubmitHandler.VerifyEmail
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
            component: <UserInformation formik={formik.BasicInformation} loading={loadingState} />
        },
        {
            label: 'Step 3',
            description: 'Verify Phone Number',
            component: <Verify 
                interval={smsResendInterval} 
                formik={formik.VerifySMS} 
                loading={loadingState} 
                formikInitialValues={formikInitialValues} 
                onResendClick={(e) => {
                    e.preventDefault();
                    RegisterContext.ResendVerification.sms({
                        onStart: start => setLoadingState(true),
                        onEnd: end => setLoadingState(false),
                        onSuccess: success => { 
                            alert(success?.data?.alert);
                            // Set Resend Interval, if valjue was null then set default 300 seconds.
                            setSMSResendInterval(success?.data?.resend_interval?.delay ?? 300); 
                        },
                        onFailure: error => alert(error?.alert)
                    })
                }}
            />
        },
        {
            label: 'Step 4',
            description: 'Verify Email Address',
            component: <Verify 
                interval={emailResendInterval} 
                formik={formik.VerifyEmail} 
                loading={loadingState} 
                formikInitialValues={formikInitialValues}
                onResendClick={(e) => {
                    e.preventDefault();
                    RegisterContext.ResendVerification?.email({
                        onStart: start => setLoadingState(true),
                        onEnd: end => setLoadingState(false),
                        onSuccess: success => {
                            alert(success?.data?.alert);
                            // Set Resend Interval, if valjue was null then set default 300 seconds.
                            setSMSResendInterval(success?.data?.resend_interval?.delay ?? 300); 
                        },
                        onFailure: error => alert(error?.alert)
                    })
                }} 
            />
        }
    ];

    const buttonStepHandler = () => {
        switch (activeStep) {
            case 0:
                formik.UserCredentials.submitForm();
            break;
            case 1:
                formik.BasicInformation.submitForm();
            break;
            case 2:
                formik.VerifySMS.submitForm();
            break;
            case 3:
                formik.VerifyEmail.submitForm();
            break;
        }
    }

    
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
                            <Box flexDir={'column'} width={'100%'} justifyContent={'start'}>
                                <Steps orientation={'vertical'} colorScheme={'brand'} activeStep={activeStep} justifyContent={'start'} marginY={5}>
                                    {registrationSteps.map(({label, description, component}, i) => (
                                        
                                        <Step label={label} description={description} key={i}>
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
                                            disabled={activeStep >= 2 ? true : false}
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
                                            onClick={buttonStepHandler}
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
