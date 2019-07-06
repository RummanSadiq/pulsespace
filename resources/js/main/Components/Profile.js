import React, { Component } from "react";
import { Row, Col, Card, Icon, Avatar, Badge, Tabs, Skeleton } from "antd";
import Chat from "./Chat";
import Stores from "./LimitedStores";
import Products from "./LimitedProducts";
import Reviews from './Reviews';
import ShoppingList from './ShoppingList';
import axios from 'axios';
const { TabPane } = Tabs;

class Profile extends Component {
    state = {};
    componentDidMount(){
        axios.get("https://api.pulsespace.com/user").then(res=>{

        console.log('User foudn is', res.data);
        this.setState({user:res.data});
        });

        this.getProducts();
        this.getStores();
        
    }

    getProducts(){
        // axios.get("https://api.pulsespace.com/shoppinglist").then(res => {
        //     const listData = res.data;
        //     console.log("shoppinglist data is", listData);
        //     // if (res.data.length>0){
        //         this.setState({ list: listData });
        //     // }
            
        // });
    }

    getStores() {
        axios.get("https://api.pulsespace.com/followed").then(res => {
            const followedData = res.data;
            console.log("followed data is", followedData);
            this.setState({ shops: followedData });
        });
    }
    render() {
        const { Meta } = Card;
        const gridStyle = {
            width: "20%",
            textAlign: "center"
        };
        return (
            <div>
                <div style={{ background: "#ECECEC", padding: "30px" }}>
                    <Row >
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
                                {this.state.user ? <div><h2>{this.state.user.name}</h2>
                                {this.state.user.phone_no ? <h3>{this.state.user.phone_no}</h3>: <h3>No verified Phone number</h3>}
                                <h3>{this.state.user.email}</h3></div>:<Skeleton/>}
                                
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
                                        title="Followed Stores"
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
                            {this.state.list && (
                                  <ShoppingList/>
                                )}
                                {!this.state.list && <Skeleton />}
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="My Reviews" key="3">
                        <Row>
                            <Col lg={16} offset={4}>
                                {this.state.list && (
                                   <Products
                                   products={this.state.products}
                                   title="Products List"
                                   size={8}
                                   all={false}
                               />
                                )}
                                {!this.state.list && <Skeleton />}
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
               
            </div>
        );
    }
}

export default Profile;
