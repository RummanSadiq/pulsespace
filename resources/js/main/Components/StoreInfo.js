import React, { Component } from "react";
import { Row, Col, Icon, Button, Rate, Carousel } from "antd";
import axios from "axios";
class StoreInfo extends Component {
    constructor(props) {
        super(props);
        this.state.store = this.props.store;
    }
    state = {
        store: {}
        // f:''
    };
    componentDidMount() {
        this.getFollowed();
    }
    handleFollow(id) {
        console.log("handle follow", id);
        axios
            .get("/api/follow/" + id)
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
        axios.get("/api/followed").then(res => {
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
                <Col span={12} offset={6}>
                  
                    <div>
                        {this.state.f && (
                            <Button
                                icon="check"
                                size="large"
                                shape="round"
                                style={{
                                    backgroundColor: "#F57224",
                                    color: "white"
                                }}
                                onClick={() => this.handleFollow(this.state.id)}
                                
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
                                onClick={() => this.handleFollow(this.state.id)}
                            >
                                Follow
                            </Button>
                        )}

                        <Button
                            icon="message"
                            size="large"
                            shape="round"
                            style={{
                                backgroundColor: "#F57224",
                                color: "white"
                            }}
                        >
                            Message
                        </Button>
                        <div>
                            <h4>Number of Followers: {this.state.store.numberofFollowers ? this.state.this.state.store.numberofFollowers: "0"}</h4>
                            
                            {" "}
                            <span>
                                <Rate disabled defaultValue={this.state.store.avg_rating} />
                            </span>
                        </div>
                    </div>
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
                            <Icon type="phone" theme='twoTone'/>
                            {this.state.store.contact}
                        </Col>
                        <Col
                            span={8}
                            offset={2}
                            style={{
                                textAlign: "center",
                                fontSize: 16
                            }}
                        >
                            <Icon type="info" theme='twoTone'/>
                            {this.state.store.address.place}
                        </Col>
                        <Col
                            span={6}
                            style={{
                                textAlign: "center",
                                fontSize: 16
                            }}
                        >
                            <Icon type="info" theme='twoTone'/> Store City: Lahore
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
                            <Icon type="bars" style={{ fontSize: 20 }} theme='twoTone'/>{" "}
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
                                theme='twoTone'
                            />{" "}
                            <h3 style={{ display: "inline" }}>Opens at:</h3>{" "}
                            {this.state.store.open_at}
                            <br />
                            <Icon
                                type="clock-circle"
                                style={{ fontSize: 20 }}
                                theme='twoTone'
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
                                theme='twoTone'
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
                            <Icon type="wifi" style={{ fontSize: 20 }} theme='twoTone' />{" "}
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
                            <Icon type="credit-card" style={{ fontSize: 20 }} theme='twoTone'/>{" "}
                            <h3 style={{ display: "inline" }}>Card:</h3>{" "}
                            {this.state.card_payment && "Yes"}
                            {!this.state.card_payment && "No"}
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default StoreInfo;
