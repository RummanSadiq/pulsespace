import React, { Component } from "react";
import {
    Col,
    Card,
    Row,
    Carousel,
    Button,
    Layout,
    List,
    Avatar,
    Rate,
    Icon,
    message,
    Skeleton,
    Tabs
} from "antd";
import Products from "./LimitedProducts";
import axios from "axios";
import FAQs from "./LimitedFaqs";
import AllPosts from "./AllPosts";
import Reviews from "./Reviews";
import StoreInfo from "./StoreInfo";
import "../css/sbar.css";

const { TabPane } = Tabs;
class Store extends Component {
    constructor(props) {
        super(props);
        this.state.id = this.props.match.params.id;
    }
    state = {
        products: [],
        // store: {},
        faqs: [],
        posts: [],
        followed: [],
        id: 1
    };
    componentDidMount() {
        console.log("params received in props", this.state.id);
        axios.get("/api/shops/" + this.state.id).then(res => {
            const storedata = res.data;
            console.log("store information is", storedata);
            this.setState({ store: storedata });
        });
        this.getProducts();
        this.getReviews();
        this.getPosts();
    }

    getProducts() {
        axios.get("https://api.pulsespace.com/products/shop/" + this.state.id).then(res => {
            const productsData = res.data;
            console.log("Products of store are", productsData);
            this.setState({ products: productsData });
        });
    }

    getReviews() {
        axios
            .get("https://api.pulsespace.com/reviews/shops/" + this.props.match.params.id)
            .then(res => {
                const reviewsData = res.data;
                console.log("Reviews  are", reviewsData);
                this.setState({ Reviews: reviewsData });
            })
            .catch(err => {
                console.log("Error occurred while getting reviews", err);
                throw err;
            });
    }
    getPosts() {
        axios.get("https://api.pulsespace.com/posts/shop/" + this.state.id).then(res => {
            const postsData = res.data;
            console.log("Posts of this store are", postsData);
            this.setState({ posts: postsData });
        });
    }

    render() {
        return (
            <div>
                 {this.state.store &&
                 <Row>
                    <Col>
                        <Carousel>
                            {this.state.store.attachments.map(image => (
                                <div>
                                    <img
                                        src={image.url}
                                        width="100%"
                                        height="100%"
                                        alt="image"
                                    />
                                </div>
                            ))}
                            
                        </Carousel>
                    </Col>
                </Row> }
                {!this.state.store && <Skeleton />}

                {this.state.store && <StoreInfo store={this.state.store} />}
                <Tabs
                    defaultActiveKey="1"
                    size={"large"}
                    style={{ textAlign: "center" }}
                >
                    <TabPane tab="Products" key="1">
                        <Row>
                            <Col lg={16} offset={4}>
                                {!this.state.products && <Skeleton active />}
                                {this.state.products && (
                                    <Products
                                        products={this.state.products}
                                        size={6}
                                        title="Store's Products"
                                        all={true}
                                    />
                                )}
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="Reviews" key="2">
                        <Row>
                            <Col lg={16} offset={4}>
                                {!this.state.Reviews && <Skeleton active />}
                                {this.state.Reviews && (
                                    <Reviews
                                        id={this.props.match.params.id}
                                        Reviews={this.state.Reviews}
                                        size={3}
                                        title="Store Reviews"
                                        type="shop"
                                        // lift={this.getReviews}
                                        user_id={this.state.store.user_id}

                                    />
                                )}
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="Store Activity" key="3">
                        <Row>
                            <Col lg={16} offset={4}>
                                {!this.state.posts && <Skeleton active />}
                                {this.state.posts && (
                                    <AllPosts
                                        posts={this.state.posts}
                                        title="Store Activity"
                                        // name={this.state.store.name}
                                    />
                                )}
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="FAQS" key="4">
                        <Row>
                            <Col lg={16} offset={4}>
                                <FAQs id={this.props.match.params.id} />
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default Store;
