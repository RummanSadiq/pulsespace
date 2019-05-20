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
            this.setState({ product: product },()=>{
                this.setState({Reviews: this.state.product.reviews});
            });
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
                                    {/* {this.state.product.attachments.map(image =>(
                                         <img
                                         src={
                                            image.url
                                         }
                                         width={100}
                                         height={100}
                                         style={{ padding: "1%" }}
                                     />

                                    ))} */}
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
                                <h1>{this.state.product.name}</h1>
                                <h4>{this.state.product.description}</h4>
                                <Rate disabled allowHalf defaultValue={3.5} />
                                <span>47 reviews</span>
                                <span>
                                    <a href='javascript;;'>{this.state.product.shop.name}</a>
                                </span>
                                <h2>
                                    {this.state.product.sale_price > 0 && (
                                        <div>
                                            Old Price Rs.{" "}
                                            <strike style={{ color: "black" }}>
                                                {this.state.product.price}
                                            </strike>
                                            <div>
                                                Discounted Price Rs.
                                                {this.state.product.sale_price}
                                            </div>
                                        </div>
                                    )}
                                    {!this.state.product.sale_price > 0 && (
                                        <div>Rs.{this.state.product.price}</div>
                                    )}
                                </h2>
                                <h4>Address</h4>
                                <Button
                                    type="primary"
                                    size="large"
                                    shape="round"
                                    icon="plus"
                                >
                                    Add to List
                                </Button>
                                <div><h4>{this.state.product.shop.delivery>0 ? "Store Provides delivery":"Store Does not provide delivery"}</h4></div>
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
