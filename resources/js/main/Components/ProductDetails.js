import React, { Component } from "react";
import { Row, Col, Rate, Button, Skeleton, Tabs, Carousel } from "antd";
import Reviews from "./Reviews";
import Products from "./LimitedProducts";
import Axios from "axios";

const { TabPane } = Tabs;
class ProductDetails extends Component {
    state = {
        // products: {}
    };
    componentDidMount() {
        Axios.get("https://api.pulsespace.com/products/" + this.props.match.params.id).then(res => {
            const product = res.data;
            console.log("product data is", product);
            this.setState({ product: product });
        });
        this.getReviews();
        this.getProducts();
    }

    getProducts=()=> {
        Axios.get("https://api.pulsespace.com/products").then(res => {
            console.log("products data is", res.data);
            this.setState({ products: res.data });
        });
    }
    getReviews(){
        Axios.get("https://api.pulsespace.com/reviews/products/" + this.props.match.params.id).then(res => {
            const product = res.data;
            console.log("product reviews are", product);
            this.setState({ Reviews: product });
        });
    }
    render() {
        return (
            <div style={{ marginTop: "2%" }}>
                {!this.state.product && <Skeleton active />}
                {this.state.product && (
                    <div>
                        <Row>
                            <Col
                            //  span={8} offset={4}
                             xs={{  span: 16 }}
                             sm={{  span: 12 }}
                             md={{ offset: 2, span: 12 }}
                             lg={{ offset: 2, span: 12   }}
                             xl={{ offset: 2, span: 12 }}
                             >
                                
                                <Carousel
                                    style={{ background: "white", padding:'1%' }}
                                    effect="fade"
                                    autoplay
                                    infinite
                                    dotStyle={{ marginBottom: 50,color:'black' }}
                                    
                                >
                                    {this.state.product.attachments.map(
                                        image => (
                                            <div>
                                                <img
                                                    src={image.url}
                                                    style={{ padding: "1%" }}
                                                    height="500"
                                                />
                                            </div>
                                        )
                                    )}
                                </Carousel>
                            </Col>
                            <Col
                             xs={{ span: 8 }}
                             sm={{  span: 12 }}
                             md={{  span: 8 }}
                             lg={{  span: 10 }}
                             xl={{  span: 10 }}
                            >
                                <h1>{this.state.product.name}</h1>
                                <h4>{this.state.product.description}</h4>
                                <Rate disabled allowHalf defaultValue={3.5} />
                                <span>47 reviews</span>
                                <span>
                                    {this.state.product ? <a href="javascript;;">
                                        {this.state.product.shop.name}
                                    </a>: ""}
                                    {/* <a href="javascript;;">
                                        {this.state.product.shop.name}
                                    </a> */}
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
                                <div>
                                    <h4>
                                        {this.state.product ?  this.state.product.shop.delivery > 0
                                            ? "Store Provides delivery" : "Store Does not provide delivery": "Delivery"}
                                        {/* {this.state.product.shop.delivery > 0
                                            ? "Store Provides delivery"
                                            : "Store Does not provide delivery"} */}
                                    </h4>
                                </div>
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
                                {!this.state.Reviews && !this.state.product && <Skeleton active />}
                                {this.state.Reviews && this.state.product && (
                                    <Reviews
                                        title="Product Reviews"
                                        size={3}
                                        Reviews={this.state.Reviews}
                                        type="products"
                                        id={this.props.match.params.id}
                                        // lift={this.getReviews}
                                        user_id={this.state.product.shop.user_id}
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
