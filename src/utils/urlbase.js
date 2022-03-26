const ApiBaseUrl = {
    Applicant: { 
        Base: 'http://api-dev.bfp-ecs.com/applicant/v1/',
        Auth: {
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
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            },
            CheckVerificationStatus: {
                url: 'auth/verification',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            },
            VerifySMS: {
                url: 'auth/verification/sms',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            },
            VerifyEmail: {
                url: 'auth/verification/email',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
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
    Dashboard: '/dashboard'
}

export { ApiBaseUrl, PageBaseUrl }