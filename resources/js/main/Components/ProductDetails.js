import React, { Component } from "react";
import { Row, Col, Rate, Button, Skeleton, Tabs } from "antd";
import Reviews from "./Reviews";
import Products from "./LimitedProducts";
import Axios from "axios";

const { TabPane } = Tabs;
class ProductDetails extends Component {
    state = {
        // product: {}
    };
    componentDidMount() {
        Axios.get("/api/products/" + this.props.match.params.id).then(res => {
            const product = res.data;
            console.log("product data is", product);
            this.setState({ product: product });
        });
    }
    render() {
        return (
            <div style={{ marginTop: "2%" }}>
                {!this.state.product && <Skeleton active />}
                {this.state.product && (
                    <div>
                        <Row>
                            <Col span={8} offset={4}>
                                <img
                                    src={
                                        "https://cdn.pixabay.com/photo/2019/04/08/21/46/harley-davidson-4113065_960_720.jpg"
                                    }
                                    width={400}
                                    height={400}
                                />
                                <br />
                                <div>
                                    <img
                                        src={
                                            "https://cdn.pixabay.com/photo/2019/04/08/21/46/harley-davidson-4113065_960_720.jpg"
                                        }
                                        width={100}
                                        height={100}
                                        style={{ padding: "1%" }}
                                    />
                                    <img
                                        src={
                                            "https://cdn.pixabay.com/photo/2019/04/08/21/46/harley-davidson-4113065_960_720.jpg"
                                        }
                                        width={100}
                                        height={100}
                                    />
                                    <img
                                        src={
                                            "https://cdn.pixabay.com/photo/2019/04/08/21/46/harley-davidson-4113065_960_720.jpg"
                                        }
                                        width={100}
                                        height={100}
                                    />
                                </div>
                            </Col>
                            <Col span={8}>
                                <h1>
                                    HP 15 Laptop 15.6" Touchscreen , Intel
                                    Pentium Silver N5000, Intel UHD Graphics
                                    605, 500GB HDD, 4GB SDRAM, DVD, Scarlet Red,
                                    15-bs244wm
                                    {this.state.product.name}
                                </h1>
                                <h4>{this.state.product.description}</h4>
                                <Rate disabled allowHalf defaultValue={3.5} />
                                <span>47 reviews</span>
                                <span>
                                    Shop name{this.state.product.store_id}
                                </span>
                                <h2>Rs. {this.state.product.price}</h2>
                                <h4>Address</h4>
                                <Button
                                    type="primary"
                                    size="large"
                                    shape="round"
                                    icon="plus"
                                >
                                    Add to List
                                </Button>
                                <span>Store doesn't provide shipping</span>
                            </Col>
                        </Row>
                        <hr />{" "}
                    </div>
                )}
                <Tabs
                    defaultActiveKey="1"
                    size={"large"}
                    style={{ textAlign: "center" }}
                >
                    <TabPane tab="Reviews" key="1">
                        <Row>
                            <Col lg={16} offset={4}>
                                {!this.state.Reviews && <Skeleton active />}
                                {this.state.Reviews && (
                                    <Reviews
                                        title="Product Reviews"
                                        size={3}
                                        Reviews={this.state.Reviews}
                                    />
                                )}
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="Explore Similar Products" key="2">
                        <Row>
                            <Col lg={16} offset={4}>
                                {!this.state.products && <Skeleton active />}

                                {this.state.products && (
                                    <Products
                                        title="Similar products"
                                        products={this.state.products}
                                        size={6}
                                    />
                                )}
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default ProductDetails;
