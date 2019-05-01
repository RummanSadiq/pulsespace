import React, { Component } from "react";
import moment from "moment";
import {
    Col,
    Card,
    Row,
    Button,
    Form,
    Select,
    message,
    Input,
    Carousel,
    TimePicker,
    Statistic,
    Icon,
    Upload,
    Modal
} from "antd";
import axios from "axios";
import SHForm from "./ShopForm";

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
        store: {},
        edit: false,
        show: false
    };

    componentDidMount() {
        axios.get("/api/myshop").then(res => {
            const storedata = res.data;
            console.log("SHOP.JS", storedata.attachments);
            this.setState({ store: storedata }, () => {});
        });
    }

    handleCancel = () => {
        this.setState({ show: false });
    };

    handleedit = () => {
        this.setState({ show: true });
    };

    handleStateChange = () => {
        axios.get("/api/myshop").then(res => {
            const storedata = res.data;
            // console.log(storedata);
            this.setState({ store: storedata, show: false });
        });
    };

    render() {
        return (
            <div>
                <Col span={13} offset={6} style={{ marginTop: "2em" }}>
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
                                        title="Feedback"
                                        value={1128}
                                        prefix={<Icon type="like" />}
                                    />
                                </Col>
                                <Col>
                                    <Statistic
                                        title="Views"
                                        value={93}
                                        prefix={<Icon type="eye" />}
                                    />
                                </Col>
                            </Row>
                            <Row style={{ marginTop: "2em" }}>
                                <Col span={12} className="infoColumns">
                                    <span>Store Type: </span>
                                    {this.state.store.store_type}
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
                                    {this.state.store.address}
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
                                    {this.state.store.open_time}
                                </Col>
                                <Col span={12} className="infoColumns">
                                    <span>Closing Time</span>
                                    {this.state.store.close_time}
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
                                        <span>
                                            {/* <Icon type="wifi" /> */}
                                            Store has Wifi
                                        </span>
                                    )}
                                    {!this.state.store.wifi > 0 && (
                                        <span>
                                            <Icon
                                            // type="wifi"
                                            // style={{
                                            //     color: "#F81D22"
                                            // }}
                                            />
                                            /> Store does not have Wifi
                                        </span>
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
