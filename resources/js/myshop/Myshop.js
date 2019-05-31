import React, { Component } from "react";
import "./Myshop.css";
import Dashboard from "./Components/Dashboard";
import ShopCreate from "./Components/ShopCreate";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "antd/dist/antd";
import axios from "axios";

import Cookies from "universal-cookie";

const cookies = new Cookies();

axios.defaults.headers = {
    Authorization: "Bearer " + cookies.get("access_token")
};

import { BrowserRouter, Route } from "react-router-dom";

var shop;
class Myshop extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        shop: 0,
        auth: "login"
    };

    componentDidMount() {
        axios.get("https://api.pulsespace.com/user").then(res => {
            console.log("user received in response is", res.data);
            if (res.data.id) {
                this.getShop();
            } else {
                this.setState({ shop: 0 });
            }
        });
    }
    changeState = () => {
        console.log("changing the state, it must redirect");
        // this.setState({ shop: 1 });
        this.getShop();
    };

    changeAuth = () => {
        if (this.state.auth == "login") {
            this.setState({ auth: "register" });
        } else {
            this.setState({ auth: "login" });
        }
    };

    getShop = () => {
        axios.defaults.headers = {
            Authorization: "Bearer " + cookies.get("access_token")
        };
        axios
            .get("https://api.pulsespace.com/users/shop")
            .then(res => {
                console.log("Shop data is", res.data);
                this.setState({ shop: res.data.shop });
            })
            .catch(err => {
                console.log(
                    "api to see if store exists or not cannot be accessed",
                    err
                );
            });
    };
    render() {
        return (
            <div>
                {this.state.shop > 0 && <Dashboard />}
                {this.state.shop == 0 && (
                    <BrowserRouter>
                        <div>
                            {this.state.auth == "register" && (
                                <SignUp
                                    changeState={this.changeState}
                                    changeAuth={this.changeAuth}
                                />
                            )}
                            {this.state.auth == "login" && (
                                <Login
                                    changeState={this.changeState}
                                    changeAuth={this.changeAuth}
                                />
                            )}
                        </div>
                    </BrowserRouter>
                )
                //
                }
                {this.state.shop < 0 && <ShopCreate lift={this.changeState} />}

                {/* {!this.state.logged>0 && (
                           
                        )} */}
            </div>
        );
    }
}

if (document.getElementById("app")) {
    ReactDOM.render(<Myshop />, document.getElementById("app"));
}
