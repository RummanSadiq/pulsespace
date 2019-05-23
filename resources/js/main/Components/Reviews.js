import React, { Component } from "react";
import {
    Col,
    Card,
    Row,
    Carousel,
    Button,
    Layout,
    List,
    Avatar,
    Rate,
    Modal,
    Icon,
    message
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
        user:''
    };

    componentDidMount() {
        axios.get("/api/user").then(res => {
            const user = res.data;
            console.log("Logged in user is", user);
            this.setState({ user: user });
        });
    }
    showModal = () => {
        if (this.state.user.id == this.props.user_id){
            message.error('You cannot add review to your own store.');
        }else{
          this.setState({
            visible: true
        });  
        }
        
    };
    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false
        });
        // this.props.lift();
    };

    render() {
        const IconText = ({ type, text }) => (
            <span>
                <Icon
                    type={type}
                    style={{ marginRight: 8, fontSize: "20px" }}
                    theme="twoTone"
                />
                {text}
            </span>
        );

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
                                    <IconText type="like" text="156" />,
                                    <IconText type="dislike" text="156" />
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
