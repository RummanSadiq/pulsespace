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
            <Row style={{textAlign:'center',marginTop:'10%'}}>
                <Col span={12} >
                    <h1>Welcome to PulseSpace, create an account to start benefitting</h1>
                </Col>
                <Col span={8}>
                        <Register_Form changeState={this.props.changeState} changeAuth={this.props.changeAuth}/>
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
