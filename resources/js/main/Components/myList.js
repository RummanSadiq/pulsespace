import React, { Component } from "react";
import { Row, Col } from "antd";
import Products from "./LimitedProducts";
import Axios from 'axios';
import {withRouter} from 'react-router-dom'
class MyList extends Component {
    state = {
        products: []
    };

    componentDidMount() {
        Axios.get("/api/products").then(res => {
            const products = res.data;
            console.log("products data is", products);
            this.setState({ products: products });
        });
    }
    render() {
        return (
            <Row>
                <Col span={16} offset={4}>
                    <Products
                        products={this.state.products}
                        title="My Products List"
                        size={18}
                    />
                </Col>
            </Row>
        );
    }
}

export default MyList;
