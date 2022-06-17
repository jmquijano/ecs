import { InfoOutlineIcon } from "@chakra-ui/icons";
import { FormControl, FormLabel, Input, Grid, GridItem, FormErrorMessage, Tooltip, Box, Button, Modal, useToast, Text, Center } from "@chakra-ui/react";
import { Field, Form, Formik, FormikProvider } from "formik";
import React, { Fragment, useEffect, useRef } from "react";
import { PulseLoader } from "react-spinners";
import HCaptcha from '@hcaptcha/react-hcaptcha';

const LoginForm = (props) => {
    const toast = useToast();

    const captchaRef = useRef();

    useEffect(() => {
        if (props?.formik?.errors?.captcha !== undefined) {
            toast({
                description: <Text fontSize={13}>{props?.formik?.errors?.captcha}</Text>,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top'
            });
            captchaRef?.current?.resetCaptcha();
        }
    }, [props?.formik?.errors]);

    useEffect(() => {
        if (props?.hasError == true) {
            captchaRef?.current?.resetCaptcha();
        }
    }, [props?.hasError])

    const handleCaptcha = (token) => {
        props?.formik?.setFieldValue('captcha', token);
        
    }

    return (
        <Fragment>
            <Modal>

            </Modal>
            <FormikProvider value={props.formik}>
                <Form>
                    <Grid templateColumns={'repeat(12, 1fr)'} width={'100%'} gap={2}>
                        <GridItem colSpan={[12, 12, 12, 12]}>
                            <Field name='username'>
                                {({ field, form }) => (
                                <FormControl isDisabled={props.loading} isInvalid={form.errors?.username && form.touched?.username} isRequired>
                                    <FormLabel htmlFor={'username'} fontSize={14}>
                                        User ID
                                        <Box mx={2} display={'inline'}>
                                            <Tooltip 
                                                label={'You can also use your email address or mobile phone number.'} 
                                                p={3}
                                            >
                                                <InfoOutlineIcon color={'green'} />
                                            </Tooltip>
                                        </Box>
                                    </FormLabel>
                                    <Input {...field} id='username' placeholder='' fontSize={13}  />
                                    <FormErrorMessage textAlign={'left'} fontSize={13}>
                                        {
                                            form.errors?.username instanceof Map ? form.errors?.username.map((d, i) => {
                                                return d;
                                            }) : form?.errors?.username
                                        }
                                    </FormErrorMessage>
                                </FormControl>
                                )}
                            </Field>
                        </GridItem>
                        
                        <GridItem colSpan={[12, 12, 12, 12]}>
                            <Field name='password'>
                                {({ field, form }) => (
                                <FormControl isDisabled={props.loading} isInvalid={form.errors?.password && form.touched?.password} isRequired>
                                    <FormLabel htmlFor={'password'} fontSize={14}>Password</FormLabel>
                                    <Input {...field} id='password' placeholder='' type={'password'} fontSize={13} />
                                    <FormErrorMessage textAlign={'left'} fontSize={13}>
                                        {
                                            form.errors?.password instanceof Map ? form.errors?.password.map((d, i) => {
                                                return d;
                                            }) : form?.errors?.password
                                        }
                                    </FormErrorMessage>
                                </FormControl>
                                )}
                            </Field>
                        </GridItem>
                            
                        {
                        process?.env?.REACT_APP_ENV == "Production"
                        ?
                        <GridItem colSpan={[12, 12, 12, 12]} mt={3}>
                            <Center width={'100%'}>
                                <HCaptcha
                                    ref={captchaRef}
                                    sitekey={process.env.REACT_APP_CAPTCHA_SITEKEY}
                                    onVerify={(token, ekey) => {
                                        handleCaptcha(token);
                                    }}
                                />
                            </Center>
                            
                        </GridItem>
                        :
                        ''
                        }
                        
                        <GridItem colSpan={[12]} mt={3}>
                            <Box width={'100%'}>
                                <Button 
                                    isLoading={props?.loading}
                                    spinner={<PulseLoader size={6} color='white' />}
                                    colorScheme={'brand'} 
                                    width={'100%'}
                                    type={'submit'}
                                    fontSize={14}
                                >
                                    Login
                                </Button>
                            </Box>
                        </GridItem>

                    </Grid>
                </Form>
            </FormikProvider>
        </Fragment>
    )
}

export { LoginForm }