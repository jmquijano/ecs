import { Center, Box, Image } from '@chakra-ui/react';
import React, { Component, Fragment, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { SyncLoader } from 'react-spinners';
import ecslogo from '../assets/images/ECS-Logo-300dpi.png';

function Splash() {
    
    return (
        <Fragment>
            <Helmet>
                <title>ECS</title>
            </Helmet>
            <Center width={'100%'} height={'100vh'}>
                <Box alignItems={'center'} textAlign={'center'}>
                    <Box marginY={5}>
                        <Image src={ecslogo} width={'auto'} height={'40px'} />   
                    </Box>
                    <SyncLoader color={'#e05a2c'} size={12}/>
                </Box>
            </Center>
        </Fragment>
    );
}



export { Splash }