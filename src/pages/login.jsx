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
                                Electronic Certification System (ECS)
                            </Navbar.Brand>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container>
                <div className={'d-flex login-panel'}>
                    <div className={'login-box px-5 py-5'}>
                        <h1 className={'login-text-title'}>Sign In</h1>
                        <hr />
                    </div>
                </div>
            </Container>
            
        </React.Fragment>
        
    );
}
