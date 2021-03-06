import React, { Component } from "react";
import { Icon, message, Button, Form, Input, Upload, Select } from "antd";
import axios from "axios";

const { TextArea } = Input;
const Option = Select.Option;

class EditProduct extends Component {
    constructor(props) {
        super(props);

        this.state.record = this.props.record;
        this.state.attachments = this.props.record.attachments;
    }
    state = {
        attachments: [],
        categories: [],
        record: {}
    };

    componentDidMount() {
        axios.get("https://api.pulsespace.com/categories").then(res => {
            const data = res.data;
            console.log(data);
            this.setState({ categories: data });
        });

        console.log(
            "the product data received by edit product form is",
            this.state.record
        );
    }

    handleUpload = event => {
        // if (event.file.status !== "uploading") {
        // console.log(event.file);
        this.setState({ attachments: event.fileList });
        console.log("handling  upload");
        // }
    };

    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.category_name = this.props.record.category_name;

                console.log(
                    "Received values of form after adding attachments: ",
                    values
                );
                values.attachments = this.state.attachments;

                axios
                    .post(
                        "https://api.pulsespace.com/products/" +
                            this.state.record.id,
                        values
                    )
                    .then(res => {
                        const data = res.data;
                        console.log(
                            "response from server after editing product",
                            data
                        );
                        this.props.handleOk();
                        message.success("DONE");
                    })
                    .catch(res => {
                        console.log(res);
                        console.log(values);
                    });
            }
        });
    };

    render() {
        const {
            getFieldDecorator,
            getFieldsError,
            getFieldError,
            isFieldTouched
        } = this.props.form;

        // Only show error after a field is touched.
        const productNameError =
            isFieldTouched("name") && getFieldError("name");
        const descriptionError =
            isFieldTouched("description") && getFieldError("description");
        const pictureError =
            isFieldTouched("attachments") && getFieldError("attachments");
        const categoryError =
            isFieldTouched("category_id") && getFieldError("category_id");
        const priceError = isFieldTouched("price") && getFieldError("price");
        return (
            <Form onSubmit={this.handleSubmit}>
                <div style={{ margin: "0%" }}>
                    <h3>Title:</h3>
                </div>
                <Form.Item
                    validateStatus={productNameError ? "error" : ""}
                    help={productNameError || ""}
                >
                    {getFieldDecorator("name", {
                        initialValue: this.state.record.name
                            ? this.state.record.name
                            : "",
                        rules: [
                            {
                                required: true,
                                message: "Please input your username!"
                            }
                        ]
                    })(<Input placeholder="Enter Product title/name" />)}
                </Form.Item>
                <div style={{ margin: "0%" }}>
                    <h3>Price:</h3>
                </div>
                <Form.Item
                    validateStatus={priceError ? "error" : ""}
                    help={priceError || ""}
                >
                    {getFieldDecorator("price", {
                        initialValue: this.state.record.price
                            ? this.state.record.price
                            : "",
                        rules: [
                            {
                                required: true,
                                message: "Please input your Product Price!"
                            }
                        ]
                    })(
                        <Input
                            addonBefore="RS"
                            type="number"
                            style={{ width: "35%" }}
                            placeholder="Price"
                        />
                    )}
                </Form.Item>
                <div style={{ margin: "0%" }}>
                    <h3>Description:</h3>
                </div>
                <Form.Item
                    validateStatus={descriptionError ? "error" : ""}
                    help={descriptionError || ""}
                >
                    {getFieldDecorator("description", {
                        initialValue: this.state.record.description
                            ? this.state.record.description
                            : "",

                        rules: [
                            {
                                required: true,
                                message:
                                    "Please input your Product Description!"
                            }
                        ]
                    })(
                        <TextArea
                            placeholder="Write complete product Description"
                            autosize={{ minRows: 3, maxRows: 6 }}
                        />
                    )}
                </Form.Item>

                <div>
                    <h3>Upload Pictures</h3>
                </div>

                <Form.Item
                    validateStatus={pictureError ? "error" : ""}
                    help={pictureError || ""}
                >
                    {getFieldDecorator("attachments", {
                        initialValue: this.state.record.attachments,

                        rules: [
                            {
                                required: true,
                                message: "Must Upload Picture"
                            }
                        ]
                    })(
                        <Upload
                            action="https://api.pulsespace.com/attachment/products"
                            onChange={this.handleUpload}
                            listType="picture"
                            name="image"
                            fileList={this.state.attachments}
                        >
                            <Button>
                                <Icon type="upload" /> Upload
                            </Button>
                        </Upload>
                    )}
                </Form.Item>

                {/* <Form.Item
                    validateStatus={categoryError ? "error" : ""}
                    help={categoryError || ""}
                >
                    <h2>Select category</h2>

                    {getFieldDecorator("category_id", {
                        initialValue: this.state.record.category_id
                            ? this.state.record.category_id
                            : "",

                        rules: [
                            {
                                required: true,
                                message: "Please input your Product Category!"
                            }
                        ]
                    })(
                        <Select
                            placeholder="Select Category"
                            style={{ width: 320 }}
                            // onChange={handleChangeCategory}
                        >
                            {this.state.categories.map(element => (
                                <Option value={element.id}>
                                    {element.name}
                                </Option>
                            ))}
                        </Select>
                    )}
                </Form.Item> */}

                <Form.Item>
                    {" "}
                    <div style={{ marginLeft: "60%" }}>
                        <Button
                            type={"primary"}
                            htmlType="submit"
                            size={"large"}
                            icon={"check"}
                        >
                            Done
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        );
    }
}
const EPForm = Form.create({ name: "Edit_Product_Form" })(EditProduct);

export default EPForm;
