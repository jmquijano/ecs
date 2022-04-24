const getToken = () => {
    return localStorage.getItem('token');

}

const ApiBaseUrl = {
    Applicant: { 
        Base: 'http://api-dev.bfp-ecs.com/applicant/v1/',
        Auth: {
            Login: {
                url: 'auth/token',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            },
            Revoke: {
                url: 'auth/token/revoke',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            },
            ValidateToken: 'auth/token/validate',
            RegistrationValidationFromBackend: {
                url: 'auth/register/check',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            },
            Register: {
                url: 'auth/register',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            },
            CheckIssuedRegistrationToken: {
                url: 'auth/register/token',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer ' + getToken()
                }
            },
            CheckVerificationStatus: {
                url: 'auth/verification',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer ' + getToken()
                }
            },
            VerifySMS: {
                url: 'auth/verification/sms',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer ' + getToken()
                }
            },
            VerifyEmail: {
                url: 'auth/verification/email',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer ' + getToken()
                }
            },
            ResendSMS: {
                url: 'auth/verification/sms/resend',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer ' + getToken()
                }
            },
            ResendEmail: {
                url: 'auth/verification/email/resend',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer ' + getToken()
                }
            }
        },
        User: {
            Profile: {
                url: 'user/profile',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        },
        DashboardWidgets: {
            Counter: {
                url: 'dashboard/widget/counter',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        }
    }
};

const PageBaseUrl = {
    Auth: {
        Login: '/login',
        Register: '/register',
        ResetPassword: '/reset-password',
        Verify: '/verify'
    },
    Onboarding: {
        
    },
    Error: {
        InternalServerError: '/error/500'
    },
    Dashboard: '/',
    Application: '/application' // parent to Dashboard
}

export { ApiBaseUrl, PageBaseUrl }