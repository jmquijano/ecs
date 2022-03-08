import React, { Fragment, useRef } from 'react';
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
                                    {form.errors?.username?.message ?? form.errors?.username}
                                    {form.errors?.username?.code ? ' (EC: ' + form.errors?.username?.code  + ')' : ''} 
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
                                    {form.errors?.emailaddress?.message ?? form.errors?.emailaddress}
                                    {form.errors?.emailaddress?.code ? ' (EC: ' + form.errors?.emailaddress?.code  + ') ' : ''} 
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
                                    {form.errors?.mobilenumber?.message ?? form.errors?.mobilenumber}
                                    {form.errors?.mobilenumber?.code ? ' (EC: ' + form.errors?.mobilenumber?.code  + ') ' : ''} 
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
                                    {form.errors?.password?.message ?? form.errors?.password}
                                    {form.errors?.password?.code ? ' (EC: ' + form.errors?.password?.code  + ') ' : ''} 
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
                                    {form.errors?.confirmpassword?.message ?? form.errors?.confirmpassword}
                                    {form.errors?.confirmpassword?.code ? ' (EC: ' + form.errors?.confirmpassword?.code  + ') ' : ''} 
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
                                    {salutations.map((s) => (
                                        <option value={s}>{s}</option>
                                    ))}
                                </Select>
                                <FormErrorMessage textAlign={'left'}>
                                    {form.errors?.salutation?.message ?? form.errors?.salutation}
                                    {form.errors?.salutation?.code ? ' (EC: ' + form.errors?.salutation?.code  + ')' : ''} 
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
                                    {form.errors?.firstname?.message ?? form.errors?.firstname}
                                    {form.errors?.firstname?.code ? ' (EC: ' + form.errors?.firstname?.code  + ')' : ''} 
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
                                    {form.errors?.middlename?.message ?? form.errors?.middlename}
                                    {form.errors?.middlename?.code ? ' (EC: ' + form.errors?.middlename?.code  + ')' : ''} 
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
                                    {form.errors?.lastname?.message ?? form.errors?.lastname}
                                    {form.errors?.lastname?.code ? ' (EC: ' + form.errors?.lastname?.code  + ')' : ''} 
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

const VerifySMS = (props) => {
    return (
        <Fragment>
            <Grid templateColumns={'repeat(12, 1fr)'} width={'100%'} gap={2}>
                <GridItem colSpan={12}>
                    <Box width={'100%'}>
                        <FormControl isRequired>
                            <FormLabel htmlFor={'VerifySMS'}>Code</FormLabel>
                            <Input id={'VerifySMS'} />
                        </FormControl>
                    </Box>
                </GridItem>
                <GridItem colSpan={12}>
                    <Box width={'100%'} display={'inline'}>
                        <Text fontSize={12} display={'inline'}>Haven't received the code?</Text>
                        <Button display={'inline'} size={'sm'} colorScheme={'brand'} mx={2} fontSize={12}>Resend</Button>
                    </Box>
                </GridItem>
            </Grid>
        </Fragment>
        
    )
}

export { UserCredentials, UserInformation, VerifySMS }