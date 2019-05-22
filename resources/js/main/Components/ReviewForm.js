import React, { Component } from "react";
import { Form, Icon, Input, Button, Rate, Upload } from "antd";
import axios from "axios";
const { TextArea } = Input;
class ReviewForm extends Component {
    state = {
        images: []
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (this.props.item_id) {
                    values.parent_id = this.props.item_id;
                }
                if (this.state.images) {
                    values.attachments = this.state.images;
                }

                axios
                    .post("/api/reviews/shops", values)
                    .then(response => {
                        console.log("review added", response);
                    })
                    .then(err => {
                        console.log("error occurred while adding review", err);
                    });

                console.log("Received values of form: ", values);
                this.props.handleok();
            }
        });
    };
    handleUpload = event => {
        if (event.file.status !== "uploading") {
            console.log(event.file);
            this.setState({ images: event.fileList });
        }
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator("description", {
                            rules: [
                                {
                                    required: true,
                                    message:
                                        "Please input your experience description!"
                                }
                            ]
                        })(<TextArea rows={5} placeholder="Description" />)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("attachments", {
                            rules: [
                                {
                                    required: true,
                                    message: "Must Upload Picture"
                                }
                            ]
                        })(
                            <Upload
                                action="/api/attachment/products/"
                                onChange={this.handleUpload}
                                listType="picture"
                                name="image"
                            >
                                <Button>
                                    <Icon type="upload" /> Upload
                                </Button>
                            </Upload>
                        )}
                    </Form.Item>

                    <Form.Item>
                        {getFieldDecorator("rating", {
                            rules: [
                                {
                                    required: true,
                                    message: "please inputing rating"
                                }
                            ]
                        })(<Rate allowHalf />)}
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            Done
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
const AddReviewForm = Form.create({ name: "Review_Form" })(ReviewForm);

export default AddReviewForm;
