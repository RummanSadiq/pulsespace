import React, { Component } from "react";
import { Row, Col, Select, Button, Dropdown, Icon, Menu, Skeleton } from "antd";
import Axios from "axios";
import Stores from "./LimitedStores";
import Products from "./LimitedProducts";

class SearchComponent extends Component {
    constructor(props) {
        super(props);
        this.state.value = this.props.match.params.value;
    }

    componentDidMount() {
        Axios.get("https://api.pulsespace.com/search/" + this.state.value).then(
            res => {
                const products = res.data;
                console.log(" search products data is", products);
                this.setState({ products: products });
            }
        );
    }
    getLocation = () => {
        const location = window.navigator && window.navigator.geolocation;

        if (location) {
            location.getCurrentPosition(
                position => {
                    console.log(
                        "Lati tude is" +
                            position.coords.latitude +
                            "Longitude is" +
                            position.coords.longitude
                    );
                    this.setState({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                error => {
                    // this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
                    console.log("Error getting lat long inside search", error);
                }
            );
        }
    };

    getProducts = input => {
        var search = {
            search: this.state.value
        };

        this.getLocation();
        console.log("Input is", input);

        if (input === "High") {
            search.high_price = "High";
            Axios.get(
                "https://api.pulsespace.com/search/" +
                    this.state.value +
                    "/sort/price_high"
            ).then(res => {
                const products = res.data;
                console.log("high priced products are", products);
            });
        } else if (input === "Low") {
            search.low_price = "Low";
            Axios.get(
                "https://api.pulsespace.com/search/" +
                    this.state.value +
                    "/sort/price_low"
            ).then(res => {
                const products = res.data;
                console.log("low priced products are", products);
                this.setState({ products: products });
            });
        } else if (input === "Location") {
            if (this.state.latitude) {
                Axios.post(
                    "https://api.pulsespace.com/search/" +
                        this.state.value +
                        "/sort/nearby",
                    {
                        latitude: this.state.latitude,
                        longitude: this.state.longitude
                    }
                ).then(res => {
                    const products = res.data;
                    console.log("nearby products are", products);
                    this.setState({ products: products });
                });
            }
        }
    };
    getStores() {
        Axios.get("/api/shops").then(res => {
            const shops = res.data;
            console.log("Shops are", shops);
            // this.setState({ shops: shops });
        });
    }
    state = {};

    render() {
        return (
            <div>
                <Row>
                    <Col span={16} offset={4}>
                        <Row>
                            <Col span={4}>
                                <h2>Search Results:</h2>
                            </Col>
                            <Col span={6} offset={12}>
                                <Row>
                                    <Col span={6}>
                                        {" "}
                                        <h2>Sort by:</h2>
                                    </Col>
                                    <Col span={12}>
                                        <Dropdown
                                            overlay={
                                                <Menu>
                                                    {this.state.latitude && (
                                                        <Menu.Item
                                                            key="1"
                                                            onClick={() => {
                                                                this.getProducts(
                                                                    "Location"
                                                                );
                                                            }}
                                                        >
                                                            <Icon type="pushpin" />
                                                            Location
                                                        </Menu.Item>
                                                    )}
                                                    {/* <Menu.Item
                                                        key="2"
                                                        onClick={() => {
                                                            this.getProducts(
                                                                "Trending"
                                                            );
                                                        }}
                                                    >
                                                        <Icon type="arrow-up" />
                                                        Trending
                                                    </Menu.Item> */}
                                                    <Menu.Item
                                                        key="3"
                                                        onClick={() => {
                                                            this.getProducts(
                                                                "High"
                                                            );
                                                        }}
                                                    >
                                                        <Icon type="up" />
                                                        Price high to low
                                                    </Menu.Item>
                                                    <Menu.Item
                                                        key="4"
                                                        onClick={() => {
                                                            this.getProducts(
                                                                "Low"
                                                            );
                                                        }}
                                                    >
                                                        <Icon type="down" />
                                                        Price low to high
                                                    </Menu.Item>
                                                </Menu>
                                            }
                                        >
                                            <Button style={{ marginLeft: 8 }}>
                                                <Icon type="down" />
                                            </Button>
                                        </Dropdown>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col lg={16} offset={4}>
                        {this.state.shops && (
                            <Stores
                                shops={this.state.shops}
                                title="Stores"
                                size={6}
                                getShops={this.getStores}
                            />
                        )}
                        {!this.state.shops && <Skeleton />}
                        {!this.state.products && <Skeleton />}

                        {this.state.products && (
                            <Products
                                products={this.state.products}
                                title="Products"
                                size={6}
                            />
                        )}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default SearchComponent;
