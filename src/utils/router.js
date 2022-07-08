import React, { useState, useEffect } from 'react';
import { ApiBaseUrl, PageBaseUrl } from './urlbase';

import { Splash } from '../components/splash';
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { UserProfileContextProvider } from '../context/UserProfileContext';
import { AuthTokenContextProvider } from '../context/AuthTokenContext';
import { Route } from "react-router-dom";

const HandleTokenValidation = (callback) => {
    const token = localStorage.getItem('token');
    try {
        fetch(ApiBaseUrl.Applicant.Base + ApiBaseUrl.Applicant.Auth.ValidateToken, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        .then(response => response.json())
        .then((res) => {
            callback(res);
        })
        .catch(e => {
            callback({
                exception: true
            });
        });
    } catch (e) {
         
    }
    
}

const PublicRoute = ({children}) => {
    let token = localStorage.getItem("token");

    const [ Authenticated, SetAuthentication ] = useState(false);
    const [ Loading, SetLoading ] = useState(true);

    useEffect(() => {
        HandleTokenValidation((res) => {
            if (res?.success) {
                SetAuthentication(true);
            } else {
                localStorage.removeItem('token');
            }
    
            SetLoading(false);
        });
    }, [])
    

    return !Loading ? 
        (
            Authenticated ? <Navigate to={`${PageBaseUrl.Auth.Logout}?prompt=true&next=${PageBaseUrl.Auth.Login}`} /> : children
        ) : <Splash text="Fetching resources"/>;
}

const PrivateRoute = ({children}) => {
    let token = localStorage.getItem("token");

    const [ Authenticated, SetAuthentication ] = useState(false);
    const [ Loading, SetLoading ] = useState(true);
    const [ Exception, SetException ] = useState(false);

    useEffect(() => {
        HandleTokenValidation((res) => {
            if (res?.success) {
                SetAuthentication(true);
            } else {
                SetException(res?.exception);

                localStorage.removeItem('token');
            }
    
            SetLoading(false);
        });
    }, [])
    const { pathname } = useLocation();
    const redirect_url = pathname ?? '/';

    return !Loading ? Exception ? <Navigate to={`${PageBaseUrl.Error.InternalServerError}`} /> :
        (
            Authenticated ? 
                <AuthTokenContextProvider>
                    <UserProfileContextProvider>
                        {children}
                    </UserProfileContextProvider>
                </AuthTokenContextProvider> 
                : 
                <Navigate to={`${PageBaseUrl.Auth.Login}?next=${redirect_url}`} />
        ) : <Splash text="Fetching resources"/>;
}

const AppRoute = ({ component: Component, type,  ...rest }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [canProceed, setCanProceed] = useState(false);

    const navigate = useNavigate();

    const { pathname } = useLocation();
    const post_auth_redirect_url = pathname ?? '/';

    useEffect(() => {
        switch (type) {
            case 'public':
                setIsLoading(false);
                setCanProceed(true);
            break;
            case 'private':
                HandleTokenValidation((res) => {
                    if (res?.success) {
                        setIsLoading(false);
                        setCanProceed(true);

                    } else {        
                        navigate(`${PageBaseUrl.Auth.Login}?next=${post_auth_redirect_url}`);
                    }
            
                    setIsLoading(false);
                });
            break;
        }
    }, []);

    return (
        <Route
            {...rest}
            element={canProceed ? <Component /> 
            :
            <Navigate to={`${PageBaseUrl.Auth.Login}?next=${post_auth_redirect_url}`} />
        }
        />
    );
}



export { PublicRoute, PrivateRoute, HandleTokenValidation, AppRoute }