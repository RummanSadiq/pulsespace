import React, { Component } from "react";
import {
    Col,
    Input,
    Button,
    Upload,
    Card,
    Icon,
    Select,
    Form,
    Row,
    message
} from "antd";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import axios from "axios";

const { TextArea } = Input;
const Option = Select.Option;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class AddProductForm extends React.Component {
    state = {
        image_path: "",
        categories: [],
        goToPosts: false,
        goToProducts: false
    };

    componentDidMount() {
        axios.get("/api/categories").then(res => {
            const data = res.data;
            console.log(data);
            this.setState({ categories: data });
        });
    }

    handleUpload = event => {
        if (event.file.status !== "uploading") {
            console.log(event.file);
            this.setState({ image_path: event.file.response.url });
        }
    };

    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.display_picture = this.state.image_path;
                console.log("Received values of form: ", values);

                axios.post("/api/products", values).then(res => {
                    const data = res.data;
                    console.log(data);
                });

                axios.post("/api/product_post", values).then(res => {
                    const data = res.data;
                    console.log(data);
                    message.success("Product Added");

                    this.setState({ goToProducts: true });
                });
                this.props.form.resetFields();
            } else {
                message.error("Error processing request");
            }
        });
    };

    render() {
        if (this.state.goToProducts) return <Redirect to="/ViewProduct" />;

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
            isFieldTouched("display_picture") &&
            getFieldError("display_picture");
        const categoryError =
            isFieldTouched("category_id") && getFieldError("category_id");
        const priceError = isFieldTouched("price") && getFieldError("price");
        return (
            <Col span={12} offset={6}>
                <Card
                    title={
                        <h1 style={{ textAlign: "center" }}>Add a Product</h1>
                    }
                >
                    <Form onSubmit={this.handleSubmit}>
                        <div style={{ margin: "0%" }}>
                            <h3>Title:</h3>
                        </div>
                        <Form.Item
                        // validateStatus={productNameError ? "error" : ""}
                        // help={productNameError || ""}
                        >
                            {getFieldDecorator("name", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please input your username!"
                                    }
                                ]
                            })(
                                <Input placeholder="Enter Product title/name" />
                            )}
                        </Form.Item>
                        <div style={{ margin: "0%" }}>
                            <h3>Price:</h3>
                        </div>

                        <Form.Item
                        // validateStatus={priceError ? "error" : ""}
                        // help={descriptionError || ""}
                        >
                            {getFieldDecorator("price", {
                                rules: [
                                    {
                                        required: true,
                                        message:
                                            "Please input your Product Price!"
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
                        // validateStatus={descriptionError ? "error" : ""}
                        // help={descriptionError || ""}
                        >
                            {getFieldDecorator("description", {
                                rules: [
                                    {
                                        required: true,
                                        message:
                                            "Please input your Product Description!"
                                    }
                                ]
                            })(
                                <TextArea
                                // placeholder="Write complete product Description"
                                // autosize={{ minRows: 3, maxRows: 6 }}
                                />
                            )}
                        </Form.Item>

                        <div style={{ margin: "0%" }}>
                            <h3>Upload Pictures</h3>
                        </div>
                        <Form.Item
                        // validateStatus={pictureError ? "error" : ""}
                        // help={pictureError || ""}
                        >
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

                        <Form.Item
                        // validateStatus={categoryError ? "Please select Category" : ""}
                        // help={categoryError || ""}
                        >
                            <h2>Select category</h2>

                            {getFieldDecorator("category_id", {
                                rules: [
                                    {
                                        required: true,
                                        message:
                                            "Please input your Product Description!"
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
                        </Form.Item>

                        <Form.Item>
                            <div style={{ marginLeft: "90%", marginTop: "2%" }}>
                                <Button
                                    type={"primary"}
                                    htmlType="submit"
                                    size={"large"}
                                    icon={"check"}
                                    disabled={hasErrors(getFieldsError())}
                                >
                                    Done
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        );
    }
}
const APForm = Form.create({ name: "Add_Product_Form" })(AddProductForm);

export default APForm;
