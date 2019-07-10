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
    Badge,
    Modal,
    Drawer
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
import Register_Form from "./RegisterForm";
import Login_Form from "./LoginForm";

import "../css/sbar.css";
import MenuItem from "antd/lib/menu/MenuItem";

import Cookies from "universal-cookie";

const cookies = new Cookies();

const host = window.location.hostname;
const myDomain = host.substring(host.lastIndexOf("."));
const Search = Input.Search;

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

axios.defaults.headers = {
    Authorization: "Bearer " + cookies.get("access_token")
};



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
        unread: true,
        visible: false,
        visibleLogin: false,
        Drawervisible: false
    };

    componentDidMount() {
        this.handleLogin();
    }
    showDrawer = () => {
        this.setState({
          Drawervisible: true,
        });
      };
    
      onCloseDrawer = () => {
        this.setState({
          Drawervisible: false,
        });
      };
    handleLogin = () => {
        console.log("login");

        axios
            .get("https://api.pulsespace.com/user")
            .then(res => {
                const user = res.data;
                console.log("user is ", user);
                if (res.data.id) {
                    cookies.set("auth_id", res.data.id, {
                        domain: ".pulsespace" + myDomain
                    });

                    this.setState({ logged: user }, () => {
                        if (this.state.logged.id) {
                            //function call to get notifications
                            axios
                                .get(
                                    "https://api.pulsespace.com/notifications/user"
                                )
                                .then(res => {
                                    console.log(
                                        "notifications received are",
                                        res.data
                                    );
                                    this.setState({ notifications: res.data });
                                });
                        }
                    });
                }
            })
            .catch(res => {
                console.log("catched error in handling user api result", res);
            });
    };

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    showModalLogin = () => {
        this.setState({
            visibleLogin: true
        });
    };

    handleOk = e => {
        console.log(e);

        this.setState(
            {
                visibleLogin: false
            },
            () => {
                this.handleLogin();
            }
        );
    };

    handleSignOk = () => {
        this.setState({ visible: !this.state.visible });
    };

    handleSearch = e => {
        console.log("search value is", e.target.value);
        this.setState({ value: e.target.value });
    };

    doLogout = e => {
        e.preventDefault();

        console.log("Logout");

        axios.get("https://api.pulsespace.com/logout").then(res => {
            console.log(res);
            cookies.remove("access_token");
            window.location.reload();
        });
    };

    render() {
       

        return (
            <BrowserRouter style={{ backgroundColor: "white" }}>
                <div>
                    <div>
                        <Menu
                            theme="light"
                            mode="horizontal"
                            style={{
                                lineHeight: "50px",
                                backgroundColor: "#F5F5F5"
                            }}
                        >
                            {this.state.logged.id && (
                                <Menu.Item key="1">
                                    <a href="/messages">Messages</a>
                                </Menu.Item>
                            )}
                            <Menu.Item key="2">
                                <a href={"http://myshop.pulsespace" + myDomain}>
                                    My Shop
                                </a>
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
                                    <a
                                        onClick={this.showModalLogin}
                                    >
                                        Login
                                    </a>
                                </Menu.Item>
                            )}
                            {this.state.logged.id && (
                                <Menu.Item key="5">
                                    <a href="/profile">Profile</a>
                                </Menu.Item>
                            )}
                            {!this.state.logged.id && (
                                <Menu.Item key="6">
                                    <a
                                        onClick={this.showModal}
                                    >
                                        Signup
                                    </a>
                                </Menu.Item>
                            )}
                            {this.state.logged.id && (
                                <Menu.Item key="7" onClick={this.showDrawer}>
                                    {/* <Dropdown overlay={menu}> */}
                                        <div>
                                            {this.state.unread && (
                                                <Badge dot>
                                                    <Icon type="bell" />
                                                </Badge>
                                            )}
                                            {!this.state.unread && (
                                                <Icon type="bell" />
                                            )}
                                        </div>
                                    {/* </Dropdown> */}
                                </Menu.Item>
                            )}
                        </Menu>
                    </div>
                    <Row style={{ backgroundColor: "white" }}>
                        <Col span={4} offset={2}>
                            <a href="/">
                                <img
                                    src={logo}
                                    alt="Shopx"
                                    width="50%"
                                    height="30%"
                                />
                            </a>
                        </Col>
                        <Col span={12}>
                            <Search
                                placeholder="input search text"
                                enterButton={
                                    <a
                                        href={"/search/" + this.state.value}
                                        style={{ color: "white" }}
                                    >
                                        Search
                                    </a>
                                }
                                size="large"
                                onChange={this.handleSearch}
                                onSearch={value => console.log(value)}
                            />
                        </Col>
                        <Col span={6}>
                            {this.state.logged ? (
                                <a href="/mylist">
                                    <Icon
                                        type="shopping-cart"
                                        style={{ fontSize: "50px" }}
                                    />
                                </a>
                            ) : (
                                <Icon
                                    type="shopping-cart"
                                    style={{
                                        fontSize: "50px",
                                        color: "#2a9cf9"
                                    }}
                                    onClick={() =>
                                        message.error(
                                            "you mus tbe logged in to see your list"
                                        )
                                    }
                                />
                            )}
                           
                        </Col>
                    </Row>{" "}
                    <div
                        style={{
                            padding: "2%",
                            textAlign: "center",
                            backgroundColor: "white"
                        }}
                    >
                        <Dropdown overlay={category}>
                            <NavLink to="/categories">
                                <Button icon="appstore" rounded="true">
                                    Categories
                                </Button>
                            </NavLink>
                        </Dropdown>

                        <Button
                            icon="shop"
                            rounded="true"
                            style={{ marginLeft: "1%", marginRight: "1%" }}
                        >
                            Stores
                        </Button>

                        <Button icon="database" rounded="true">
                            Products
                        </Button>
                    </div>
                    <Modal
                        title="Create an account"
                        visible={this.state.visible}
                       
                        okButtonProps={{ disabled: true }}
                        onCancel={this.handleSignOk}
                        closable={true}
                        maskClosable={true}
                    >
                        <Register_Form done={this.handleOk} />
                    </Modal>
                    <Modal
                        title="Login"
                        visible={this.state.visibleLogin}
                        footer={null}
                        onCancel={this.handleOk}
                        maskClosable={true}
                    >
                        <Login_Form done={this.handleOk} />
                    </Modal>

                    <Drawer
          title="Notifications"
          placement="right"
          closable={true}
          onClose={this.onCloseDrawer}
          visible={this.state.Drawervisible}
        >
           <List
                itemLayout="horizontal"
                dataSource={this.state.notifications}
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 3
                }}
                renderItem={item => (
                    <div>
                        <Card
                            hoverable
                            title={
                                <div>
                                    {/* <span>
                                        <Icon type="bell" />
                                    </span> */}
                                    <span>
                                      <h2>{item.parent_type}</h2>  
                                    </span>
                                    
                                    
                                </div>
                            }
                        >
                            <a href={item.url}>
                                    <h3>{item.description}</h3>   
                            </a>
                        </Card>
                    </div>
                )}
            />
        </Drawer>
                </div>
            </BrowserRouter>
        );
    }
}

export default Head;
