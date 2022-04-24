import { Container, Spacer } from '@chakra-ui/react';
import React, { Fragment, useState } from 'react';
import { Helmet } from "react-helmet-async";
import { BrowserRouter, Outlet, Routes } from 'react-router-dom';
import { AppFooter } from '../../components/dash-ui/footer';
import { Navigation } from '../../components/dash-ui/navigation';

export default function Dashboard() {
    return (
        
        <Fragment>
            <Helmet>
                <title>Applicant's Dashboard</title>
            </Helmet>
            <Fragment>
                <Navigation />
                <Outlet />
                <Spacer my={10} />
                <AppFooter />
            </Fragment>
        </Fragment>
    );
}
