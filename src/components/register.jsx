import React, { Fragment, useEffect, useRef } from 'react';
import { Select, Box, Button, FormControl, FormLabel, Input, Text, Grid, GridItem, FormErrorMessage } from "@chakra-ui/react";
import { ApiBaseUrl } from '../utils/urlbase';
import { Field, Form, Formik, FormikProvider } from 'formik';

const UserCredentials = (props) => {
    return (
        <FormikProvider value={props.formik}>
            <Form>
                <Grid templateColumns={'repeat(12, 1fr)'} width={'100%'} gap={2}>
                    <GridItem colSpan={12}>
                        <Field name='username'>
                            {({ field, form }) => (
                            <FormControl isDisabled={props.loading} isInvalid={form.errors?.username && form.touched?.username} isRequired>
                                <FormLabel htmlFor={'username'}>Username</FormLabel>
                                <Input {...field} id={'username'} />
                                <FormErrorMessage textAlign={'left'}>
                                    {
                                        form.errors?.username instanceof Map ? form.errors?.username.map((d, i) => {
                                            return d;
                                        }) : form?.errors?.username
                                    }

                                    {/* form.errors?.username?.message ?? form.errors?.username}
                                    form.errors?.username?.code ? ' (EC: ' + form.errors?.username?.code  + ')' : '' */}
                                </FormErrorMessage>
                            </FormControl>
                            )}
                        </Field>
                    </GridItem>
                    <GridItem colSpan={12}>
                        <Field name='emailaddress'>
                            {({ field, form }) => (
                            <FormControl isDisabled={props.loading} isInvalid={form.errors?.emailaddress && form.touched?.emailaddress} isRequired>
                                <FormLabel htmlFor={'emailaddress'}>Email Address</FormLabel>
                                <Input {...field} id={'emailaddress'} />
                                <FormErrorMessage textAlign={'left'}>
                                    {
                                        form.errors?.emailaddress instanceof Map ? form.errors?.emailaddress.map((d, i) => {
                                            return d;
                                        }) : form?.errors?.emailaddress
                                    }
                                </FormErrorMessage>
                            </FormControl>
                            )}
                        </Field>
                    </GridItem>
                    <GridItem colSpan={12}>
                        <Field name='mobilenumber'>
                            {({ field, form }) => (
                            <FormControl isDisabled={props.loading} isInvalid={form.errors?.mobilenumber && form.touched?.mobilenumber} isRequired>
                                <FormLabel htmlFor={'mobilenumber'}>Mobile Number</FormLabel>
                                <Input {...field} id={'mobilenumber'} />
                                <FormErrorMessage textAlign={'left'}>
                                    {
                                        form.errors?.mobilenumber instanceof Map ? form.errors?.mobilenumber.map((d, i) => {
                                            return d;
                                        }) : form?.errors?.mobilenumber
                                    }
                                </FormErrorMessage>
                            </FormControl>
                            )}
                        </Field>
                    </GridItem>
                    <GridItem colSpan={[12,6]}>
                        <Field name='password'>
                            {({ field, form }) => (
                            <FormControl isDisabled={props.loading} isInvalid={form.errors?.password && form.touched?.password} isRequired>
                                <FormLabel htmlFor={'password'}>Password</FormLabel>
                                <Input {...field} id={'password'} type={'password'} />
                                <FormErrorMessage textAlign={'left'}>
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
                    <GridItem colSpan={[12,6]}>
                        <Field name='confirmpassword'>
                            {({ field, form }) => (
                            <FormControl isDisabled={props.loading} isInvalid={form.errors?.confirmpassword && form.touched?.confirmpassword} isRequired>
                                <FormLabel htmlFor={'confirmpassword'}>Confirm Password</FormLabel>
                                <Input {...field} id={'confirmpassword'} type={'password'} />
                                <FormErrorMessage textAlign={'left'}>
                                    {
                                        form.errors?.confirmpassword instanceof Map ? form.errors?.confirmpassword.map((d, i) => {
                                            return d;
                                        }) : form?.errors?.confirmpassword
                                    }
                                </FormErrorMessage>
                            </FormControl>
                            )}
                        </Field>
                    </GridItem>
                </Grid>
            </Form>
        </FormikProvider>
    );
}

const UserInformation = (props) => {
    const salutations = ['Mr', 'Ms', 'Mrs', 'Dr', 'Dra', 'Engr', 'Arch', 'Atty'];
    return (
        <FormikProvider value={props.formik}>
            <Form>
                <Grid templateColumns={'repeat(12, 1fr)'} width={'100%'} gap={2}>
                    <GridItem colSpan={[12, 12, 12, 4]}>
                        <Field name='salutation'>
                            {({ field, form }) => (
                            <FormControl isDisabled={props.loading} isInvalid={form.errors?.salutation && form.touched?.salutation} isRequired>
                                <FormLabel htmlFor={'salutation'}>Salutation</FormLabel>
                                <Select {...field} id='salutation' placeholder=''>
                                    <option value=""></option>
                                    {salutations.map((s) => (
                                        <option value={s}>{s}</option>
                                    ))}
                                </Select>
                                <FormErrorMessage textAlign={'left'}>
                                    {
                                        form.errors?.salutation instanceof Map ? form.errors?.salutation.map((d, i) => {
                                            return d;
                                        }) : form?.errors?.salutation
                                    }
                                </FormErrorMessage>
                            </FormControl>
                            )}
                        </Field>
                    </GridItem>
                    <GridItem colSpan={[12, 12, 12, 8]}>
                        <Field name='firstname'>
                            {({ field, form }) => (
                            <FormControl isDisabled={props.loading} isInvalid={form.errors?.firstname && form.touched?.firstname} isRequired>
                                <FormLabel htmlFor={'firstname'}>First name</FormLabel>
                                <Input {...field} id='firstname' placeholder='' />
                                <FormErrorMessage textAlign={'left'}>
                                    {
                                        form.errors?.firstname instanceof Map ? form.errors?.firstname.map((d, i) => {
                                            return d;
                                        }) : form?.errors?.firstname
                                    }
                                </FormErrorMessage>
                            </FormControl>
                            )}
                        </Field>
                    </GridItem>
                    <GridItem colSpan={[12, 12, 12, 6]}>
                        <Field name='middlename'>
                            {({ field, form }) => (
                            <FormControl isDisabled={props.loading} isInvalid={form.errors?.middlename && form.touched?.middlename} >
                                <FormLabel htmlFor={'middlename'}>Middle name</FormLabel>
                                <Input {...field} id='middlename' placeholder='' />
                                <FormErrorMessage textAlign={'left'}>
                                    {
                                        form.errors?.middlename instanceof Map ? form.errors?.middlename.map((d, i) => {
                                            return d;
                                        }) : form?.errors?.middlename
                                    }
                                </FormErrorMessage>
                            </FormControl>
                            )}
                        </Field>
                    </GridItem>
                    <GridItem colSpan={[12, 12, 12, 6]}>
                        <Field name='lastname'>
                            {({ field, form }) => (
                            <FormControl isDisabled={props.loading} isInvalid={form.errors?.lastname && form.touched?.lastname} isRequired>
                                <FormLabel htmlFor={'lastname'}>Last name</FormLabel>
                                <Input {...field} id='lastname' placeholder='' />
                                <FormErrorMessage textAlign={'left'}>
                                    {
                                        form.errors?.lastname instanceof Map ? form.errors?.lastname.map((d, i) => {
                                            return d;
                                        }) : form?.errors?.lastname
                                    }
                                </FormErrorMessage>
                            </FormControl>
                            )}
                        </Field>
                    </GridItem>
                </Grid>
            </Form>
        </FormikProvider>
        /*
        <Grid templateColumns={'repeat(12, 1fr)'} width={'100%'} gap={2}>
            <GridItem colSpan={[12, 12, 12, 6]}>
                <Box width={'100%'}>
                    <FormControl isRequired>
                        <FormLabel htmlFor={'Salutation'}>Salutation</FormLabel>
                        <Select id='Salutation' placeholder=''>
                            {salutations.map((s) => (
                                <option value={s}>{s}</option>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </GridItem>
            <GridItem colSpan={[12,12,12,6]}>
                <Box width={'100%'}>
                    <FormControl isRequired>
                        <FormLabel htmlFor={'FirstName'}>First name</FormLabel>
                        <Input id={'FirstName'} type={'text'} />
                    </FormControl>
                </Box>
            </GridItem>
            <GridItem colSpan={[12,12,12,6]}>
                <Box width={'100%'}>
                    <FormControl>
                        <FormLabel htmlFor={'lastname'}>Middle name</FormLabel>
                        <Input id={'MiddleName'} type={'text'} />
                    </FormControl>
                </Box>
            </GridItem>
            <GridItem colSpan={[12,12,12,6]}>
                <Box width={'100%'}>
                    <FormControl>
                        <FormLabel htmlFor={'LastName'}>Last name</FormLabel>
                        <Input id={'LastName'} type={'text'} />
                    </FormControl>
                </Box>
            </GridItem>
            
        </Grid>
        */
    );
}

const Verify = (props) => {
    const { formikInitialValues } = props;
    

    return (
        <Fragment>
            
            <FormikProvider value={props.formik}>
                <Form>
                    <Grid templateColumns={'repeat(12, 1fr)'} width={'100%'} gap={2}>
                        <GridItem colSpan={12}>
                            <Field name='code'>
                                {({ field, form }) => (
                                <FormControl isDisabled={props.loading} isInvalid={form.errors?.code && form.touched?.code} isRequired>
                                    <FormLabel htmlFor={'code'}>Code</FormLabel>
                                    <Input {...field} id={'code'} type={'password'} />
                                    <FormErrorMessage textAlign={'left'}>
                                        {
                                            form.errors?.code instanceof Map ? form.errors?.code.map((d, i) => {
                                                return d;
                                            }) : form?.errors?.code
                                        }
                                    </FormErrorMessage>
                                </FormControl>
                                )}
                            </Field>
                        </GridItem>
                        <GridItem colSpan={12}>
                            <Box width={'100%'} display={'inline'}>
                                <Text fontSize={12} display={'inline'}>Haven't received the code?</Text>
                                <Button disabled={props.interval >= 1 ? true : false} display={'inline'} size={'sm'} colorScheme={'brand'} mx={2} fontSize={12}>
                                    {
                                        props.interval >= 1 ? 'Resend in ' + props.interval + 's' : 'Resend'
                                    }
                                </Button>
                            </Box>
                        </GridItem>
                    </Grid>
                </Form>
            </FormikProvider>
        </Fragment>
        
    )
}

export { UserCredentials, UserInformation, Verify }