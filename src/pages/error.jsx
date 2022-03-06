import ecslogo from '../assets/images/ECS-Logo-300dpi.png';
import React, {Fragment, Component} from "react"
import { Helmet } from "react-helmet";

function InternalServerError() {
    return (
        <Fragment>
            <Helmet>
                <title>Internal Server Error</title>
            </Helmet>
            
        </Fragment>
    );
}

export { InternalServerError }