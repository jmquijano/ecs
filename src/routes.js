import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./utils/router";
import Login from './pages/login';
import { Helmet } from "react-helmet-async";
import { ApiBaseUrl, PageBaseUrl } from "./utils/urlbase";
import { InternalServerError } from "./pages/error";
import Register from "./pages/register";
import FSEDForm from "./pages/tests/fsedform";

export default function AppRoutes() {
    return (
        <React.Fragment>
            <Helmet>
                <title>ECS (Applicant Portal)</title>
            </Helmet>
            <BrowserRouter>
                <Routes>
                    <Route 
                        path="/" 
                        element={
                            <PrivateRoute>
                                <Login />
                            </PrivateRoute>
                        } 
                    />
                    <Route 
                        path={PageBaseUrl.Auth.Login}
                        element={<Login />} 
                    />
                    <Route 
                        path={PageBaseUrl.Auth.Register} 
                        element={<Register />}
                    />

                    {/** Page/Components Test Routes */}
                    <Route 
                        path={'/test/fsedform'} 
                        element={<FSEDForm />}
                    />

                    {/** Errors */}
                    <Route
                        path={PageBaseUrl.Error.InternalServerError}
                        element={
                            <InternalServerError />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </React.Fragment>
    )
}
