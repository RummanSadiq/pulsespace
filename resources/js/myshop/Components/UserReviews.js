import React, { Component } from "react";
import { Row, Col, Card, Avatar, Rate, Layout } from "antd";
import axios from "axios";

const { Header, Content } = Layout;

class UserReviews extends Component {
    state = {
        reviews: []
    };

    componentDidMount() {
        axios.get("/api/reviews").then(res => {
            const reviewsData = res.data;
            console.log(reviewsData);
            this.setState({ reviews: reviewsData });
        });
    }

    render() {
        return (
            <div >
                <Col
                    xs={{ offset: 6, span: 18 }}
                    sm={{ offset: 6, span: 18 }}
                    md={{ offset: 6, span: 18 }}
                    lg={{ offset: 6, span: 18 }}
                    xl={{ offset: 3, span: 20 }}
                >
                    <Header style={{ backgroundColor: "#f5f5f5" }}>
                        <div style={{ textAlign: "center" }}>
                            <h1>What Users think about your store</h1>
                        </div>
                    </Header>

                    {this.state.reviews.map(element => (
                        <div key={element.key} style={{ padding: "3%" }}>
                            <Card
                                title={
                                    <div>
                                        {" "}
                                        <Avatar size={64} icon="user" />
                                        <span style={{ marginLeft: "1%" }}>
                                            {element.username}
                                        </span>
                                    </div>
                                }
                                extra={
                                    <div>
                                        <Rate
                                            disabled
                                            defaultValue={element.rating}
                                        />
                                        {element.created_at}
                                    </div>
                                }
                            >
                                {element.description}
                            </Card>
                        </div>
                    ))}
                </Col>
            </div>
        );
    }
}

export default UserReviews;
