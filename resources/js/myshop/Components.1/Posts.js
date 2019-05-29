import React, { Component } from "react";
import {
    Col,
    Card,
    Input,
    Button,
    message,
    Upload,
    Carousel,
    List
} from "antd";
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
        console.log("this.get posts");
        axios.get("https://api.pulsespace.com/myposts").then(res => {
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
        axios
            .delete("https://api.pulsespace.com/posts/" + id)
            .then(() => {
                this.getPosts();
                console.log("Element deleted");
                message.success("Deleted");
            })
            .catch(err => {
                console.log("Error in deleting", err);
                message.error("Cannot Delete");
            });
    }

    render() {
        return (
            <div>
                <Col
                    xs={{ offset: 6, span: 18 }}
                    sm={{ offset: 6, span: 18 }}
                    md={{ offset: 6, span: 18 }}
                    lg={{ offset: 6, span: 18 }}
                    xl={{ offset: 3, span: 20 }}
                >
                    <APostForm newPosts={this.getPosts} />
                    <Card
                        title={<h3> Previous Posts </h3>}
                        type="inner"
                        hoverable="true"
                        bordered={false}
                        // style={{ width: 1000 }}
                        headStyle={{ textAlign: "center" }}
                    >
                        <div style={{ paddingTop: "3%" }}>
                            {/* {this.state.posts.map(element => (
                                <Card
                                    title={element.description}
                                    hoverable={true}
                                    bordered={false}
                                    type="inner"
                                    cover={
                                        <Carousel >
                                        {element.attachments.map(image=>{
                                            <img src={image.url}/>
                                        })}
                                      </Carousel>
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
                            ))} */}

                            <List
                                itemLayout="vertical"
                                bordered
                                pagination={{
                                    onChange: page => {
                                        console.log(page);
                                    },
                                    pageSize: 6
                                }}
                                dataSource={this.state.posts}
                                // footer={
                                //     <div>
                                //         <b>ant design</b> footer part
                                //     </div>
                                // }
                                style={{ background: "#F5F5F5" }}
                                renderItem={element => (
                                    <List.Item
                                        key={element.store_id}
                                        // style={{ textAlign: "left" }}
                                        actions={[
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
                                            >
                                                Delete
                                            </Button>
                                        ]}
                                    >
                                        {/* <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                src={element.store_picture}
                                            />
                                        }
                                        title={
                                            <a href={"store/" + element.id}>
                                                {" "}
                                                {element.store_name}
                                            </a>
                                        }
                                        description={element.created_at}
                                    /> */}

                                        <div style={{ marginLeft: "100" }}>
                                            <h4>{element.description}</h4>
                                        </div>
                                        <div style={{ textAlign: "right" }}>
                                            {element.created_at}
                                        </div>

                                        <div style={{ marginTop: "20" }}>
                                            <Carousel
                                                style={{
                                                    textAlign: "center",
                                                    height: "100",
                                                    maxHeight: "100"
                                                }}
                                            >
                                                {element.attachments.map(
                                                    image => (
                                                        <div
                                                            style={{
                                                                textAlign:
                                                                    "center",
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
                                                    )
                                                )}
                                            </Carousel>
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </div>
                    </Card>
                </Col>
            </div>
        );
    }
}

export default Posts;
