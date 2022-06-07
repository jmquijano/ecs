import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./utils/router";
import Login from './pages/login';
import { Helmet } from "react-helmet-async";
import { ApiBaseUrl, PageBaseUrl } from "./utils/urlbase";
import { InternalServerError } from "./pages/error";
import Register from "./pages/register";
import FSEDForm from "./pages/tests/fsedform";
import Dashboard from "./pages/portal";
import Home from "./pages/portal/home";
import ApplicationIndex from "./pages/portal/application";
import { UserProfile } from "./pages/portal/user/profile";
import CreateApplication from "./pages/portal/application/create";
import { GoExternalLink } from "./pages/go/external";

export default function AppRoutes() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <Routes>
                    <Route 
                        path={PageBaseUrl.Dashboard}
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        } 
                    >
                        <Route path={PageBaseUrl.Dashboard} element={
                            <Home />
                        } />
                        <Route path={PageBaseUrl.Application.Index} element={
                            <ApplicationIndex />
                        } />

                        <Route path={PageBaseUrl.Application.New.Index} element={
                            <CreateApplication />
                        } />

                        <Route path={PageBaseUrl.Application.New.WithType} element={
                            <CreateApplication />
                        } />

                        <Route path={PageBaseUrl.User.Profile} element={
                            <UserProfile />
                        } />
                    </Route>
                    <Route 
                        path={PageBaseUrl.Auth.Login}
                        element={<Login />} 
                    />
                    <Route 
                        path={PageBaseUrl.Auth.Register} 
                        element={<Register />}
                    />

                    <Route 
                        path={PageBaseUrl.Go.External}
                        element={<GoExternalLink />}
                    />

                    {/** Page/Components Test Routes */}
                    <Route 
                        path={'/test/fsedform'} 
                        element={<FSEDForm />}
                    />

                    {/** Dashboard */}
                    <Route 
                        path={PageBaseUrl.Dashboard}
                        element={
                            <PrivateRoute>
                                <Login />
                            </PrivateRoute>
                        }
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
