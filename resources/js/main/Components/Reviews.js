import React, { Component } from "react";
import {
    Col,
    Card,
    Carousel,
    Button,
    List,
    Avatar,
    Rate,
    Modal,
    Icon,
    message,
    
} from "antd";
import axios from "axios";
import AddReviewForm from "./ReviewForm";

class Reviews extends Component {
    constructor(props) {
        super(props);
        this.state.Reviews = this.props.Reviews;
        this.state.title = this.props.title;
        this.state.size = this.props.size;
    }
    state = {
        Reviews: [],
        visible: false,
        user: ""
    };

    componentDidMount() {
        axios.get("https://api.pulsespace.com/user").then(res => {
            const user = res.data;
            console.log(
                "calling from inside Reviews.js Logged in user is",
                user
            );
            this.setState({ user: res.data });
        });
    }
    showModal = () => {
        console.log(
            "From inside Reviews.js: User id from props is",
            this.props.user_id
        );
        if (this.state.user.id == this.props.user_id) {
            message.error("You cannot add review to your own store.");
        } else {
            this.setState({
                visible: true
            });
        }
    };
    handleCancel = e => {
        console.log("handle Cancel called from Reviews.js");
        this.setState({
            visible: false
        });
        // this.props.lift();
    };

    report = id => {
        axios.post("https://api.pulsespace.com/reports/reviews/"+id).then(res => {
            const user = res.data;
            console.log("calling from inside Reviews.js Logged in user is", user);
            this.setState({ user: res.data });
        });
        console.log("Reporting review", id);
    };
    render() {
        return (
            <div>
                <Card
                    title={<h2>{this.state.title}</h2>}
                    bordered={false}
                    extra={
                        <Button icon="plus" onClick={this.showModal}>
                            Add a Review
                        </Button>
                    }
                    style={{ background: "#ECECEC", textAlign: "left" }}
                >
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            onChange: page => {
                                console.log(page);
                            },
                            pageSize: this.state.size
                        }}
                        dataSource={this.state.Reviews}
                        renderItem={item => (
                            <List.Item
                                key={item.id}
                                actions={[
                                    <span>
                                        <Icon
                                            type="like"
                                            theme="twoTone"
                                            style={{
                                                marginRight: 8,
                                                fontSize: "20px"
                                            }}
                                        />{" "}
                                        156
                                    </span>,
                                    <span>
                                        <Icon
                                            type="dislike"
                                            theme="twoTone"
                                            style={{
                                                marginRight: 8,
                                                fontSize: "20px"
                                            }}
                                        />{" "}
                                        121
                                    </span>,

                                    <span>
                                        <Icon
                                            type="exclamation-circle"
                                            theme="twoTone"
                                            onClick={() => {
                                                this.report(item.id);
                                            }}
                                            style={{
                                                marginRight: 8,
                                                fontSize: "20px"
                                            }}
                                        />{" "}
                                        Report
                                    </span>
                                    // <IconText type="exclamation-circle" text="Report" onClick={()=>{this.report(item.id)}}/>
                                    // <Icon type="exclamation" />
                                ]}
                                style={{ background: "white", padding: "2%" }}
                            >
                                <List.Item.Meta
                                    avatar={
                                        <Avatar>
                                            <Icon type="user" />
                                        </Avatar>
                                    }
                                    title={
                                        <a href={item.href}>{item.username}</a>
                                    }
                                    description={
                                        <Rate
                                            disabled
                                            defaultValue={item.rating}
                                        />
                                    }
                                />
                                <div style={{ fontWeight: "inherit" }}>
                                    {item.description}
                                </div>
                                <div style={{ textAlign: "right" }}>
                                    {item.created_at}
                                </div>

                                <div>
                                    <Carousel>
                                        {item.attachments.map(image => (
                                            <div
                                                style={{
                                                    textAlign: "center",
                                                    height: "100"
                                                }}
                                            >
                                                <img
                                                    src={image.url}
                                                    alt="Store Image"
                                                    height="600"
                                                    width="100%"
                                                />
                                            </div>
                                        ))}
                                    </Carousel>
                                </div>
                            </List.Item>
                        )}
                    />
                </Card>
                <Modal
                    title="Write a Review"
                    visible={this.state.visible}
                    // onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <AddReviewForm
                        handleok={this.handleCancel}
                        item_id={this.props.id}
                        type={this.props.type}
                        lift={this.props.lift}
                    />
                </Modal>
            </div>
        );
    }
}

export default Reviews;
