import * as React from "react";
import '../css/login.css';
import '../css/app.css';
import '../libs/bootstrap/css/bootstrap.min.css';
import { Helmet } from "react-helmet-async";
import { Pane, Text } from "evergreen-ui";
export default function Login() {
    return (
        <React.Fragment>
            <div>
                <Helmet title={'Login'}></Helmet>
            </div>
            <Pane width={'100%'} height={'100vh'} background={'#F9F9FB'} display="flex" alignItems="center" justifyContent="center" border="default">
                <Pane width={400} height={400} background={'#ffffff'} border={'default'}>

                </Pane>
            </Pane>
            
        </React.Fragment>
        
    );
}
