import { exit } from 'process';
import React, { useContext, createContext } from 'react';
import { ApiBaseUrl } from '../utils/urlbase';

const authContext = createContext()

export function AuthProvider({children}) {
    const auth = useProvideAuth()
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
    return useContext(authContext)
}

const useProvideAuth = () =>{
   
    const Login = async (props) => {
        return console.log(props);
    }
    const Register = {
        CheckCredentials: (props) => {
            props.onStart();

            const values = props.set ?? props.values ?? props.param;

            fetch(ApiBaseUrl.Applicant.Base + ApiBaseUrl.Applicant.Auth.RegistrationValidationFromBackend.url, {
                method: ApiBaseUrl.Applicant.Auth.RegistrationValidationFromBackend.method,
                headers: ApiBaseUrl.Applicant.Auth.RegistrationValidationFromBackend.headers,
                body: JSON.stringify(values)
            })
            .then(response => response.json())
            .then((res) => {
                if (!res.status) {
                    props?.onFailure(res?.errordata);
                } else {
                    props?.onSuccess(res);
                }
            })
            .finally((res) => {
                props?.onEnd(res);
            });
        },
        CheckBasicInformation: (props) => {
            const values = props.set ?? props.values ?? props.param;

            fetch(ApiBaseUrl.Applicant.Base + ApiBaseUrl.Applicant.Auth.RegistrationValidationFromBackend.url, {
                method: ApiBaseUrl.Applicant.Auth.RegistrationValidationFromBackend.method,
                headers: { 
                    ...ApiBaseUrl.Applicant.Auth.RegistrationValidationFromBackend.headers
                    
                },
                body: JSON.stringify(values)
            })
            .then(response => response.json())
            .then((res) => {
                if (!res.status) {
                    props?.onFailure(res.errordata);
                } else {
                    props?.onSuccess(res);
                }


            })
            .finally((res) => {
                props?.onEnd(res);
            });
        },
        FinalizeRegistrationProcess: (props) => {
            const values = props.set ?? props.values ?? props.param;

            // Push post parameters to registration endpoint
            fetch(ApiBaseUrl.Applicant.Base + ApiBaseUrl.Applicant.Auth.Register.url, {
                method: ApiBaseUrl.Applicant.Auth.Register.method,
                headers: { 
                    ...ApiBaseUrl.Applicant.Auth.Register.headers,
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                body: values
            })
            .then(response => response.json())
            .then((res) => {
                if (!res.status) {
                    props?.onFailure(res?.errordata);
                } else {
                    props?.onSuccess(res.data.access_token);
                }
            })
            .finally((res) => {
                props?.onEnd(res);
            });
        },
        ContactChannelVerification: {
            sms: (props) => {
                // On Start
                props?.onStart();

                // Values
                const values = props.set ?? props.values ?? props.param;

                fetch(ApiBaseUrl.Applicant.Base + ApiBaseUrl.Applicant.Auth.VerifySMS.url, {
                    method: ApiBaseUrl.Applicant.Auth.VerifySMS.method,
                    headers: {
                        ...ApiBaseUrl.Applicant.Auth.VerifySMS.headers,
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify(values)
                })
                .then(res => res.json())
                .then((res) => {
                    if (!res.status) {
                        props?.onFailure(res?.errordata);
                    } else {
                        props?.onSuccess(res);
                    }
                    
                })
                .finally((res) => {
                    props?.onEnd(res);
                });
            },
            email: (props) => {
                // On Start
                props.onStart();

                // Values
                const values = props.set ?? props.values ?? props.param;

                fetch(ApiBaseUrl.Applicant.Base + ApiBaseUrl.Applicant.Auth.VerifyEmail.url, {
                    method: ApiBaseUrl.Applicant.Auth.VerifyEmail.method,
                    headers: { 
                        ...ApiBaseUrl.Applicant.Auth.VerifyEmail.headers,
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify(values)
                })
                .then(res => res.json())
                .then((res) => {
                    if (!res.status) {
                        props?.onFailure(res?.errordata);
                    } else {
                        props?.onSuccess(res);
                    }
                    
                })
                .finally((res) => {
                    props?.onEnd(res);
                });
            }
        },
        ResendVerification: {
            sms: (props) => {
                // On Start
                props.onStart();

                fetch(ApiBaseUrl.Applicant.Base + ApiBaseUrl.Applicant.Auth.ResendSMS.url, {
                    method: ApiBaseUrl.Applicant.Auth.ResendSMS.method,
                    headers: {
                        ...ApiBaseUrl.Applicant.Auth.ResendSMS.headers,
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(res => res.json())
                .then((res) => {
                    if (!res.status) {
                        props?.onFailure(res?.errordata);
                    } else {
                        props?.onSuccess(res);
                    }
                    
                })
                .finally((res) => {
                    props?.onEnd(res);
                });
            },
            email: (props) => {
                // On Start
                props.onStart();

                fetch(ApiBaseUrl.Applicant.Base + ApiBaseUrl.Applicant.Auth.ResendEmail.url, {
                    method: ApiBaseUrl.Applicant.Auth.ResendEmail.method,
                    headers: {
                        ...ApiBaseUrl.Applicant.Auth.ResendEmail.headers,
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(res => res.json())
                .then((res) => {
                    if (!res.status) {
                        props?.onFailure(res?.errordata);
                    } else {
                        props?.onSuccess(res);
                    }
                    
                })
                .finally((res) => {
                    props?.onEnd(res);
                });
            }
        }
    }
    
    const ContactChannelVerification = (props) => {
        if (props.currentStep >= 0) {
            if (localStorage.getItem('token') !== null) {
                props.onStart();
                fetch(ApiBaseUrl.Applicant.Base + ApiBaseUrl.Applicant.Auth.CheckIssuedRegistrationToken.url, {
                    method: ApiBaseUrl.Applicant.Auth.CheckIssuedRegistrationToken.method,
                    headers: {
                        ...ApiBaseUrl.Applicant.Auth.CheckIssuedRegistrationToken.headers,
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(response => response.json())
                .then((res) => {
                    if (res.data?.valid) {
                        props?.onValidationCheck?.onStart();
                        fetch(ApiBaseUrl.Applicant.Base + ApiBaseUrl.Applicant.Auth.CheckVerificationStatus.url, {
                            method: ApiBaseUrl.Applicant.Auth.CheckVerificationStatus.method,
                            headers: { 
                                ...ApiBaseUrl.Applicant.Auth.CheckVerificationStatus.headers,
                                Authorization: 'Bearer ' + localStorage.getItem('token')
                            }
                        })
                        .then(response => response.json())
                        .then((res) => {
                            // Dapat verified ang Mobile Number before mag-callback sa onValidationCheck.email()
                            if (res.data.mobilenumber.verified) {
                                props?.onValidationCheck?.email(res.data.emailaddress.verified);
                            }
                            
                            props?.onValidationCheck?.mobile(res.data.mobilenumber.verified);

                            // Callback function ni siya for Resend Interval
                            props?.onResendInterval?.sms(res?.data?.mobilenumber?.resend_interval);
                            props?.onResendInterval?.email(res?.data?.emailaddress?.resend_interval);
                        }).finally((res) => {
                            props?.onValidationCheck?.onEnd(res);
                        })
                        
                    }
                })
                .finally((res) => {
                    props?.onEnd(res);
                });
            }
        }
        
    }

    return {
        Login,
        RegisterContext: Register,
        ContactChannelVerification
    }
}