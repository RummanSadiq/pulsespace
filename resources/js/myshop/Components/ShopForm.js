import React, { Component } from "react";
import moment from "moment";
import {
    Col,
    Row,
    Button,
    Form,
    Select,
    message,
    Input,
    TimePicker,
    Upload
} from "antd";
import axios from "axios";

const Option = Select.Option;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class ShopForm extends React.Component {
    constructor(props) {
        super(props);
        this.state.store = this.props.store;
    }
    state = {
        store_types: [],
        image: [],
        store: {}
    };

    componentDidMount() {
        axios.get("/api/storetypes").then(res => {
            const storedata = res.data;
            console.log("store types are", storedata);
            this.setState({ store_types: storedata });
        });

        console.log("STORE values inside form are", this.state.store);
    }

    handleUpload = event => {
        if (event.file.status !== "uploading") {
            this.setState({ image: event.fileList });
            console.log(event.fileList);
        }
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);

                if (this.state.store.StoreName !== null) {
                    console.log("storename");

                    values.attachments = this.state.image;

                    values.open_time = moment
                        .utc(values.open_time)
                        .format("HH:mm:ss");

                    values.close_time = moment
                        .utc(values.close_time)
                        .format("HH:mm:ss");

                    axios
                        .post("/api/updateshop", values)
                        .then(res => {
                            console.log(res);
                            message.success("Shop Updated!");
                        })
                        .catch(function(error) {
                            console.log("This is the error happening", error);
                            console.log(values);
                            message.error(
                                "Error occurred, inside catch",
                                error
                            );
                        });

                    this.props.changeState();
                } else {
                    console.log(
                        "No storename add api call here to create store"
                    );
                }
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
        return (
            <Col>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item label="Store Type:">
                        {getFieldDecorator("store_type_id", {
                            initialValue: this.state.store.store_type_id,

                            rules: [
                                {
                                    required: true,
                                    message: "Please input your store type!"
                                }
                            ]
                        })(
                            <Select
                                placeholder="Select Type of store"
                                style={{ width: 320 }}
                            >
                                {this.state.store_types.map(element => (
                                    <Option value={element.id} key={element.id}>
                                        {element.name}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    </Form.Item>
                    <div style={{ marginTop: "2%" }} />
                    <Form.Item label="Store Name:">
                        {getFieldDecorator("name", {
                            initialValue: this.state.store.name,

                            rules: [
                                {
                                    required: true,
                                    message: "Please input your Store Name"
                                }
                            ]
                        })(<Input placeholder="Store Name" />)}
                    </Form.Item>

                    <Form.Item label="Store Picture:">
                        {getFieldDecorator("attachments", {
                            initialValue: this.state.store.attachments,

                            rules: [
                                {
                                    required: true,
                                    message: "Please input your Store picture"
                                }
                            ]
                        })(
                            <Upload
                                action="/api/attachment/profile/"
                                onChange={this.handleUpload}
                                listType="picture"
                                name="image"
                                defaultFileList={this.state.store.attachments}
                            >
                                <Button icon="upload">Upload File</Button>
                            </Upload>
                        )}
                    </Form.Item>

                    <Row>
                        <Col span={12}>
                            <Form.Item label="Opens at:">
                                {getFieldDecorator("open_time", {
                                    initialValue: moment(
                                        this.state.store.open_time,

                                        "HH:mm:ss "
                                    ),

                                    rules: [
                                        {
                                            required: true,
                                            message: "Store opens at"
                                        }
                                    ]
                                })(
                                    <TimePicker
                                        use12Hours
                                        format="h:mm a"
                                        placeholder="Opening Time"
                                    />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Closes at:">
                                {getFieldDecorator("close_time", {
                                    initialValue: moment(
                                        this.state.store.close_time,

                                        "HH:mm:ss"
                                    ),
                                    rules: [
                                        {
                                            required: true,
                                            message: "Store closes at"
                                        }
                                    ]
                                })(
                                    <TimePicker
                                        use12Hours
                                        format="h:mm a"
                                        placeholder="Closing Time"
                                    />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="Contact#">
                        {getFieldDecorator("contact", {
                            initialValue: this.state.store.contact,

                            rules: [
                                {
                                    required: true,
                                    message:
                                        "Please input your Store Contact number"
                                }
                            ]
                        })(<Input placeholder="Contact" type="phone" />)}
                    </Form.Item>
                    <Form.Item label="Accepts Card?">
                        {getFieldDecorator("card_payment", {
                            initialValue: this.state.store.card_payment,

                            placeholder: "Store accepts credit card? ",
                            rules: [
                                {
                                    required: true,
                                    message: "Store accepts credit card?"
                                }
                            ]
                        })(
                            <Select placeholder="Store accepts credit card?">
                                <Option value={1}>Yes</Option>
                                <Option value={0}>No</Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="Has Wifi?">
                        {getFieldDecorator("wifi", {
                            initialValue: this.state.store.wifi,

                            rules: [
                                {
                                    required: true,
                                    message: "Store has wifi?"
                                }
                            ]
                        })(
                            <Select placeholder="Store has wifi?">
                                <Option value={1}>Yes</Option>
                                <Option value={0}>No</Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="Provides Delivery?">
                        {getFieldDecorator("delivery", {
                            initialValue: this.state.store.delivery,

                            rules: [
                                {
                                    required: true,
                                    message: "Store provides Delivery?"
                                }
                            ]
                        })(
                            <Select placeholder="Store provides Delivery?">
                                <Option value={1}>Yes</Option>
                                <Option value={0}>No</Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="Address:">
                        {getFieldDecorator("address", {
                            initialValue: this.state.store.address,

                            rules: [
                                { required: true, message: "Store address" }
                            ]
                        })(<Input placeholder="Store address" />)}
                    </Form.Item>
                    <Form.Item>
                        {" "}
                        <div style={{ marginLeft: "70%", marginTop: "2%" }}>
                            <Button
                                type={"primary"}
                                htmlType="submit"
                                size={"large"}
                                icon={"check"}
                                disabled={hasErrors(getFieldsError())}
                            >
                                Submit
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Col>
        );
    }
}

const SHForm = Form.create({ name: "Shop_Form" })(ShopForm);

export default SHForm;
