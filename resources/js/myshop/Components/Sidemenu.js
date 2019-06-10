import React, { Component } from "react";
import logo from "../react_images/logo.png";
import { NavLink } from "react-router-dom";
import {
    Layout,
    Icon,
    Menu,
    Divider,
    Row,
    Col,
    Drawer,
    List,
    Card,
    Skeleton
} from "antd";
import Axios from "axios";
const { Sider } = Layout;
import "../Myshop.css";

const SubMenu = Menu.SubMenu;

class Sidemenu extends Component {
    state = {
        collapsed: false,
        visible: false
    };

    componentDidMount() {
        Axios.get("https://api.pulsespace.com/notifications/shop").then(res => {
            console.log("notifications from shop are", res.data);
            this.setState({ notifications: res.data });
        });
    }
    doLogout = e => {
        e.preventDefault();
        Axios.get("https://api.pulsespace.com/logout").then(() => {
            window.location.reload();
        });
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    toggleDrawer = () => {
        this.setState({ visible: !this.state.visible });
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
                            <Menu.Item key="1" style={{ fontSize: " 18px" }}>
                                <NavLink to="/shop">
                                    <Icon
                                        type="shop"
                                         theme="twoTone"
                                        style={{ fontSize: "100%" }}
                                    />
                                    <span>Shop</span>
                                </NavLink>
                            </Menu.Item>

                            <Divider />
                            <Menu.Item key="2" style={{ fontSize: " 18px" }}>
                                <NavLink to="/Messages">
                                    <Icon
                                        type="message"
                                         theme="twoTone"
                                        style={{ fontSize: "100%" }}
                                    />
                                    <span>Messages</span>
                                </NavLink>
                            </Menu.Item>
                            <Divider />
                            <SubMenu
                                key="products"
                                title={
                                    <span style={{ fontSize: " 18px" }}>
                                        <Icon
                                            type="database"
                                             theme="twoTone"
                                            style={{ fontSize: "100%" }}
                                        />
                                        <span>Products</span>
                                    </span>
                                }
                            >
                                <Divider />
                                <Menu.Item key="3" style={{ fontSize: "18px" }}>
                                    <NavLink to="/Add">
                                        {" "}
                                        <Icon
                                            type="file-add"
                                             theme="twoTone"
                                            // style={{ fontSize: "80%" }}
                                        />
                                        <span>Add Product</span>
                                    </NavLink>
                                </Menu.Item>
                                <Divider />

                                <Menu.Item key="4" style={{ fontSize: "18px" }}>
                                    <NavLink to="/ViewProduct">
                                        <Icon
                                            type="table"
                                            // style={{ fontSize: "80%" }}
                                        />
                                        <span>View Products</span>
                                    </NavLink>
                                </Menu.Item>
                            </SubMenu>
                            <Divider />
                            <Menu.Item key="5" style={{ fontSize: " 18px" }}>
                                <NavLink to="/Reviews">
                                    <Icon
                                        type="star"
                                         theme="twoTone"
                                        style={{ fontSize: "100%" }}
                                    />
                                    <span>Reviews</span>
                                </NavLink>
                            </Menu.Item>
                            <Divider />
                            <Menu.Item key="6" style={{ fontSize: " 18px" }}>
                                <NavLink to="/FAQs">
                                    <Icon
                                        type="question"
                                        style={{ fontSize: "100%", color:'#5ab3fc' }}
                                    />
                                    <span>FAQ'S</span>
                                </NavLink>
                            </Menu.Item>
                            <Divider />
                            <Menu.Item key="7" style={{ fontSize: " 18px" }}>
                                <NavLink to="/Posts">
                                    <Icon
                                        type="layout"
                                         theme="twoTone"
                                        style={{ fontSize: "100%" }}
                                    />
                                    <span>Posts</span>
                                </NavLink>
                            </Menu.Item>
                            <Divider />
                            <Menu.Item key="8" style={{ fontSize: " 18px" }}>
                                <NavLink to="/Promote">
                                    <Icon
                                        type="caret-up"
                                         theme="filled"
                                        style={{ fontSize: "100%", color:'#5ab3fc' }}
                                    />
                                    <span>Promote</span>
                                </NavLink>
                            </Menu.Item>
                            <Divider />
                            <Menu.Item
                                key="9"
                                style={{ fontSize: " 18px" }}
                                onClick={this.toggleDrawer}
                            >
                                <Icon
                                    type="bell"
                                    theme="twoTone"
                                    style={{ fontSize: "100%" }}
                                />
                                <span>Notifications</span>
                            </Menu.Item>
                            <Divider />
                            <Menu.Item key="10" style={{ fontSize: " 18px" }}>
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
                    <Drawer
                        title="Notifications"
                        placement="right"
                        closable={true}
                        onClose={this.toggleDrawer}
                        visible={this.state.visible}
                    >
                        {!this.state.notifications && <Skeleton />}
                        {this.state.notifications && (
                            <List
                                itemLayout="horizontal"
                                dataSource={this.state.notifications}
                                renderItem={item => (
                                    <List.Item>
                                        {item.is_read ==1 && (
                                            <Card
                                                hoverable
                                                title={
                                                    <div>
                                                        <span>
                                                            <Icon type="bell" />
                                                        </span>{" "}
                                                        {/* {item.title} */}
                                                        {"Notifications title"}
                                                    </div>
                                                }
                                                // style={{
                                                //     backgroundColor: "#E0D7D7"
                                                // }}
                                            >
                                                <div style={{fontWeight:'bold'}}>
                                                    <Icon type="user"/>
                                                    <span style={{fontFamily:'cursive', fontSize:'20px'}}>
                                                    {item.description}
                                                    </span>
                                                    
                                                </div>
                                                
                                                {/* <a href={item.link}>
                                                    <List.Item.Meta
                                                        description={
                                                            item.description
                                                        }
                                                    />
                                                </a> */}
                                            </Card>
                                        )}
                                        {item.is_read == 0 && (
                                            <Card
                                                hoverable
                                                title={
                                                    <div>
                                                        <span>
                                                            <Icon type="bell" />
                                                        </span>{" "}
                                                        {"Notifications title"}
                                                        
                                                    </div>
                                                }
                                                // style={{backgroundColor:'green'}}
                                            >
                                                <div style={{fontWeight:'bold'}}>
                                                    <Icon type="user"/>
                                                    <span style={{fontFamily:'cursive', fontSize:'20px'}}>
                                                    {item.description}
                                                    </span>
                                                    
                                                </div>
                                                {/* <a href={item.link}>
                                                    <List.Item.Meta
                                                        // avatar={<Icon type="bell" />}
                                                        // title={item.title}
                                                        description={
                                                            item.description
                                                        }
                                                    />
                                                </a> */}
                                            </Card>
                                        )}
                                    </List.Item>
                                )}
                            />
                        )}
                    </Drawer>
                </Col>
            </Row>
        );
    }
}

export default Sidemenu;
