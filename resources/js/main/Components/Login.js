import React, { Component } from "react";
import Login_Form from "./LoginForm";
import { BrowserRouter } from "react-router-dom";
class Login extends Component {
    state = {};
    render() {
        return (
            <BrowserRouter>
                <Login_Form />
            </BrowserRouter>
        );
    }
}

export default Login;
