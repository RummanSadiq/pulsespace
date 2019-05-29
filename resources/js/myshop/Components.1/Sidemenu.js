import React, { Component } from "react";
import logo from "../react_images/logo.png";
import { NavLink } from "react-router-dom";
import { Layout, Icon, Menu, Divider, Row, Col, Affix } from "antd";
import Dashboard from "./Dashboard";
import { BrowserRouter } from "react-router-dom";
import Axios from "axios";
const { Sider } = Layout;
import "../Myshop.css";

const SubMenu = Menu.SubMenu;

class Sidemenu extends Component {
    state = {
        collapsed: false
    };

    doLogout = e => {
        e.preventDefault();
        Axios.get("https://api.pulsespace.com/logout").then(res => {
            window.location.reload();
        });
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        return (
            <Row type="flex" style={{ position: "absolute" }}>
                <Col
                // xs={{ span: 4 }}
                // sm={{ span: 6 }}
                // md={{ span: 6 }}
                // lg={{ span: 8 }}
                // xl={{ span: 8 }}
                //  style={{ minHeight: "50vh" }}
                >
                    <Sider
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.onCollapse}
                        breakpoint="xs"
                        collapsedWidth="80"
                        // onBreakpoint={(broken) => { console.log(broken); }}
                        theme="light"
                        style={{
                            overflow: "auto",
                            height: "100vh",
                            position: "fixed",
                            left: 0
                        }}
                    >
                        <Menu theme="light" mode="inline">
                            <div className="logo">
                                <img
                                    src={logo}
                                    alt="Shopx"
                                    style={{ width: 180 }}
                                />
                            </div>
                            <Divider />
                            <Menu.Item key="1" style={{ fontSize: "22px" }}>
                                <NavLink to="/shop">
                                    <Icon
                                        type="shop"
                                        theme="filled"
                                        style={{ fontSize: "100%" }}
                                    />
                                    <span>Shop</span>
                                </NavLink>
                            </Menu.Item>

                            <Divider />
                            <Menu.Item key="2" style={{ fontSize: "22px" }}>
                                <NavLink to="/Messages">
                                    <Icon
                                        type="message"
                                        theme="filled"
                                        style={{ fontSize: "100%" }}
                                    />
                                    <span>Messages</span>
                                </NavLink>
                            </Menu.Item>
                            <Divider />
                            <SubMenu
                                key="products"
                                title={
                                    <span style={{ fontSize: "22px" }}>
                                        <Icon
                                            type="database"
                                            theme="filled"
                                            style={{ fontSize: "100%" }}
                                        />
                                        <span>Products</span>
                                    </span>
                                }
                            >
                                <Divider />
                                <Menu.Item key="3" style={{ fontSize: "20px" }}>
                                    <NavLink to="/Add">
                                        {" "}
                                        <Icon
                                            type="file-add"
                                            theme="filled"
                                            style={{ fontSize: "80%" }}
                                        />
                                        <span>Add Product</span>
                                    </NavLink>
                                </Menu.Item>
                                <Divider />

                                <Menu.Item key="4" style={{ fontSize: "20px" }}>
                                    <NavLink to="/ViewProduct">
                                        <Icon
                                            type="table"
                                            style={{ fontSize: "80%" }}
                                        />
                                        <span>View Products</span>
                                    </NavLink>
                                </Menu.Item>
                            </SubMenu>
                            <Divider />
                            <Menu.Item key="5" style={{ fontSize: "22px" }}>
                                <NavLink to="/Reviews">
                                    <Icon
                                        type="star"
                                        theme="filled"
                                        style={{ fontSize: "100%" }}
                                    />
                                    <span>Reviews</span>
                                </NavLink>
                            </Menu.Item>
                            <Divider />
                            <Menu.Item key="6" style={{ fontSize: "22px" }}>
                                <NavLink to="/FAQs">
                                    <Icon
                                        type="question"
                                        style={{ fontSize: "100%" }}
                                    />
                                    <span>FAQ'S</span>
                                </NavLink>
                            </Menu.Item>
                            <Divider />
                            <Menu.Item key="7" style={{ fontSize: "22px" }}>
                                <NavLink to="/Posts">
                                    <Icon
                                        type="layout"
                                        theme="filled"
                                        style={{ fontSize: "100%" }}
                                    />
                                    <span>Posts</span>
                                </NavLink>
                            </Menu.Item>
                            <Divider />
                            <Menu.Item key="8" style={{ fontSize: "22px" }}>
                                <NavLink to="/Promote">
                                    <Icon
                                        type="caret-up"
                                        theme="filled"
                                        style={{ fontSize: "100%" }}
                                    />
                                    <span>Promote</span>
                                </NavLink>
                            </Menu.Item>
                            <Divider />
                            <Menu.Item key="9" style={{ fontSize: "22px" }}>
                                <NavLink to="" onClick={this.doLogout}>
                                    <Icon
                                        type="logout"
                                        style={{
                                            fontSize: "100%",
                                            color: "red"
                                        }}
                                    />
                                    <span style={{ color: "red" }}>Logout</span>
                                </NavLink>
                            </Menu.Item>
                            <Divider />

                            <Menu.Item />
                            <Divider />
                        </Menu>
                    </Sider>
                </Col>
            </Row>
        );
    }
}

export default Sidemenu;
