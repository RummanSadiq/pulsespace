import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";

import axios from "axios";

import Cookies from "universal-cookie";

const cookies = new Cookies();
class LoginForm extends React.Component {
    state = {
        forgot: false
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);

                axios
                    .post("https://api.pulsespace.com/login", values)
                    .then(res => {
                        console.log("response from login api is", res);
                        cookies.set("access_token", res.data.token, {
                            domain: ".pulsespace.test"
                        });
                        this.props.done();
                        window.location.reload();
                    });

                //to close modal
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                    {getFieldDecorator("email", {
                        rules: [
                            {
                                type: "email",
                                required: true,
                                message: "Please input your email!"
                            }
                        ]
                    })(
                        <Input
                            prefix={
                                <Icon
                                    type="user"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                />
                            }
                            placeholder="email"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator("password", {
                        rules: [
                            {
                                required: true,
                                message: "Please input your Password!"
                            }
                        ]
                    })(
                        <Input
                            prefix={
                                <Icon
                                    type="lock"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                />
                            }
                            type="password"
                            placeholder="Password"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    <a
                        className="login-form-forgot"
                        href=""
                        onClick={event => {
                            event.preventDefault();
                            this.setState({ forgot: true });
                        }}
                    >
                        Forgot password?
                    </a>
                    <br />

                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                        Log in
                    </Button>
                    <br />
                    {/* Or <a href="">register now!</a> */}
                    {this.state.forgot && (
                        <div>
                            <Input
                                type="email"
                                placeholder="Enter your email"
                            />{" "}
                            <br /> <Button type="primary">Submit</Button>{" "}
                        </div>
                    )}
                </Form.Item>
            </Form>
        );
    }
}

const Login_Form = Form.create({ name: "normal_login" })(LoginForm);
export default Login_Form;
