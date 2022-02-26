import { Paper, Typography, Box } from "@mui/material";
import ecslogo from '../assets/images/ECS-Logo-300dpi.png';
import React, {Fragment, Component} from "react"
import { Helmet } from "react-helmet";

function InternalServerError() {
    return (
        <Fragment>
            <Helmet>
                <title>Internal Server Error</title>
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
                        <Typography>Internal Server Error</Typography>
                    </Box>
                </Box>
            </Paper>
        </Fragment>
    );
}

export { InternalServerError }