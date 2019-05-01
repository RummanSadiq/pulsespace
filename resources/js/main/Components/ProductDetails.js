import React, { Component } from "react";
import { Row, Col, Rate, Button, Card, Avatar, List } from "antd";
import Reviews from "./Reviews";
import Products from "./LimitedProducts";
import Axios from 'axios';

class ProductDetails extends Component {
    state = {
        product: {}
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
                <Row>
                    <Col span={8} offset={4}>
                        <img
                            src={
                                "https://cdn.pixabay.com/photo/2019/04/08/21/46/harley-davidson-4113065_960_720.jpg"
                            }
                            width={400}
                            height={400}
                        />
                    </Col>
                    <Col span={8}>
                        <h1>
                            HP 15 Laptop 15.6" Touchscreen , Intel Pentium
                            Silver N5000, Intel UHD Graphics 605, 500GB HDD, 4GB
                            SDRAM, DVD, Scarlet Red, 15-bs244wm
                            {this.state.product.name}
                        </h1>
                        <h4>
                            {this.state.product.description}
                        </h4>
                        <Rate disabled allowHalf defaultValue={3.5} />
                        <span>47 reviews</span>
                        <span>Shop name{this.state.product.store_id}</span>
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
                <hr />
                <Row style={{ backgroundColor: "white" }}>
                    <Col span={16} offset={4}>
                        <Reviews  title='Product Reviews' size={3} Reviews={this.state.Reviews}/>
                    </Col>
                </Row>
                <Row style={{ backgroundColor: "white" }}>
                    <Col span={16} offset={4}>
                        <Products title='Similar products' products={this.state.products} size={6}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ProductDetails;
