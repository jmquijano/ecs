import { Pane, Text } from 'evergreen-ui';
import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import ecslogo from '../assets/images/ECS-Logo-300dpi.png';

function Splash() {
    return (
        <Fragment>
            <Helmet>
                <title>ECS</title>
            </Helmet>
            <Pane width={'100%'} height={'100vh'} background={'#F9F9FB'} display="flex" alignItems="center" justifyContent="center" border="default">
                <Text>Loading</Text>
            </Pane>
        </Fragment>
    );
}



export { Splash }