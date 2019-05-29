import React, { Component } from "react";
import Register_Form from "./RegisterForm";
import { Card, Row, Col, Modal } from "antd";
class SignUp extends Component {
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
            // <div>
            //     <Modal
            //         title="Creaet an account"
            //         visible={this.state.visible}
            //         handleOk={this.handleOk}
            //         footer={null}
            //         onCancel={this.handleOk}
            //     >
            //         <Register_Form done={this.handleOk}/>
            //     </Modal>
            // </div>
        );
    }
}

export default SignUp;
