import React, { Component } from "react";
import Login_Form from "./LoginForm";
import { Row, Col, Menu } from "antd";
import { NavLink } from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props);
        // console/log('rendering login component');
    }
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
            <div>
                {/* <Menu
                    theme="light"
                    mode="horizontal"
                    style={{
                        lineHeight: "50px",
                        backgroundColor: "#F5F5F5"
                    }}
                >
                    <Menu.Item key="1">
                        <NavLink to='/reg'>REGISTER</NavLink>
                    </Menu.Item>
                </Menu> */}

                <Row style={{ textAlign: "center", marginTop: "10%" }}>
                    <Col span={12}>
                        <h1>Welcome to PulseSpace</h1>
                    </Col>
                    <Col span={8}>
                        <Login_Form changeState={this.props.changeState} changeAuth={this.props.changeAuth}/>
                    </Col>
                </Row>
            </div>
            // <div>
            //     <Modal
            //         title="Login to Continue"
            //         visible={this.state.visible}
            //         done={this.handleOk}
            //         footer={null}
            //         // onCancel={this.handleCancel}
            //     >
            //         <Login_Form />
            //     </Modal>
            // </div>
        );
    }
}

export default Login;
