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

import "../css/sbar.css";

const { TabPane } = Tabs;
class Store extends Component {
    constructor(props) {
        super(props);
        this.state.id = this.props.match.params.id;
    }
    state = {
        products: [],
        store: {},
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

        axios.get("/api/products/shop/" + this.state.id).then(res => {
            const productsData = res.data;
            console.log(productsData);
            this.setState({ products: productsData });
        });

        this.getFollowed();
        this.getReviews();
    }
    getFollowed() {
        axios.get("/api/followed").then(res => {
            const followedData = res.data;
            console.log("followed data is", followedData);
            this.setState({ followed: followedData }, () => {
                console.log("followed data is", this.state.followed);

                this.checkFollow();
            });
        });
    }

    handleFollow(id) {
        console.log("handle follow", id);
        axios
            .get("/api/follow/" + id)
            .then(res => {
                this.getFollowed();
            })
            .catch(err => {
                console.log(
                    "Error occured, cannot make api call to follow store",
                    err
                );
            });
    }

    checkFollow() {
        console.log("I am inside check follow");
        const result = this.state.followed.find(
            element => element.store_id == this.state.id
        );
        console.log("result out is", result);

        if (result) {
            console.log("result is", result);
            // return true;
            this.setState({ f: true });
        } else {
            console.log("nope!", result);
            // return false;
            this.setState({ f: false });
        }
    }

    getReviews() {
        axios.get("/api/reviews/shops/" + this.props.match.params.id).then(res => {
            const reviewsData = res.data;
            console.log("Reviews  are", reviewsData);
            this.setState({ Reviews: reviewsData });
        });
    }
    getPosts() {
        axios.get("/api/posts/shop/" + this.state.id).then(res => {
            const postsData = res.data;
            console.log("Posts of this store are", postsData);
            this.setState({ posts: postsData });
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
                                    src={this.state.store.display_picture}
                                    width="100%"
                                    height="100%"
                                    alt="image"
                                />
                            </div>
                            <div>
                                <img
                                    src={this.state.store.display_picture}
                                    width="100%"
                                    height="100%"
                                    alt="image"
                                />
                            </div>
                            <div>
                                <img
                                    src={this.state.store.display_picture}
                                    width="100%"
                                    height="100%"
                                    alt="image"
                                />
                            </div>
                            <div>
                                <img
                                    src={this.state.store.display_picture}
                                    width="100%"
                                    height="100%"
                                    alt="image"
                                />
                            </div>
                            <div>
                                <img
                                    src={this.state.store.display_picture}
                                    width="100%"
                                    height="100%"
                                    alt="image"
                                />
                            </div>
                        </Carousel>
                    </Col>
                </Row>
                <Row style={{ marginTop: "3%" }}>
                    <Col span={12} offset={6}>
                        <div>
                            {this.state.f && (
                                <Button
                                    icon="check"
                                    size="large"
                                    shape="round"
                                    style={{
                                        backgroundColor: "#F57224",
                                        color: "white"
                                    }}
                                    onClick={() =>
                                        this.handleFollow(this.state.id)
                                    }
                                >
                                    Following
                                </Button>
                            )}
                            {!this.state.f && (
                                <Button
                                    icon="plus"
                                    size="large"
                                    shape="round"
                                    style={{
                                        backgroundColor: "#F57224",
                                        color: "white"
                                    }}
                                    onClick={() =>
                                        this.handleFollow(this.state.id)
                                    }
                                >
                                    Follow
                                </Button>
                            )}

                            <Button
                                icon="message"
                                size="large"
                                shape="round"
                                style={{
                                    backgroundColor: "#F57224",
                                    color: "white"
                                }}
                            >
                                Message
                            </Button>
                            <div>
                                Number of Followers{" "}
                                <span>
                                    <Rate disabled defaultValue={3} />
                                </span>
                            </div>
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <h1>{this.state.store.name}</h1>
                        </div>
                        <hr style={{ marginBottom: 0, width: 5 }} />
                        <Row style={{ fontFamily: "sans-serif" }}>
                            <Col
                                span={6}
                                style={{
                                    textAlign: "center",
                                    fontSize: 16
                                }}
                            >
                                <Icon type="phone" />
                                {this.state.store.contact}
                            </Col>
                            <Col
                                span={8}
                                offset={2}
                                style={{
                                    textAlign: "center",
                                    fontSize: 16
                                }}
                            >
                                <Icon type="info" />
                                {this.state.store.address}
                            </Col>
                            <Col
                                span={6}
                                style={{
                                    textAlign: "center",
                                    fontSize: 16
                                }}
                            >
                                <Icon type="info" /> Store City: Lahore
                            </Col>
                        </Row>
                        <hr />
                        <Row
                            style={{
                                padding: 20,
                                backgroundColor: "#ECECEC"
                            }}
                        >
                            <Col
                                span={4}
                                style={{
                                    textAlign: "center",
                                    fontSize: 14,
                                    borderRight: 50,
                                    borderRightStyle: "solid",
                                    borderWidth: 2,
                                    height: "100%"
                                }}
                            >
                                <Icon type="bars" style={{ fontSize: 20 }} />{" "}
                                {this.state.store.store_type} type
                            </Col>

                            <Col
                                span={8}
                                style={{
                                    textAlign: "center",
                                    fontSize: 14,
                                    borderRight: 50,
                                    borderRightStyle: "solid",
                                    borderWidth: 2,
                                    height: "100%"
                                }}
                            >
                                <Icon
                                    type="clock-circle"
                                    style={{ fontSize: 20 }}
                                />{" "}
                                <h3 style={{ display: "inline" }}>Opens at:</h3>{" "}
                                {this.state.store.open_time}
                                <br />
                                <Icon
                                    type="clock-circle"
                                    style={{ fontSize: 20 }}
                                />{" "}
                                <h3 style={{ display: "inline" }}>
                                    Closes at:
                                </h3>{" "}
                                {this.state.store.close_time}
                            </Col>
                            <Col
                                span={4}
                                style={{
                                    textAlign: "center",
                                    fontSize: 14,
                                    borderRight: 50,
                                    borderRightStyle: "solid",
                                    borderWidth: 2,
                                    height: "100%"
                                }}
                            >
                                <Icon
                                    type="step-forward"
                                    style={{ fontSize: 20 }}
                                />{" "}
                                <h3 style={{ display: "inline" }}>Delivery:</h3>{" "}
                                {/* {this.state.delivery > 0 && "Yes"} */}
                                {this.state.delivery == 1 && "Yes"}
                                {this.state.delivery != 1 && "No"}
                            </Col>
                            <Col
                                span={4}
                                style={{
                                    textAlign: "center",
                                    fontSize: 14,
                                    borderRight: 50,
                                    borderRightStyle: "solid",
                                    borderWidth: 2,
                                    height: "100"
                                }}
                            >
                                <Icon type="wifi" style={{ fontSize: 20 }} />{" "}
                                <h3 style={{ display: "inline" }}>Wifi</h3>{" "}
                                {this.state.wifi > 0 && "Yes"}
                                {!this.state.wifi > 0 && "No"}
                            </Col>
                            <Col
                                span={4}
                                style={{
                                    textAlign: "center",
                                    fontSize: 14
                                }}
                            >
                                <Icon
                                    type="credit-card"
                                    style={{ fontSize: 20 }}
                                />{" "}
                                <h3 style={{ display: "inline" }}>Card:</h3>{" "}
                                {this.state.card_payment && "Yes"}
                                {!this.state.card_payment && "No"}
                            </Col>
                        </Row>
                    </Col>
                    {/* {this.state.store &&
                    <StoreDetails details={this.state.store} />
                    } */}
                </Row>
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
