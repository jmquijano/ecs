import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { ApiBaseUrl } from "../utils/urlbase";

const AuthTokenContext = createContext();

const AuthTokenContextProvider = ({children}) => {
    // State
    const [auth, setAuth] = useState(null);

    // Token
    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    useEffect(() => {
        fetch(
            ApiBaseUrl.Applicant.Base + ApiBaseUrl.Applicant.Auth.TokenVerify.url,
            {
                method: ApiBaseUrl.Applicant.User.Profile.method,
                headers: {
                    ...ApiBaseUrl.Applicant.User.Profile.headers,
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then(res => res.json())
        .then((res) => {
            setAuth(res?.data);
        })
        .catch((error) => { 
            navigate('/error/500');
        });
    }, []);

    return <AuthTokenContext.Provider value={auth}>{children}</AuthTokenContext.Provider>
}

export {AuthTokenContext, AuthTokenContextProvider}