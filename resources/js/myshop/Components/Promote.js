import React, { Component } from "react";
import { Layout, Row, Col, Card, Icon, Button, Carousel } from "antd";
import axios from "axios";
class Promote extends Component {
    state = {
        promotion: {}
    };
    componentDidMount() {
        axios.get("https://api.pulsespace.com/mypromotion").then(res => {
            const promoteData = res.data;
            console.log("promotion data is ", promoteData);
            this.setState({ promotion: promoteData });
        });
    }

    render() {
        const d = {
            // background: "white",
            // padding: "30px"
            marginTop: "2em"
        };

        const s = {
            width: "auto",
            textAlign: "center",
            marginTop: "4em"
        };

        return (
            // <Layout>
            <Col
                xs={{ offset: 6 }}
                sm={{ offset: 6 }}
                md={{ offset: 6 }}
                lg={{ offset: 6 }}
                xl={{ offset: 3 }}

                // style={{marginTop: "4em"}}
            >
                <Card
                    title={
                        <h2 style={{ textAlign: "center", marginTop: "2em" }}>
                            Promote your Business with us
                        </h2>
                    }
                    //  style={d}
                >
                    <h1 style={{ textAlign: "center" }}>
                        Your Current package is
                        {this.state.promotion.package_name == "Pro" && (
                            <span style={{ color: "#7AB5E9" }}>Pro</span>
                        )}
                        {this.state.promotion.package_name == "Advanced" && (
                            <span style={{ color: "#E3255F" }}>Advanced</span>
                        )}
                        {this.state.promotion.package_name == "Starter" && (
                            <span style={{ color: "#262626" }}>Starter</span>
                        )}
                        <br />
                        Ending at: {this.state.promotion.ends_at}
                    </h1>
                    <hr />
                    <Row type="flex" justify="space-around">
                        <Col
                            xs={{ span: 24 }}
                            sm={{ span: 24 }}
                            md={{ span: 6 }}
                            lg={{ span: 6 }}
                            xl={{ span: 7 }}
                            // span={8}
                        >
                            <Card bordered={false} style={s} hoverable>
                                <h1>Starter</h1>
                                <h3>50$</h3>
                                <h5>For New Shops Owners and Beginners </h5>
                                <hr />
                                <h3>All Our Standard Services</h3>
                                <hr />
                                <h3>Promote your Shop</h3>
                                <hr />
                                <h3>
                                    Promote your products and shop for 7 days
                                </h3>
                                <Button
                                    block
                                    style={{
                                        backgroundColor: "#1D3B55",
                                        color: "white"
                                    }}
                                >
                                    Get Started
                                </Button>
                            </Card>
                        </Col>

                        <Col
                            xs={{ span: 24 }}
                            sm={{ span: 24 }}
                            md={{ span: 6 }}
                            lg={{ span: 6 }}
                            xl={{ span: 7 }}
                            span={8}
                        >
                            <Card bordered={false} style={s} hoverable>
                                <h1 style={{ color: "#4699E1" }}>PRO</h1>
                                <h3 style={{ color: "#4699E1" }}>
                                    99$ per month
                                </h3>
                                <h5>
                                    For Professionals who wanted to enhance
                                    their business{" "}
                                </h5>
                                <hr />
                                <h3>All Our Standard Services</h3>
                                <hr />
                                <h3>Attract more customers</h3>
                                <hr />
                                <h3>
                                    Promote your shop and products for 14 days
                                </h3>
                                <Button type="primary" block>
                                    Get Started
                                </Button>
                            </Card>
                        </Col>

                        <Col
                            xs={{ span: 24 }}
                            sm={{ span: 24 }}
                            md={{ span: 6 }}
                            lg={{ span: 6 }}
                            xl={{ span: 7 }}
                            span={8}
                        >
                            <Card bordered={false} style={s} hoverable>
                                <h1 style={{ color: "#E3255F" }}>ADVANCED</h1>
                                <h3 style={{ color: "#E3255F" }}>
                                    Contact us for pricing
                                </h3>
                                <h5>For Business Owners and Investors</h5>
                                <hr />
                                <h3>All Our Standard Services</h3>
                                <hr />
                                <h3>Grow your business</h3>
                                <hr />
                                <h3>Post your products for 30 days</h3>
                                <Button
                                    block
                                    style={{
                                        backgroundColor: "#E3255F",
                                        color: "white"
                                    }}
                                >
                                    Get Started
                                </Button>
                            </Card>
                        </Col>
                    </Row>
                </Card>
            </Col>
            // </Layout>
        );
    }
}

export default Promote;
