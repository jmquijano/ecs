import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ApiBaseUrl, UrlWithParam } from "../utils/urlbase";
import { AuthTokenContext } from "./AuthTokenContext";

// Create Context
const UserProfileContext = createContext();

const UserProfileContextProvider = ({children}) => {
    // Auth Token Context
    const authToken = useContext(AuthTokenContext);

    // State
    const [profile, setProfile] = useState(null);

    // Token
    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    useEffect(() => {
        if (authToken?.data !== undefined)  {
            fetch(
                ApiBaseUrl.Applicant.Base + UrlWithParam({
                    'id': authToken?.data?.id
                }, ApiBaseUrl.Applicant.User.Profile.url),
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
                setProfile(res?.data)
            })
            .catch((error) => { 
                console.log('error');
                navigate('/error/500');
            })
        }
        
    }, [authToken?.data]);

    return (
        <UserProfileContext.Provider value={profile}>
            {children}
        </UserProfileContext.Provider>
    )
}

export { UserProfileContext, UserProfileContextProvider }