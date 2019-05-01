import React, { Component } from "react";
import { Card, Form, Input, Button, Upload, message } from "antd";
import axios from "axios";
const { TextArea } = Input;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class AddPostForm extends Component {
    constructor(props) {
        super(props);
        this.state.posts = this.props.posts;
        this.myUpload = React.createRef();
    }

    state = {
        posts: [],
        description: "",
        image_path: "",
        posted: false,
        uploadedFile: ""
    };

    handleChange = event => {
        this.setState({ description: event.target.value });
        console.log(event.target.value);
    };

    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            console.log("values received are", values);
            if (!err) {
                var arr = {
                    description: this.state.description,
                    image_path: this.state.image_path
                };
                axios.post("/api/posts", arr).then(res => {
                    this.props.form.resetFields();
                    console.log(this.myUpload.current);
                    this.myUpload.current.handleManualRemove(
                        this.state.uploadedFile
                    );

                    this.props.newPosts();
                    this.setState({ posted: !this.state.posted });
                    message.success("Post Added");
                });
            } else {
                message.error("Couldnt upload to database", err);
                console.log("Error received is ", err);
            }
            this.props.form.resetFields();
        });
    };

    handleUpload = event => {
        if (event.file.status !== "uploading") {
            console.log("Uploading file is", event.file);
            this.setState({ image_path: event.file.response.url });
            this.setState({ uploadedFile: event.file });
        }
    };
    render() {
        const {
            getFieldDecorator,
            getFieldsError,
            getFieldError,
            isFieldTouched
        } = this.props.form;

        return (
            <Card
                title={<h1> Create posts for annoucements </h1>}
                type="inner"
                hoverable="true"
                bordered={false}
                style={{ width: 1000 }}
                headStyle={{ textAlign: "center" }}
            >
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator("description", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input your username!"
                                }
                            ]
                        })(
                            <TextArea
                                placeholder="Write Something"
                                autosize={{ minRows: 2, maxRows: 6 }}
                                onChange={this.handleChange}
                            />
                        )}
                    </Form.Item>

                    <div
                        style={{
                            marginLeft: "60%",
                            paddingTop: "1%",
                            textAlign: "right"
                        }}
                    >
                        <Form.Item>
                            {getFieldDecorator("display_picture", {
                                rules: [
                                    {
                                        required: false,
                                        message: "Please input picture"
                                    }
                                ]
                            })(
                                <Upload
                                    action="/api/attachment/posts"
                                    onChange={this.handleUpload}
                                    listType="picture"
                                    name="image"
                                    ref={this.myUpload}
                                >
                                    <Button icon="upload">
                                        Upload Picture
                                    </Button>
                                </Upload>
                            )}
                        </Form.Item>
                    </div>
                    <Button
                        type="primary"
                        shape="round"
                        icon="check"
                        // size={"medium"}
                        htmlType="submit"
                        disabled={hasErrors(getFieldsError())}
                    >
                        Post
                    </Button>
                </Form>
            </Card>
        );
    }
}
const APostForm = Form.create({ name: "Shop_Form" })(AddPostForm);

export default APostForm;
