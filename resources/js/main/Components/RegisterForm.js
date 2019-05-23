import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from "antd";

class RegisterForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);

                this.props.done();
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
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
                                    type="mail"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                />
                            }
                            placeholder="Email"
                        />
                    )}
                </Form.Item>

                <Form.Item>
                    {getFieldDecorator("name", {
                        rules: [
                            {
                                required: true,
                                message: "Please input your name!"
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
                            placeholder="Username"
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
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                        Register
                    </Button>
                    <br/>
                    Or <a href="/login">Login</a>
                </Form.Item>
            </Form>
        );
    }
}

const Register_Form = Form.create({ name: "normal_login" })(RegisterForm);
export default Register_Form;
