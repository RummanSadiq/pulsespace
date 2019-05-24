import React, { Component } from "react";
import { Row, Col, Card, Icon, Avatar, Badge, Tabs, Skeleton } from "antd";
import Chat from "./Chat";
import Stores from "./LimitedStores";
import Products from "./LimitedProducts";

const { TabPane } = Tabs;

class Profile extends Component {
    state = {};
    render() {
        const { Meta } = Card;
        const gridStyle = {
            width: "20%",
            textAlign: "center"
        };
        return (
            <div>
                <div style={{ background: "#ECECEC", padding: "30px" }}>
                    <Row style={{}}>
                        <Col span={6}>
                            <Card
                                style={{ width: 300 }}
                                cover={
                                    <img
                                        alt="example"
                                        src="https://secure.gravatar.com/avatar/755ba87e0a9949e846b042a8ac44723e?s=600&d=mm&r=g"
                                        style={{ height: 150 }}
                                    />
                                }
                            />
                        </Col>
                        <Col span={8}>
                            <Card
                                bordered={false}
                                style={{ width: 300, background: "#ECECEC" }}
                            >
                                <h2>Hamza Ejaz</h2>
                                <h3>923228879475</h3>
                                <h3>iamhamza@gmail</h3>
                                <h2 />
                            </Card>
                        </Col>
                    </Row>
                </div>
                <Tabs
                    defaultActiveKey="1"
                    size={"large"}
                    style={{ textAlign: "center" }}
                >
                    <TabPane tab="My Stores" key="1">
                        <Row>
                            <Col lg={16} offset={4}>
                                {this.state.shops && (
                                    <Stores
                                        shops={this.state.shops}
                                        title="Explore Stores"
                                        size={6}
                                        getShops={this.getStores}
                                    />
                                )}
                                {!this.state.shops && <Skeleton />}
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="My Shopping List" key="2">
                        <Row>
                            <Col lg={16} offset={4}>
                                {this.state.posts && (
                                    <AllPosts
                                        posts={this.state.posts}
                                        title="Explore activities from Different Stores"
                                    />
                                )}
                                {!this.state.posts && <Skeleton />}
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="My Reviews" key="3">
                        <Row>
                            <Col lg={16} offset={4}>
                                {this.state.posts && (
                                    <AllPosts
                                        posts={this.state.posts}
                                        title="Explore activities from Different Stores"
                                    />
                                )}
                                {!this.state.posts && <Skeleton />}
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="Messages" key="4">
                        <Row>
                            <Col lg={16} offset={4}>
                                <Chat />
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>
                {/* <Row>
                    <Card.Grid style={gridStyle}>
                        {" "}
                        <Icon
                            type="home"
                            theme="filled"
                            style={{ fontSize: 20 }}
                        />{" "}
                        <a href="#">
                            <Badge
                                count={109}
                                style={{ backgroundColor: "#52c41a" }}
                            />
                        </a>
                        , <h3>My Stores</h3>{" "}
                    </Card.Grid>
                    <Card.Grid style={gridStyle}>
                        {" "}
                        <Icon
                            type="ordered-list"
                            style={{ fontSize: 20 }}
                        />{" "}
                        <a href="#">
                            <Badge
                                count={4}
                                style={{ backgroundColor: "#52c41a" }}
                            />
                        </a>
                        ,<h3> My Shopping Lists</h3>{" "}
                    </Card.Grid>
                    <Card.Grid style={gridStyle}>Reviews</Card.Grid>
                    <Card.Grid style={gridStyle}>Feedbacks</Card.Grid>
                    <Card.Grid style={gridStyle}>
                        {" "}
                        <Icon
                            type="message"
                            theme="filled"
                            style={{ fontSize: 20 }}
                        />{" "}
                        <Badge count={0} showZero>
                            <a href="#" className="head-example" />
                        </Badge>{" "}
                        <h3> Messages</h3>
                    </Card.Grid>
                </Row> */}
            </div>
        );
    }
}

export default Profile;
