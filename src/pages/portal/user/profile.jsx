import { Container, Heading, Box, Grid, GridItem, Stack, Text, Input, Button, Select, useDisclosure, Modal, ModalOverlay, ModalHeader, ModalBody, ModalFooter, ModalContent, ModalCloseButton } from "@chakra-ui/react";
import { Field, FormikProvider, useFormik } from "formik";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { UserProfileContext } from "../../../context/UserProfileContext";
import * as luxon from 'luxon';
import { ApiBaseUrl, UrlWithParam } from "../../../utils/urlbase";
import { Step, Steps, useSteps } from "chakra-ui-steps"
import { BiMailSend, BiMessage } from "react-icons/bi";

const SetPassword = (props) => {
    return (
        <>
            <Stack direction={'column'} py={2}>
                <Text align={'left'}>New Password</Text>
                <Input type={'password'} name={'new_password'} onChange={props.onChange.newPassword} />

                <Text align={'left'}>Confirm New Password</Text>
                <Input type={'password'} name={'confirm_new_password'} onChange={props.onChange.confirmNewPassword} />
            </Stack>
        </>
    );
}

const ChooseMFA = (props) => {
    return (
        <>
            <Stack direction={['column', 'row']} alignItems={'center'} justifyContent={'center'} py={3}>
                <Button
                    width={['100%', 'auto']}
                    colorScheme={'brand'}
                    variant={'outline'}
                >
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
                        <BiMessage fontSize={20} />
                        <Text
                            fontSize={13}
                        >
                            Send via SMS
                        </Text>
                    </Stack>
                    
                </Button>
                <Button
                    width={['100%', 'auto']}
                    colorScheme={'brand'}
                    variant={'outline'}
                >
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
                        <BiMailSend fontSize={20} />
                        <Text
                            fontSize={13}
                        >
                            Send via Email
                        </Text>
                    </Stack>
                </Button>
            </Stack>
        </>
    )
}

const ChangePasswordFlow = (props) => {
    
    const [formValues, setFormValues] = useState({
       newPassword: null,
       confirmNewPassword: null,
       mfaCommunicationChannel: null
    });

    const [buttonState, setButtonState] = useState({
        isDisabled: false
    });

    const comparePassword = (password, confirmPassword) => {
        return password == confirmPassword;
    }
    
    const steps = [
        { 
            label: "Step 1", 
            description: "Set new password",
            component: 
            <SetPassword onChange={{
                newPassword: (e) => {
                    setFormValues({
                        ...formValues,
                        newPassword: e?.target?.value
                    });
                },
                confirmNewPassword: (e) => {
                    setFormValues({
                        ...formValues,
                        confirmNewPassword: e?.target?.value
                    });
                },

            }} />
        }, 
        { 
            label: "Step 2", 
            description: "Select OTP receipt method",
            component: <ChooseMFA />
        }, 
        { 
            label: "Step 3", 
            description: "Verify",
            component: null 
        }
    ]

    const { nextStep, prevStep, reset, activeStep } = useSteps({
        initialStep: 1,
    });

    useEffect(() => {
        switch (activeStep) {
            case 0:
                (formValues?.newPassword == null ?
                comparePassword(formValues?.newPassword, formValues?.confirmNewPassword) 
                    ? 
                    setButtonState({
                        ...buttonState,
                        isDisabled: false
                    })
                    :
                    setButtonState({
                        ...buttonState,
                        isDisabled: true
                    })
                : 
                    setButtonState({
                        ...buttonState,
                        isDisabled: true
                    })
                );
            break;
        }
    }, [formValues, activeStep]);

    return (
        <>
        <Modal 
            closeOnOverlayClick={false} 
            isOpen={props?.isOpen} 
            onClose={props?.onClose} 
            isCentered
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Change Password</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={0}>
                    <Steps orientation={'vertical'} colorScheme={'brand'} activeStep={activeStep} justifyContent={'start'} marginY={5}>
                        {steps.map(({label, description, component}, i) => (
                            
                            <Step label={label} description={description} key={i}>
                                {component}
                            </Step>
                        ))}
                    </Steps>
                </ModalBody>

                <ModalFooter mb={2}>
                    <Button 
                        colorScheme='brand' 
                        width={'100%'}
                        disabled={buttonState?.isDisabled}
                    >
                        Next
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    );
}

const UserProfile = () => {
    const userProfile = useContext(UserProfileContext);
    const salutations = ['Mr', 'Ms', 'Mrs', 'Dr', 'Dra', 'Engr', 'Arch', 'Atty'];

    // Token
    const token = localStorage.getItem('token');

    /**
     * Loading
     */
    const [loading, setLoading] = useState(false);

    /**
     * Form Values
     */
    const [formValues, setFormValues] = useState({
        BasicInformation: {
            salutation: null,
            firstname: null,
            middlename: null,
            lastname: null
        },
        Password: {
            lastPasswordChange: null
        }
    });

    /**
     * Active MFA Communication Channel
     */
    const [mfaChannel, setMFAChannel] = useState(null);

    /**
     * Modal State
     */
    const [modalState, setModalState] = useState({
        ChangePassword: {
            isOpen: false
        }
    });

    /**
     * Modal Control
     */
    const modalControl = {
        ChangePassword: {
            onClose: () => {
                setModalState({
                    ...modalState,
                    ChangePassword: {
                        ...modalState?.ChangePassword,
                        isOpen: false
                    }
                })
            },
            onOpen: () => {
                setModalState({
                    ...modalState,
                    ChangePassword: {
                        ...modalState.ChangePassword,
                        isOpen: true
                    }
                })
            }
        }
    }

    
    useEffect(() => {
        setFormValues({
            ...formValues,
            BasicInformation: {
                salutation: userProfile?.salutation,
                firstname: userProfile?.firstname,
                middlename: userProfile?.middlename,
                lastname: userProfile?.lastname
            },
            Password: {
                lastPasswordChange: userProfile?.last_password_change
            }
        });

        fetch(
            ApiBaseUrl.Applicant.Base + ApiBaseUrl.Applicant.Basedata.MFACommunicationChanel.url,
            {
                method: ApiBaseUrl.Applicant.Basedata.MFACommunicationChanel.method,
                headers: {
                    ...ApiBaseUrl.Applicant.Basedata.MFACommunicationChanel.headers,
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then(res => res.json())
        .then((res) => {
            if (res?.status) {
                setMFAChannel(res?.data);
            }
        });
    }, [userProfile]);

    const lastPasswordChange = (date) => {
        const count_diff = luxon.DateTime.now().diff(luxon.DateTime.fromSQL(date), ['days', 'seconds', 'hours', 'months', 'year']).toObject();

        let return_value;

        // console.log(count_diff);

        if (count_diff?.days >= 2) {
            return_value = count_diff?.days + ' days ago';
        } else if (count_diff?.days == 1) {
            return_value = 'a day ago';
        } else if (count_diff?.months >= 2) {
            return_value = count_diff?.months + ' months ago';
        } else if (count_diff?.months == 1) { 
            return_value = 'a month ago';
        } else if (count_diff?.years >= 2) {
            return_value = count_diff?.years + ' years ago';
        } else if (count_diff?.years == 1) {
            return_value = 'a year ago';
        } else if (count_diff?.hours >= 2) {
            return_value = count_diff?.hours + ' hours ago';
        } else if (count_diff?.hours == 1) {
            return_value = 'an hour ago';
        }

        return return_value;
    }

    const formSubmitHandler = {
        BasicInformation: () => {
            setLoading(true);
            fetch(
                ApiBaseUrl.Applicant.Base + UrlWithParam({
                    'id': userProfile?.id
                }, ApiBaseUrl.Applicant.User.EditProfile.url),
                {
                    method: ApiBaseUrl.Applicant.User.EditProfile.method,
                    headers: {
                        ...ApiBaseUrl.Applicant.User.EditProfile.headers,
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(formValues?.BasicInformation)
                }
            )
            .then(res => res.json())
            .then((res) => {
                if (res.status) {
                    console.log('edited');
                }
            })
            .finally((res) => {
                setLoading(false);
            })
        }
    }


    return (
        <Fragment>
            <Helmet>
                <title>My Profile</title>
            </Helmet>
            <Container
                maxWidth={'1200px'}
                py={[5, 5, 5, 5, 10]}
            >
                <ChangePasswordFlow isOpen={modalState?.ChangePassword?.isOpen} onClose={modalControl?.ChangePassword?.onClose} />
                <Heading
                    color={'brand.300'}
                    fontSize={['150%']}
                    cursor={'pointer'}
                >
                    My Profile
                </Heading>
                <Box
                    mt={5}
                    bg={'white'}
                    width={'100%'}
                    minHeight={'60vh'}
                    borderRadius={10}
                    border={'1px solid'}
                    borderColor={'gray.200'}
                    px={10}
                    py={10}
                    
                >
                    {userProfile?.id == null ? '' :
                        <Grid 
                            templateColumns={'repeat(12, 1fr)'} 
                            width={'100%'} gap={[2, 5, 5, 5]}
                            alignItems={'center'}
                        >
                            
                            
                            <GridItem 
                                colSpan={[12, 12, 2]} 
                            >
                                <Text>
                                    Username
                                </Text>
                            </GridItem>
                            <GridItem 
                                colSpan={[12, 12, 10]} 
                            >
                                <Input type={'text'} disabled={'true'} value={userProfile?.username} width={'100%'} />
                            </GridItem>

                            <GridItem 
                                colSpan={[12, 12, 2]} 
                            >
                                <Stack direction={'row'}>
                                    <Text>
                                        Salutation
                                    </Text>
                                </Stack>  
                            </GridItem>
                            <GridItem 
                                colSpan={[12, 12, 10]} 
                            >
                                <Select 
                                    id='salutation' 
                                    placeholder='' 
                                    onChange={(e) => {
                                        setFormValues({
                                            ...formValues,
                                            BasicInformation: {
                                                ...formValues.BasicInformation,
                                                salutation: e.target.value
                                            }
                                        })
                                    }} 
                                >
                                    {salutations.map((s) => (
                                        <option selected={formValues.BasicInformation?.salutation == s} value={s}>{s}</option>
                                    ))}
                                </Select>
                            </GridItem>

                            <GridItem 
                                colSpan={[12, 12, 2]} 
                            >
                                <Stack direction={'row'}>
                                    <Text>
                                        Given name
                                    </Text>
                                </Stack>  
                            </GridItem>
                            <GridItem 
                                colSpan={[12, 12, 10]} 
                            >
                                <Input 
                                    type={'text'} 
                                    value={formValues?.BasicInformation?.firstname} 
                                    width={'100%'}
                                    onChange={(e) => {
                                        setFormValues({
                                            ...formValues,
                                            BasicInformation: {
                                                ...formValues.BasicInformation,
                                                firstname: e.target.value
                                            }
                                        })
                                    }} 
                                />
                            </GridItem>
                            <GridItem 
                                colSpan={[12, 12, 2]} 
                            >
                                <Stack direction={'row'}>
                                    <Text>
                                        Middle name
                                    </Text>
                                </Stack>
                            </GridItem>
                            <GridItem 
                                colSpan={[12, 12, 10]} 
                            >
                                <Input 
                                    type={'text'} 
                                    value={formValues?.BasicInformation?.middlename} 
                                    width={'100%'} 
                                    onChange={(e) => {
                                        setFormValues({
                                            ...formValues,
                                            BasicInformation: {
                                                ...formValues.BasicInformation,
                                                middlename: e.target.value
                                            }
                                        })
                                    }} 
                                />
                            </GridItem>
                            <GridItem 
                                colSpan={[12, 12, 2]} 
                            >
                                <Stack direction={'row'}>
                                    <Text>
                                        Surname
                                    </Text>
                                </Stack>
                            </GridItem>
                            <GridItem 
                                colSpan={[12, 12, 10]} 
                            >
                                <Input 
                                    type={'text'} 
                                    value={formValues?.BasicInformation?.lastname} 
                                    width={'100%'}
                                    onChange={(e) => {
                                        setFormValues({
                                            ...formValues,
                                            BasicInformation: {
                                                ...formValues.BasicInformation,
                                                lastname: e.target.value
                                            }
                                        })
                                    }} 
                                />
                            </GridItem>

                            <GridItem 
                                colSpan={[12, 12, 2]} 
                            >
                                <Text>
                                    Password
                                </Text>
                            </GridItem>
                            <GridItem 
                                colSpan={[12, 12, 10]} 
                            >
                                <Stack direction={['row']} alignItems={'center'}>
                                    <Text fontSize={13}>
                                        Changed last <b>{lastPasswordChange(formValues?.Password?.lastPasswordChange)}.</b>
                                    </Text>
                                    <Button 
                                        colorScheme={'brand'} 
                                        fontSize={13} 
                                        variant={'outline'} 
                                        borderRadius={'full'}
                                        fontWeight={600}
                                        onClick={modalControl?.ChangePassword?.onOpen}
                                    >
                                        Change Password
                                    </Button>
                                </Stack>
                                
                                    
                            </GridItem>

                            <GridItem 
                                colSpan={[12, 12, 2]} 
                            >
                                <Text>
                                    Email Address
                                </Text>
                            </GridItem>
                            <GridItem 
                                colSpan={[12, 12, 10]} 
                            >
                                <Stack direction={['row']} alignItems={'center'}>
                                    <Text fontSize={13}>{userProfile?.emailaddress}</Text>
                                    <Button 
                                        colorScheme={'brand'} 
                                        fontSize={13} 
                                        variant={'outline'} 
                                        borderRadius={'full'}
                                        fontWeight={600}
                                    >
                                        Change Email Address
                                    </Button>
                                </Stack>
                            </GridItem>
                            <GridItem 
                                colSpan={[12, 12, 2]} 
                            >
                                <Text>
                                    Phone Number
                                </Text>
                            </GridItem>
                            <GridItem 
                                colSpan={[12, 12, 10]} 
                            >
                                <Stack direction={['row']} alignItems={'center'}>
                                    <Text fontSize={13}>{userProfile?.mobilenumber}</Text>
                                    <Button 
                                        colorScheme={'brand'} 
                                        fontSize={13} 
                                        variant={'outline'} 
                                        borderRadius={'full'}
                                        fontWeight={600}
                                    >
                                        Change Phone Number
                                    </Button>
                                </Stack>
                            </GridItem>
                            <GridItem 
                                colSpan={[12, 12, 12]} 
                                pt={10}
                            >
                                <Button 
                                    colorScheme={'brand'} 
                                    fontSize={14} 
                                    isLoading={loading}
                                    borderRadius={'full'}
                                    fontWeight={600}
                                    onClick={formSubmitHandler?.BasicInformation}
                                >
                                    Save Changes
                                </Button>
                            </GridItem>
                        </Grid>
                    }
                </Box>
            </Container>
        </Fragment>
    );
};

export { UserProfile }