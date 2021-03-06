import React, { Component } from "react";
import moment from "moment";
import { Col, Card, Row, Button, Carousel, Statistic, Icon, Modal } from "antd";
import axios from "axios";
import SHForm from "./ShopForm";
// import '../Myshop.css';

const cardStyle = `
        .ant-card-head {
            background-color: rgb(44, 123, 229);
        }
        .ant-card-head-title > h1 {
            color: white;
        }

        .ant-card-body {
            padding: 0 0;
        }

        img {
            min-width: 100%;
            width: 100%;
        }
    `;

class Shop extends Component {
    state = {
        store: {
            shop_type: {},
            address: {}
        },
        edit: false,
        show: false
    };

    componentDidMount() {
        axios.get("https://api.pulsespace.com/myshop").then(res => {
            const storedata = res.data;
            console.log("SHOP.JS", storedata);
            this.setState({ store: storedata }, () => {});

            if (storedata.address.latitude == null) {
                console.log("getting coordinates");
                this.getLocation();
            }
        });
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

                    axios
                        .post("https://api.pulsespace.com/add/location", {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        })
                        .then(res => {
                            console.log("Coordinates Updated!");
                        });
                },
                error => {
                    // this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
                    console.log("Error getting lat long inside search", error);
                }
            );
        }
    };

    handleCancel = () => {
        this.setState({ show: false });
    };

    handleedit = () => {
        this.setState({ show: true });
    };

    handleStateChange = () => {
        axios.get("https://api.pulsespace.com/myshop").then(res => {
            const storedata = res.data;
            // console.log(storedata);
            this.setState({ store: storedata, show: false });
        });
    };

    render() {
        return (
            <div>
                <Col
                    xs={{ offset: 6, span: 18 }}
                    sm={{ offset: 6, span: 18 }}
                    md={{ offset: 6, span: 18 }}
                    lg={{ offset: 6, span: 18 }}
                    xl={{ offset: 3, span: 20 }}
                    style={{ marginTop: "2em" }}
                >
                    <style>{cardStyle}</style>
                    <Card
                        title={
                            <h1 style={{ textAlign: "center", margin: 0 }}>
                                {this.state.store.name}
                            </h1>
                        }
                        extra={
                            <div>
                                <Button
                                    shape="round"
                                    icon="edit"
                                    size={"large"}
                                    onClick={this.handleedit}
                                >
                                    Edit info
                                </Button>
                            </div>
                        }
                    >
                        <div
                            style={{
                                fontWeight: "bold"
                            }}
                        >
                            <Row>
                                <Col>
                                    <Carousel>
                                        {this.state.store.attachments &&
                                            this.state.store.attachments.map(
                                                element => (
                                                    <div>
                                                        <img
                                                            src={element.url}
                                                            alt="Store Image"
                                                            // height={350}
                                                        />
                                                    </div>
                                                )
                                            )}
                                    </Carousel>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={20}>
                                    <Statistic
                                        title="Followers"
                                        value={this.state.store.total_followers}
                                        prefix={<Icon type="like" />}
                                    />
                                </Col>
                                <Col>
                                    <Statistic
                                        title="Views"
                                        value={this.state.store.total_views}
                                        prefix={<Icon type="eye" />}
                                    />
                                </Col>
                            </Row>
                            <Row style={{ marginTop: "2em" }}>
                                <Col span={12} className="infoColumns">
                                    <span>Shop Type: </span>
                                    {this.state.store.shop_type.name}
                                </Col>

                                <Col span={12} className="infoColumns">
                                    <span style={{ fontWeight: "bold" }}>
                                        Store Contact:{" "}
                                    </span>
                                    {this.state.store.contact}
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} className="infoColumns">
                                    <span>Store Address: </span>
                                    {this.state.store.address.place}
                                </Col>
                                <Col span={12} className="infoColumns">
                                    {" "}
                                    {this.state.store.card_payment > 0 && (
                                        <span>
                                            {/* <Icon
                                                type="credit-card"
                                                theme="twoTone"
                                            /> */}
                                            Store has Card Payment
                                        </span>
                                    )}
                                    {!this.state.store.card_payment > 0 && (
                                        <span>
                                            {/* <Icon
                                                type="credit-card"
                                                theme="filled"
                                                style={{
                                                    fontSize: "50px",
                                                    color: "#F81D22"
                                                }} */}
                                            Store does not have Card Payment
                                        </span>
                                    )}
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} className="infoColumns">
                                    <span>Store opens At: </span>
                                    {this.state.store.open_at}
                                </Col>
                                <Col span={12} className="infoColumns">
                                    <span>Closing Time</span>
                                    {this.state.store.close_at}
                                    {/* <span>{moment
                    .utc(this.state.store.close_at)
                    .format("HH:mm:ss")}</span> */}
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} className="infoColumns">
                                    {this.state.store.delivery > 0 && (
                                        <span>Store Provides Delivery</span>
                                    )}
                                    {this.state.store.delivery <= 0 && (
                                        <span>
                                            Store does not Provide Delivery
                                        </span>
                                    )}
                                </Col>
                                <Col span={12} className="infoColumns">
                                    {this.state.store.wifi > 0 && (
                                        <span>Store has Wifi</span>
                                    )}
                                    {!this.state.store.wifi > 0 && (
                                        <span>Store does not have Wifi</span>
                                    )}
                                </Col>
                            </Row>

                            <Row />
                        </div>
                    </Card>
                </Col>
                <Modal
                    title="Edit Store details"
                    visible={this.state.show}
                    onOk={event => this.handleOk(event)}
                    onCancel={this.handleCancel}
                    destroyOnClose={true}
                    style={{ top: 20 }}
                    footer={null}
                >
                    <SHForm
                        store={this.state.store}
                        changeState={this.handleStateChange}
                    />
                </Modal>
            </div>
        );
    }
}

export default Shop;
