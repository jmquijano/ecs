import React, { Component, Fragment } from 'react';
import { Paper, Box, Typography, CircularProgress } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import ecslogo from '../assets/images/ECS-Logo-300dpi.png';

function Splash() {
    return (
        <Fragment>
            <Helmet>
                <title>ECS</title>
            </Helmet>
            <Paper sx={{
                display: 'flex',
                height: '100vh',
                width: '100%',
                background: `#fff`,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Box sx={{
                    textAlign: 'center'
                }}>
                    <img src={ecslogo} width={'auto'} height={50} />
                    
                    <Box sx={{
                        marginTop: 2
                    }}>
                        <CircularProgress />
                    </Box>
                </Box>
            </Paper>
        </Fragment>
    );
}



export { Splash }