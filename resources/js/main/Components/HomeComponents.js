import React, { Component } from "react";
import { Row, Col, Card, Button, Carousel, List, Tabs, Icon } from "antd";
import Products from "./LimitedProducts";
import AllPosts from "./AllPosts";
import Stores from "./LimitedStores";
import cimage from "../Images/img1.jpg";
import pimage from "../Images/pimg.png";
import Axios from "axios";

const { TabPane } = Tabs;
class HomeComponents extends Component {
    constructor(props) {
        super(props);
        this.getStores = this.getStores.bind(this);
    }
    state = {
        // products: [],
        // shops: [],
        done: false,
        go: false
    };
    componentDidMount() {
        this.getProducts();
        this.getStores();
    }
    getProducts() {
        Axios.get("/api/products").then(res => {
            const products = res.data;
            console.log("products data is", products);
            this.setState({ products: products });
        });
    }
    goSearch = () => {
        console.log("inside go search");
        this.setState({ done: !this.state.done });
    };

    getStores() {
        Axios.get("/api/shops").then(res => {
            const shops = res.data;
            console.log("Shops are", shops);
            this.setState({ shops: shops });
        });
    }
    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <Carousel>
                            <div>
                                <img
                                    src={cimage}
                                    width="100%"
                                    height="100%"
                                    alt="image"
                                />
                            </div>
                            <div>
                                <img
                                    src={cimage}
                                    width="100%"
                                    height="100%"
                                    alt="image"
                                />
                            </div>
                            <div>
                                <img
                                    src={cimage}
                                    width="100%"
                                    height="100%"
                                    alt="image"
                                />
                            </div>
                            <div>
                                <img
                                    src={cimage}
                                    width="100%"
                                    height="100%"
                                    alt="image"
                                />
                            </div>
                            <div>
                                <img
                                    src={cimage}
                                    width="100%"
                                    height="100%"
                                    alt="image"
                                />
                            </div>
                        </Carousel>
                    </Col>
                </Row>
                <Col>
                    {" "}
                    <Tabs
                        defaultActiveKey="1"
                        size={"large"}
                        style={{ textAlign: "center" }}
                    >
                        <TabPane tab="Browse" key="1">
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
                                    {this.state.products && (
                                        <Products
                                            products={this.state.products}
                                            title="Explore Products"
                                            size={6}
                                            all={true}
                                        />
                                    )}
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tab="Explore" key="2">
                            <Row>
                                <Col lg={16} offset={4}>
                                    <AllPosts />
                                </Col>
                            </Row>
                        </TabPane>
                    </Tabs>
                </Col>
            </div>
        );
    }
}

export default HomeComponents;
