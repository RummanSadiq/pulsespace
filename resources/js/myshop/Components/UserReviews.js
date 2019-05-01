import React, { Component } from "react";
import { Row, Col, Card, Avatar, Rate } from "antd";
import axios from "axios";

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
            <div style={{ maxWidth: "80%" }}>
                <Col span={16} offset={6}>
                    <h1 style={{ textAlign: "center" }}>
                        What Users think about your store
                    </h1>
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
