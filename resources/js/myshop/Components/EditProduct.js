import React, { Component } from "react";
import { Icon, message, Button, Form, Input, Upload, Select } from "antd";
import axios from "axios";

const { TextArea } = Input;
const Option = Select.Option;

class EditProduct extends Component {
    constructor(props) {
        super(props);

        this.state.record = this.props.record;
        this.state.fileList = [
            {
                uid: "-1",
                name: "Current Picture",
                status: "done",
                url: this.state.record.display_picture
            }
        ];
    }
    state = {
        image_path: "",
        categories: [],
        record: {},
        fileList: []
    };

    componentDidMount() {
        axios.get("/api/categories").then(res => {
            const data = res.data;
            console.log(data);
            this.setState({ categories: data });
        });

        console.log("received props are", this.state.record);
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
                if (this.state.image_path !== "") {
                    values["display_picture"] = this.state.image_path;
                    console.log("Rumman");
                } else {
                    values[
                        "display_picture"
                    ] = this.state.record.display_picture;
                    console.log("Sadiq");
                }

                console.log("Received values of form: ", values);

                message.success("DONE");

                axios
                    .post("api/products/" + this.state.record.id, values)
                    .then(res => {
                        const data = res.data;
                        console.log(data);
                        this.props.handleOk();
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
            isFieldTouched("display_picture") &&
            getFieldError("display_picture");
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
                    {getFieldDecorator("display_picture", {
                        initialValue: this.state.record.display_picture,

                        rules: [
                            {
                                required: true,
                                message: "Must Upload Picture"
                            }
                        ]
                    })(
                        <Upload
                            action="/api/attachment/products"
                            onChange={this.handleUpload}
                            listType="picture"
                            name="image"
                            fileList={this.state.fileList}
                        >
                            <Button>
                                <Icon type="upload" /> Upload
                            </Button>
                        </Upload>
                    )}
                </Form.Item>

                <Form.Item
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
                </Form.Item>

                <Form.Item>
                    {" "}
                    <div style={{ marginLeft: "60%", marginTop: "2%" }}>
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
