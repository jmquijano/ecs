import React, { createContext, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ApiBaseUrl } from "../utils/urlbase";

// Create Context
const UserProfileContext = createContext();

const UserProfileContextProvider = ({children}) => {
    // State
    const [profile, setProfile] = useState(null);

    // Token
    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    useEffect(() => {
        fetch(
            ApiBaseUrl.Applicant.Base + ApiBaseUrl.Applicant.User.Profile.url,
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
    }, []);

    return (
        <UserProfileContext.Provider value={profile}>
            {children}
        </UserProfileContext.Provider>
    )
}

export { UserProfileContext, UserProfileContextProvider }