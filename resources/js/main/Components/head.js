import React, { Component } from "react";
import {
    Col,
    Card,
    Row,
    Button,
    Menu,
    List,
    Input,
    Icon,
    Dropdown,
    Divider,
    Badge
} from "antd";
import {
    BrowserRouter,
    Route,
    Redirect,
    NavLink,
    Link
} from "react-router-dom";
import SearchResults from "./Search";
import logo from "../Images/logo.png";
import axios from "axios";

import "../css/sbar.css";
import MenuItem from "antd/lib/menu/MenuItem";

const category = (
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
        value: "",
        notifications: [],
        unread: true
    };

    componentDidMount() {
        axios.get("/api/user").then(res => {
            const user = res.data;
            console.log("user is ", user);
            this.setState({ logged: user }, () => {
                if (this.state.logged.id) {
                    //function call to get notifications
                    var notify = [
                        {
                            title: "Title of notification",
                            message:
                                "You have received a particular type of notiification that will be showed up here",
                            link: "/product/2",
                            read: true
                        },
                        {
                            title: "Title of notification",
                            message:
                                "You have received a particular type of notiification that will be showed up here",
                            link: "/product/2",
                            read: false
                        }
                    ];
                    this.setState({ notifications: notify });
                }
            });
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
        var menu = (
            <List
                itemLayout="horizontal"
                dataSource={this.state.notifications}
                renderItem={item => (
                    <List.Item>
                        {item.read && (
                            <Card
                                hoverable
                                title={
                                    <div>
                                        <span>
                                            <Icon type="bell" />
                                        </span>{" "}
                                        {item.title}
                                    </div>
                                }
                                style={{ backgroundColor: "#E0D7D7" }}
                            >
                                <a href={item.link}>
                                    <List.Item.Meta
                                        description={item.message}
                                    />
                                </a>
                            </Card>
                        )}
                        {!item.read && (
                            <Card
                                hoverable
                                title={
                                    <div>
                                        <span>
                                            <Icon type="bell" />
                                        </span>{" "}
                                        {item.title}
                                    </div>
                                }
                                // style={{backgroundColor:'green'}}
                            >
                                <a href={item.link}>
                                    <List.Item.Meta
                                        // avatar={<Icon type="bell" />}
                                        // title={item.title}
                                        description={item.message}
                                    />
                                </a>
                            </Card>
                        )}
                    </List.Item>
                )}
            />
        );

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
                                <Menu.Item key="1">
                                    <a href="/messages">Messages</a>
                                </Menu.Item>
                            )}
                            <Menu.Item key="2">
                                <NavLink to="/myshop.pulsespace.test">
                                    Store owner?
                                </NavLink>
                            </Menu.Item>
                            {this.state.logged.id && (
                                <Menu.Item key="3">
                                    <NavLink
                                        to="/logout"
                                        onClick={this.doLogout}
                                    >
                                        Logout
                                    </NavLink>
                                </Menu.Item>
                            )}

                            {!this.state.logged.id && (
                                <Menu.Item key="4">
                                    <a href="/login">Login</a>
                                </Menu.Item>
                            )}
                            {this.state.logged.id && (
                                <Menu.Item key="5">
                                    <a href="/profile">Profile</a>
                                </Menu.Item>
                            )}
                            {!this.state.logged.id && (
                                <Menu.Item key="6">
                                    <a href="/register">Signup</a>
                                </Menu.Item>
                            )}
                            {this.state.logged.id && (
                                <Menu.Item key="7">
                                    <Dropdown overlay={menu}>
                                        <div>
                                            {this.state.unread && (
                                                <Badge count={1}>
                                                    <Icon type="bell" />
                                                </Badge>
                                            )}
                                            {!this.state.unread && (
                                                <Icon type="bell" />
                                            )}
                                        </div>
                                    </Dropdown>
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
                        <Dropdown overlay={category}>
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
