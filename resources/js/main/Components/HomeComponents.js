import React, { Component } from "react";
import {
    Row,
    Col,
    Carousel,
    Tabs,
    Skeleton
} from "antd";
import Products from "./LimitedProducts";
import AllPosts from "./AllPosts";
import Stores from "./LimitedStores";
import cimage from "../Images/img1.jpg";
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
        this.getallPosts();
    }
    getProducts=()=> {
        Axios.get("https://api.pulsespace.com/products").then(res => {
            console.log("products data is", res.data);
            this.setState({ products: res.data });
        });
    }
    goSearch = () => {
        console.log("inside go search");
        this.setState({ done: !this.state.done });
    };

    getStores() {
        Axios.get("https://api.pulsespace.com/shops").then(res => {
            const shops = res.data;
            console.log("Shops are", shops);
            this.setState({ shops: shops });
        });
    }
    getallPosts() {
        Axios.get("https://api.pulsespace.com/posts").then(res => {
            const postsData = res.data;
            console.log("Posts of stores are", postsData);
            this.setState({ posts: postsData });
        });
    }
    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <Carousel autoplay>
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
                                    {!this.state.shops && <Skeleton />}

                                    {!this.state.products && <Skeleton />}
                                    {this.state.products && (
                                        <Products
                                            products={this.state.products}
                                            title="Explore Products"
                                            getProducts={this.getProducts}
                                            size={8}
                                            all={true}
                                        />
                                    )}
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tab="Explore" key="2">
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
                    </Tabs>
                </Col>
                
            </div>
        );
    }
}

export default HomeComponents;
