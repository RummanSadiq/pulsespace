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
    Upload,
    Card
} from "antd";
import { Redirect } from "react-router-dom";
import axios from "axios";

const Option = Select.Option;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class CreateShopForm extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        store_types: [],
        image: [],
        store: {},
        redirect: false
    };

    componentDidMount() {
        axios.get("https://api.pulsespace.com/shoptypes").then(res => {
            const storedata = res.data;
            this.setState({ store_types: storedata });
        });
        this.getLocation();
    }
    handleUpload = event => {
        if (event.file.status !== "uploading") {
            this.setState({ image: event.fileList });
        }
    };

    getLocation = () => {
        const location = window.navigator && window.navigator.geolocation;

        if (location) {
            location.getCurrentPosition(
                position => {
                    console.log(
                        "Latitude is " +
                            position.coords.latitude +
                            "    Longitude is " +
                            position.coords.longitude
                    );
                    this.setState({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                error => {
                    // this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
                    console.log("Error getting lat long inside search", error);
                }
            );
        }
    };
    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);

                if (this.state.image != null) {
                    values.attachments = this.state.image;
                }

                values.open_at = moment.utc(values.open_at).format("HH:mm:ss");

                values.close_at = moment
                    .utc(values.close_at)
                    .format("HH:mm:ss");

                values.latitude = this.state.latitude;
                values.longitude = this.state.longitude;

                axios
                    .post("https://api.pulsespace.com/shop", values)
                    .then(res => {
                        console.log(res);
                        message.success("Shop Updated!");

                        this.props.lift();
                        // this.setRedirect();
                    })
                    .catch(function(error) {
                        throw error;
                        console.log(error);
                        console.log(values);
                        message.error(
                            "Error sending data to database, please confirm inputs"
                        );
                    });
            } else {
                console.log("Errors", err);
                message.error("Error while adding store information");
            }
        });
    };

    setRedirect = () => {
        console.log("Here to set redirect state to true");
        this.setState({
            redirect: true
        });
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to="/Shop" />;
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
            <div>
                {/* {this.renderRedirect()} */}
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item label="Shop Type:">
                        {getFieldDecorator("shop_type_id", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input your shop type!"
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
                    <Form.Item label="Store Name:">
                        {getFieldDecorator("name", {
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
                            rules: [
                                {
                                    required: true,
                                    message: "Please input your Store picture"
                                }
                            ]
                        })(
                            <Upload
                                action="https://api.pulsespace.com/attachment/profile"
                                onChange={this.handleUpload}
                                listType="picture"
                                name="image"
                            >
                                <Button icon="upload">Upload File</Button>
                            </Upload>
                        )}
                    </Form.Item>

                    <Row>
                        <Col span={12}>
                            <Form.Item label="Opens at:">
                                {getFieldDecorator("open_at", {
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
                                {getFieldDecorator("close_at", {
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

                    {/* <Row>
                        <Col span={12}>
                            <Form.Item label="Lat:">
                                {getFieldDecorator("Latitude", {
                                    rules: [
                                        {
                                            initialValue: this.state.latitude,
                                            required: true,
                                            message: "latitude required, please enable location"
                                        }
                                    ]
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Longitude:">
                                {getFieldDecorator("longitude", {
                                    rules: [
                                        {
                                            initialValue: this.state.longitude,
                                            required: true,
                                            message: "longitude required, please enable location"
                                        }
                                    ]
                                })(
                                    <Input/>

                                )}
                            </Form.Item>
                        </Col>
                    </Row> */}
                    <Form.Item label="Contact#">
                        {getFieldDecorator("contact", {
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
                            rules: [
                                { required: true, message: "Store address" }
                            ]
                        })(<Input placeholder="Store address" />)}
                    </Form.Item>
                    <Form.Item>
                        {" "}
                        <div style={{ marginLeft: "70%" }}>
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
                </Form>{" "}
            </div>
        );
    }
}

const SCForm = Form.create({ name: "Shop_Create_Form" })(CreateShopForm);

export default SCForm;
