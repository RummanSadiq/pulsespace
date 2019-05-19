import React, { Component } from "react";
import {Card, Avatar, Rate} from 'antd';
class ProductReviews extends Component {
    state = {};
    render() {
        return (
            <div>
                    {this.props.reviews.map(element => (
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
            </div>
        );
    }
}

export default ProductReviews;
