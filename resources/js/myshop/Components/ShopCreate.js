import React, { Component } from "react";
import { Row, Col, Card, Menu, Icon } from "antd";

import { BrowserRouter, Route, NavLink } from "react-router-dom";
import SCForm from "./CreateShopForm";
import MenuItem from "antd/lib/menu/MenuItem";

class ShopCreate extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <BrowserRouter>
                <Row>
                    <Route
                        path="/logout"
                        component={() => {
                            window.location.href = "/logout";
                            return null;
                        }}
                    />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        style={{
                            backgroundColor: "#F5F5F5"
                        }}
                    >
                        <Menu.Item key="1" style={{ fontSize: "22px" }}>
                            <NavLink to="/logout">
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
                    </Menu>
                    <Col span={8} style={{ textAlign: "center" }}>
                    <img src="https://laz-img-cdn.alicdn.com/tfs/TB1leYEpsfpK1RjSZFOXXa6nFXa-788-591.png" width='675' height='500' style={{marginLeft:'20', marginTop:'20'}}/>

                    </Col>
                    <Col span={8} offset={6}>
                        <div>
                            {/* <Route path="/" component={Index} /> */}
                            <Card title="Please enter your store information">
                                <SCForm lift={this.props.lift} />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </BrowserRouter>
        );
    }
}

export default ShopCreate;
