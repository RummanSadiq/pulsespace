import React, { Component } from "react";
import {
    Col,
    Card,
    Row,
    Carousel,
    Button,
    Layout,
    Menu,
    AutoComplete,
    Input,
    Icon,
    Cascader,
    Popover,
    Dropdown
} from "antd";
import { BrowserRouter, Route, Redirect, NavLink, Link } from "react-router-dom";
import SearchResults from "./Search";
import logo from "../Images/logo.png";
import axios from "axios";

import "../css/sbar.css";
import MenuItem from "antd/lib/menu/MenuItem";

const menu = (
    <Menu>
        <MenuItem>Women's Fashion</MenuItem>
        <MenuItem>Men's Fashion</MenuItem>
        <MenuItem>Electronics and Devices</MenuItem>
        <MenuItem>Electronic Accessories</MenuItem>
        <MenuItem>TV and Home Applicances</MenuItem>
        <MenuItem>Health and Beauty</MenuItem>
        <MenuItem>Babies and Toys</MenuItem>
        <MenuItem>Grocery and Pets</MenuItem>
        <MenuItem>Home and Lifestyle</MenuItem>
        <MenuItem>Watches and Accessories</MenuItem>
        <MenuItem>Automotive and Motorbike</MenuItem>
        <MenuItem>Sports</MenuItem>
    </Menu>
);

class Head extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        redirect: false,
        r: false,
        logged: "",
        value: ""
    };

    componentDidMount() {
        axios.get("/api/user").then(res => {
            const user = res.data;
            console.log("user is ", user);
            this.setState({ logged: user });
        });
    }
    handleSearch = e => {
        console.log("search value is", e.target.value);
        this.setState({ value: e.target.value });
    };

    doLogout = e => {
        e.preventDefault();
        axios.post("/logout").then(res => {
            window.location.reload();
        });
    };

    render() {
        return (
            <BrowserRouter>
                <div>
                    <div style={{ backgroundColor: "#F5F5F5" }}>
                        <Menu
                            theme="light"
                            mode="horizontal"
                            style={{
                                lineHeight: "30px",
                                marginLeft: "70%",
                                backgroundColor: "#F5F5F5"
                            }}
                        >
                            {this.state.logged.id && (
                                <Menu.Item key="2">
                                    <a href="/messages">Messages</a>
                                </Menu.Item>
                            )}
                            <Menu.Item key="1">
                                <NavLink to="/myshop.pulsespace.test">
                                    Store owner?
                                </NavLink>
                            </Menu.Item>
                            {this.state.logged.id && (
                                <Menu.Item key="2">
                                    <NavLink
                                        to="/logout"
                                        onClick={this.doLogout}
                                    >
                                        Logout
                                    </NavLink>
                                </Menu.Item>
                            )}

                            {!this.state.logged.id && (
                                <Menu.Item key="2">
                                    <a href="/login">Login</a>
                                </Menu.Item>
                            )}
                            {this.state.logged.id && (
                                <Menu.Item key="3">Profile</Menu.Item>
                            )}
                            {!this.state.logged.id && (
                                <Menu.Item key="3">
                                    <a href="/register">Signup</a>
                                </Menu.Item>
                            )}
                        </Menu>
                    </div>
                    <Row>
                        <Col offset={4}>
                            <div
                                style={{
                                    paddingRight: "50px",
                                    padding: "1%",
                                    position: "relative"
                                }}
                            >
                                <a href="/">
                                    <img
                                        src={logo}
                                        alt="Shopx"
                                        width="8%"
                                        height="8%"
                                    />
                                </a>
                                <Input
                                    onChange={this.handleSearch}
                                    size="large"
                                    style={{ width: "50%" }}
                                    addonAfter={
                                        <a
                                            href={"/search/" + this.state.value}
                                            style={{ color: "white" }}
                                        >
                                            {" "}
                                            <Button
                                                type="primary"
                                                size="large"
                                                icon="search"
                                                rounded="true"
                                            >
                                                Search
                                            </Button>
                                        </a>
                                    }
                                />
                                <a href="/mylist">
                                    <Icon
                                        type="shopping-cart"
                                        style={{ fontSize: "50px" }}
                                    />
                                </a>
                            </div>
                        </Col>
                    </Row>{" "}
                    <div style={{ padding: "2%", textAlign: "center" }}>
                        <Dropdown overlay={menu}>
                            <NavLink to="/categories">
                                <Button icon="appstore" rounded="true">
                                    Categories
                                </Button>
                            </NavLink>
                        </Dropdown>

                        <Button icon="shop" rounded="true">
                            Stores
                        </Button>

                        <Button icon="database" rounded="true">
                            Products
                        </Button>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default Head;
