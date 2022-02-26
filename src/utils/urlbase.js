const ApiBaseUrl = {
    Applicant: { 
        Base: 'http://ecs-api.local/applicant/v1/',
        Auth: {
            ValidateToken: 'auth/token/validate'
        }
    }
};

const PageBaseUrl = {
    Auth: {
        Login: '/auth/login'
    },
    Error: {
        InternalServerError: '/error/500'
    }
}

export { ApiBaseUrl, PageBaseUrl }