import * as React from "react";
import '../css/login.css';
import '../css/app.css';
import '../libs/bootstrap/css/bootstrap.min.css';
import { Container, Row, Col, Navbar } from "react-bootstrap";
import { Helmet } from "react-helmet";
export default function Login() {
    return (
        <React.Fragment>
            <div>
                <Helmet title={'Login'}></Helmet>
            </div>
            <div className={'app-header px-3 py-4'}>
                <Container>
                    <Row>
                        <Col>
                            <Navbar.Brand className={'app-logo-title'} href={'/'}>
                                eFSIC
                            </Navbar.Brand>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container>
                <div className={'d-flex login-panel'}>
                    <div className={'login-box rounded-custom'}>
                        <span className={'text-center login-text-title py-4'}>Sign In</span>
                        <div className={'login-line-division'}></div>
                        <div className={'py-5'}></div>
                    </div>
                </div>
            </Container>
            
        </React.Fragment>
        
    );
}
