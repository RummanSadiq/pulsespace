import React, { Component } from "react";
import Register_Form from "./RegisterForm";
import { Card, Row, Col } from "antd";
class SignUp extends Component {
    state = {};
    render() {
        return (
            <Row>
                <Col span={12} style={{textAlign:'center'}}>
                    <h1>Welcome to PulseSpace</h1>
                </Col>
                <Col span={8}>
                    <Card>
                        <Register_Form />
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default SignUp;
