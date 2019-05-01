import React, { Component } from "react";
import { Row, Col, Card, Button, Carousel, List, Tabs, Icon } from "antd";
import Products from "./LimitedProducts";
import AllPosts from "./AllPosts";
import Stores from "./LimitedStores";
import cimage from "../Images/img1.jpg";
import pimage from "../Images/pimg.png";
import Head from "./head";
import HomeComponents from "./HomeComponents";

import Axios from "axios";
import SearchComponent from "./Search";

const { TabPane } = Tabs;
class HomePage extends Component {
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
        // Axios.get("/api/products").then(res => {
        //     const products = res.data;
        //     console.log("products data is", products);
        //     this.setState({ products: products });
        // });
        // this.getStores();
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
                <HomeComponents />
            </div>
        );
    }
}

export default HomePage;
