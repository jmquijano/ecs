import { InfoOutlineIcon } from "@chakra-ui/icons";
import { FormControl, FormLabel, Input, Grid, GridItem, FormErrorMessage, Tooltip, Box, Button } from "@chakra-ui/react";
import { Field, Form, Formik, FormikProvider } from "formik";
import React, { Fragment } from "react";
import { PulseLoader } from "react-spinners";

const LoginForm = (props) => {
    return (
        <Fragment>
            <FormikProvider value={props.formik}>
                <Form>
                    <Grid templateColumns={'repeat(12, 1fr)'} width={'100%'} gap={2}>
            
                        <GridItem colSpan={[12, 12, 12, 12]}>
                            <Field name='username'>
                                {({ field, form }) => (
                                <FormControl isDisabled={props.loading} isInvalid={form.errors?.username && form.touched?.username} isRequired>
                                    <FormLabel htmlFor={'username'}>
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
                                    <Input {...field} id='username' placeholder=''  />
                                    <FormErrorMessage textAlign={'left'}>
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
                                    <FormLabel htmlFor={'password'}>Password</FormLabel>
                                    <Input {...field} id='password' placeholder='' type={'password'} />
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
                        
                        <GridItem colSpan={[12]} mt={3}>
                            <Box width={'100%'}>
                                <Button 
                                    isLoading={props?.loading}
                                    spinner={<PulseLoader size={8} color='white' />}
                                    colorScheme={'brand'} 
                                    width={'100%'}
                                    type={'submit'}
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