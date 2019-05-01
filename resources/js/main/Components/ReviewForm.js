import React, { Component } from "react";
import { Form, Icon, Input, Button, Rate, Upload } from "antd";

const { TextArea } = Input;
class ReviewForm extends Component {
    state = {};

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (this.props.item_id) {
                    values.item_id = this.props.item_id;
                }

                console.log("Received values of form: ", values);
                this.props.handleok();
            }
        });
    };
    handleUpload = event => {
        if (event.file.status !== "uploading") {
            console.log(event.file);
            this.setState({ image_path: event.file.response.url });
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
                        {getFieldDecorator("display_picture", {
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
                        })(<Rate allowHalf defaultValue={2.5} />)}
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
const AddReviewForm = Form.create({ name: "Review_Form" })(ReviewForm);

export default AddReviewForm;
