import React, { Component } from "react";
import Login_Form from "./LoginForm";
import { Row, Col, Modal } from "antd";
class Login extends Component {
    state = { visible: true };
    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false
        });
    };
    render() {
        return (
            // <Row style={{textAlign:'center'}}>
            //     <Col span={12}>
            //     <h1>Welcome to PulseSpace</h1>
            //     </Col>
            //     <Col span={8} >
            //     <Login_Form />
            //     </Col>

            // </Row>
            <div>
                <Modal
                    title="Login to Continue"
                    visible={this.state.visible}
                    done={this.handleOk}
                    footer={null}
                    // onCancel={this.handleCancel}
                >
                    <Login_Form />
                </Modal>
            </div>
        );
    }
}

export default Login;
