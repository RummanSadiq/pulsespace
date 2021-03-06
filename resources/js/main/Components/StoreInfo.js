import React, { Component } from "react";
import {
    Row,
    Col,
    Icon,
    Button,
    Rate,
    Carousel,
    Modal,
    Input,
    Divider
} from "antd";
import { NavLink } from "react-router-dom";
import axios from "axios";

const { TextArea } = Input;

class StoreInfo extends Component {
    constructor(props) {
        super(props);
        this.state.store = this.props.store;
    }
    state = {
        store: {},
        visible: false
    };
    showModal = () => {
        this.setState({
            visible: true
        });
    };
    handleOk = e => {
        console.log(e);
        console.log("Sending your message", this.state.message);

        axios
            .post("https://api.pulsespace.com/messages/new", {
                shop_owner_id: this.state.store.user.id,
                text: this.state.message
            })
            .then(res => {
                console.log(res);
                this.setState({
                    visible: false
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false
        });
    };

    messageChange = event => {
        this.setState({ message: event.target.value });
    };
    componentDidMount() {
        this.getFollowed();
    }
    handleFollow(id) {
        console.log("handle follow", id);
        axios
            .get("https://api.pulsespace.com/follow/" + id)
            .then(res => {
                this.getFollowed();
            })
            .catch(err => {
                console.log(
                    "Error occured, cannot make api call to follow store",
                    err
                );
            });
    }

    checkFollow() {
        console.log("I am inside check follow");
        const result = this.state.followed.find(
            element => element.store_id == this.state.id
        );
        console.log("result out is", result);

        if (result) {
            console.log("result is", result);
            // return true;
            this.setState({ f: true });
        } else {
            console.log("nope!", result);
            // return false;
            this.setState({ f: false });
        }
    }
    getFollowed() {
        axios.get("https://api.pulsespace.com/followed").then(res => {
            const followedData = res.data;
            console.log("followed data is", followedData);
            this.setState({ followed: followedData }, () => {
                console.log("followed data is", this.state.followed);

                this.checkFollow();
            });
        });
    }

    render() {
        return (
            <Row style={{ marginTop: "3%" }}>
                <Col>
                    <Col span={12} offset={8}>
                        {this.state.f && (
                            <Button
                                icon="check"
                                size="large"
                                shape="round"
                                style={{
                                    backgroundColor: "#F57224",
                                    color: "white"
                                }}
                                onClick={() =>
                                    this.handleFollow(this.state.store.id)
                                }
                            >
                                Following
                            </Button>
                        )}
                        {!this.state.f && (
                            <Button
                                icon="plus"
                                size="large"
                                shape="round"
                                style={{
                                    backgroundColor: "#F57224",
                                    color: "white"
                                }}
                                onClick={() =>
                                    this.handleFollow(this.state.store.id)
                                }
                            >
                                Follow
                            </Button>
                        )}{" "}
                        <Button
                            icon="message"
                            size="large"
                            shape="round"
                            style={{
                                backgroundColor: "#F57224",
                                color: "white"
                            }}
                            onClick={this.showModal}
                        >
                            Message
                        </Button>
                        <div>
                            <h4>
                                Number of Followers:{" "}
                                {this.state.store.total_followers
                                    ? this.state.store.total_followers
                                    : "0"}
                            </h4>{" "}
                            <span>
                                <Rate
                                    disabled
                                    defaultValue={this.state.store.avg_rating}
                                />
                            </span>
                        </div>
                    </Col>
                    <Divider />
                    <div style={{ textAlign: "center" }}>
                        <h1>{this.props.store.name}</h1>
                    </div>
                    <hr style={{ marginBottom: 0, width: 5 }} />
                    <Row style={{ fontFamily: "sans-serif" }}>
                        <Col
                            span={6}
                            style={{
                                textAlign: "center",
                                fontSize: 16
                            }}
                        >
                            <Icon type="phone" theme="twoTone" />
                            {this.state.store.contact}
                        </Col>
                        <Col
                            span={8}
                            // offset={2}
                            style={{
                                textAlign: "center",
                                fontSize: 16
                            }}
                        >
                            <Icon type="info" theme="twoTone" />
                            {this.state.store.address.place}
                        </Col>
                        <Col
                            span={6}
                            style={{
                                textAlign: "center",
                                fontSize: 16
                            }}
                        >
                            <Icon type="info" theme="twoTone" /> Store City:
                            Lahore
                        </Col>
                    </Row>
                    <hr />
                    <Row
                        style={{
                            padding: 20,
                            backgroundColor: "#ECECEC"
                        }}
                    >
                        <Col
                            span={4}
                            style={{
                                textAlign: "center",
                                fontSize: 14,
                                borderRight: 50,
                                borderRightStyle: "solid",
                                borderWidth: 2,
                                height: "100%"
                            }}
                        >
                            <Icon
                                type="bars"
                                style={{ fontSize: 20 }}
                                theme="twoTone"
                            />{" "}
                            {this.state.store.shop_type.name} type
                        </Col>

                        <Col
                            span={8}
                            style={{
                                textAlign: "center",
                                fontSize: 14,
                                borderRight: 50,
                                borderRightStyle: "solid",
                                borderWidth: 2,
                                height: "100%"
                            }}
                        >
                            <Icon
                                type="clock-circle"
                                style={{ fontSize: 20 }}
                                theme="twoTone"
                            />{" "}
                            <h3 style={{ display: "inline" }}>Opens at:</h3>{" "}
                            {this.state.store.open_at}
                            <br />
                            <Icon
                                type="clock-circle"
                                style={{ fontSize: 20 }}
                                theme="twoTone"
                            />{" "}
                            <h3 style={{ display: "inline" }}>Closes at:</h3>{" "}
                            {this.state.store.close_at}
                        </Col>
                        <Col
                            span={4}
                            style={{
                                textAlign: "center",
                                fontSize: 14,
                                borderRight: 50,
                                borderRightStyle: "solid",
                                borderWidth: 2,
                                height: "100%"
                            }}
                        >
                            <Icon
                                type="step-forward"
                                style={{ fontSize: 20 }}
                                theme="twoTone"
                            />{" "}
                            <h3 style={{ display: "inline" }}>Delivery:</h3>{" "}
                            {/* {this.state.delivery > 0 && "Yes"} */}
                            {this.state.delivery == 1 && "Yes"}
                            {this.state.delivery != 1 && "No"}
                        </Col>
                        <Col
                            span={4}
                            style={{
                                textAlign: "center",
                                fontSize: 14,
                                borderRight: 50,
                                borderRightStyle: "solid",
                                borderWidth: 2,
                                height: "100"
                            }}
                        >
                            <Icon
                                type="wifi"
                                style={{ fontSize: 20 }}
                                theme="twoTone"
                            />{" "}
                            <h3 style={{ display: "inline" }}>Wifi</h3>{" "}
                            {this.state.wifi > 0 && "Yes"}
                            {!this.state.wifi > 0 && "No"}
                        </Col>
                        <Col
                            span={4}
                            style={{
                                textAlign: "center",
                                fontSize: 14
                            }}
                        >
                            <Icon
                                type="credit-card"
                                style={{ fontSize: 20 }}
                                theme="twoTone"
                            />{" "}
                            <h3 style={{ display: "inline" }}>Card:</h3>{" "}
                            {this.state.card_payment && "Yes"}
                            {!this.state.card_payment && "No"}
                        </Col>
                    </Row>
                </Col>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <TextArea
                        placeholder="Enter your message"
                        onChange={this.messageChange}
                    />
                </Modal>
            </Row>
        );
    }
}

export default StoreInfo;
