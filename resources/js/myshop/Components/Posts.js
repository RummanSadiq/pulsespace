import React, { Component } from "react";
import { Col, Card, Input, Button, message, Upload } from "antd";
import axios from "axios";
import APostForm from "./AddPostForm";
const { Meta } = Card;
const { TextArea } = Input;

class Posts extends Component {
    state = {
        posts: [],
        description: "",
        image_path: "",
        redirect: false
    };
    componentDidMount() {
        this.getPosts();
    }

    getPosts = () => {
        console.log('this.get posts');
        axios.get("/api/posts").then(res => {
            const postd = res.data;
            this.setState({ posts: postd });
            console.log(this.state.posts);
        });
    };

    handleUpload = event => {
        if (event.file.status !== "uploading") {
            console.log(event.file);
            this.setState({ image_path: event.file.response.url });
        }
    };

    handleDelete(event, id) {
        axios.delete("/api/posts/" + id).then(res => {
            this.getPosts();
        });
    }

    render() {
        return (
            <div>
                <Col span={16} offset={6}>
                    <APostForm newPosts={this.getPosts} />
                    <Card
                        title={<h3> Previous Posts </h3>}
                        type="inner"
                        hoverable="true"
                        bordered={false}
                        style={{ width: 1000 }}
                        headStyle={{ textAlign: "center" }}
                    >
                        <div style={{ paddingTop: "3%" }}>
                            {this.state.posts.map(element => (
                                <Card
                                    title={element.description}
                                    hoverable={true}
                                    bordered={false}
                                    type="inner"
                                    cover={
                                        <img
                                            alt="postimage"
                                            src={element.image_path}
                                        />
                                    }
                                    extra={
                                        <Button
                                            type="danger"
                                            size={"large"}
                                            icon="delete"
                                            onClick={event =>
                                                this.handleDelete(
                                                    event,
                                                    element.id
                                                )
                                            }
                                        />
                                    }
                                >
                                    <Meta description={element.created_at} />
                                </Card>
                            ))}
                        </div>
                    </Card>
                </Col>
            </div>
        );
    }
}

export default Posts;
