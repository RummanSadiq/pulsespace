import React, { Component } from "react";
import { Card, Form, Input, Button, Upload, message } from "antd";
import axios from "axios";
import FormItem from "antd/lib/form/FormItem";
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
        images: [],
        posted: false,
        uploadedFile: ""
    };

    handleChange = event => {
        this.setState({ description: event.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            console.log("values received are", values);
            if (!err) {
                var arr = {
                    description: this.state.description,
                    attachments: this.state.images
                };
              
                axios.post("/api/posts", arr).then(res => {
                    this.props.form.resetFields();
                    console.log(this.myUpload.current);
                    this.myUpload.current.handleManualRemove(
                        this.state.images
                    );

                    this.props.newPosts();
                    this.setState({ images: "" });
                    this.setState({ posted: !this.state.posted });
                    this.props.form.resetFields();
                    message.success("Post Added");
                }).catch(err=>{
                    console.log('Error occured while adding to database', err);
                    message.error('Cannot call database');
                });
            } else {
                message.error("Input fields cannot be empty");
                console.log("Error received is ", err);
            }
        });
    };

    handleUpload = event => {
        if (event.file.status !== "uploading") {
            console.log("Uploading file is", event.file);
            this.setState({ images: event.fileList});
            // this.setState({ uploadedFile: event.file });
        }
    };
    render() {
        const {
            getFieldDecorator,
            getFieldsError,
            
        } = this.props.form;

        return (
            <Card
                title={<h1> Create posts for annoucements </h1>}
                type="inner"
                hoverable="true"
                bordered={false}
                headStyle={{ textAlign: "center" }}
            >
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator("description", {
                            rules: [
                                {
                                    required: true,
                                    message:
                                        "Please input your Post description!"
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
                                // valuePropName: 'fileList',
                                rules: [
                                    {
                                        required: false,
                                        message: "Please upload picture"
                                    }
                                ]
                            })(
                                <Upload
                                    action="/api/attachment/posts"
                                    onChange={this.handleUpload}
                                    listType="picture"
                                    name="image"
                                    ref={this.myUpload}
                                    defaultFileList={this.state.images}
                                >
                                    <Button icon="upload">
                                        Upload Picture
                                    </Button>
                                </Upload>
                            )}
                        </Form.Item>
                    </div>
                    <Form.Item>
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
                    </Form.Item>
                </Form>
            </Card>
        );
    }
}
const APostForm = Form.create({ name: "Shop_Form" })(AddPostForm);

export default APostForm;
