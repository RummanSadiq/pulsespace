import React, { Component } from "react";
import Login_Form from "./LoginForm";
import {Row, Col} from 'antd';
class Login extends Component {
    state = {};
    render() {
        return (
            <Row style={{textAlign:'center'}}>
                <Col span={12}>
                <h1>Welcome to PulseSpace</h1>
                </Col>
                <Col span={8} >
                <Login_Form />
                </Col>
                
            </Row>
        );
    }
}

export default Login;
