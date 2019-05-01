import React, { Component } from "react";
import { Row, Col, Card, Button, Carousel, List, Tabs, Icon } from "antd";
import axios from "axios";


class FAQs extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        faqs: []
    };

    componentDidMount() {
        axios.get("/api/faqs/shop/" + this.props.id).then(res => {
            const faqsData = res.data;
            console.log(faqsData);
            this.setState({ faqs: faqsData });
        });
    }
    render() {
        return (
            <Card
                title={<h2>FAQs</h2>}
                extra={<Button icon="plus">All</Button>}
                bordered={false}
                style={{ background: "#ECECEC" }}
            >
                <List
                    itemLayout="vertical"
                    bordered
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 6
                    }}
                    dataSource={this.state.faqs}
                    renderItem={element => (
                        <List.Item>
                            <Card
                                title={element.question}
                                // key={element.id}
                                type="inner"
                                hoverable="true"
                                bordered={false}
                            >
                                <p>{element.answer}</p>
                            </Card>
                        </List.Item>
                    )}
                />
            </Card>
        );
    }
}

export default FAQs;
