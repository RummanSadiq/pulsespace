import React, { Component } from "react";
import { Card, Row, Col, Icon } from "antd";

class StoreDetails extends Component {
    constructor(props) {
        super(props);
        this.state.store = this.props.details;

        console.log("store details in props are", this.props.details);
    }
    state = {
        store: {}
    };

    render() {
        return (
            <Card title="Store name" style={{ backgroundColor: "white" }}>
                <div style={{ textAlign: "center" }}>
                    <h1>this.state.store.name</h1>
                </div>
                <Row>
                    <Col span={8}>
                        <Icon type="phone" />
                        042 35224868
                        {this.state.store.contact}
                    </Col>
                    <Col span={8}>
                        <Icon type="info" />
                        437 G1 Market, Block G 1 Phase 1 Johar Town, Lahore,
                        Punjab
                        {this.state.store.address}
                    </Col>
                    <Col span={8}>
                        <Icon type="info" /> Store City: Lahore
                        {this.state.store.address}
                    </Col>
                    <Col span={2}>
                        <Icon type="bars" /> Tech
                        {this.state.store.store_type}
                    </Col>
                    <Col span={3}>
                        <Icon type="clock-circle" /> <h4>Opens at:</h4>{" "}10:00am
                        {this.state.store.open_time}
                    </Col>
                    <Col span={3}>
                        <Icon type="clock-circle" /> <h4>Closes at:</h4>{" "}12:30am
                        {this.state.store.close_time}
                    </Col>
                    <Col span={3}>
                        <Icon type="step-forward" /> <h4>Delivery:</h4>{" "}NO
                        {this.state.store.delivery}
                    </Col>
                    <Col span={3}>
                        <Icon type="wifi" /> <h4>Wifi:</h4>{" "}No
                        {this.state.store.wifi}
                    </Col>
                    <Col span={3}>
                        <Icon type="credit-card" /> <h4>Card:</h4>{" "}YES
                        {this.state.store.card_payment}
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default StoreDetails;
