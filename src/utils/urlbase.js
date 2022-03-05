const ApiBaseUrl = {
    Applicant: { 
        Base: 'http://api-dev.bfp-ecs.com/applicant/v1/',
        Auth: {
            ValidateToken: 'auth/token/validate'
        }
    }
};

const PageBaseUrl = {
    Auth: {
        Login: '/login'
    },
    Error: {
        InternalServerError: '/error/500'
    }
}

export { ApiBaseUrl, PageBaseUrl }