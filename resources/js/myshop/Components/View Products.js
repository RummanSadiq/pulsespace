import React, { Component } from "react";
import {
    Col,
    Card,
    Row,
    Icon,
    message,
    Table,
    Tag,
    Divider,
    Button,
    Form,
    Input,
    Upload,
    Select,
    Modal
} from "antd";
import EPForm from "./EditProduct";
import { Link } from "react-router-dom";
import axios from "axios";

const { TextArea } = Input;
const Option = Select.Option;

class ViewProducts extends Component {
    state = {
        products: [],
        visible: false,
        erecord: {},
        show: false
    };

    componentDidMount() {
        this.getProducts();
    }

    getProducts() {
        axios.get("/api/products").then(res => {
            const productsData = res.data;
            console.log(productsData);
            this.setState({ products: productsData });
        });
    }

    handleDelete(event, record) {
        console.log("Deleting");
        //Prodcut Info
        console.log("ID: " + record.id);
        console.log("Name: " + record.name);
        console.log("Description: " + record.description);
        console.log("Price: " + record.price);
        console.log("Category: " + record.category);

        axios.delete("api/products/" + record.id);
        this.getProducts();
    }

    handleEdit(event, record) {
        console.log("Handling Edit");
        this.setState({ erecord: record, show: true }, function() {
            console.log("ERECORD IS:", this.state.erecord);
        });

        console.log(record);
    }

    handleCancel = () => {
        this.setState({ show: false });
    };

    handleOk = event => {
        this.setState({ show: false });
        console.log("handeling ok!");
        this.getProducts();
    };

    render() {
        const columns = [
            {
                title: "ID",
                dataIndex: "id",
                key: "id"
            },
            {
                title: "Name",
                dataIndex: "name",
                key: "name",
                render: text => <a href="javascript:;">{text}</a>
            },
            {
                title: "Description",
                dataIndex: "description",
                key: "description"
            },
            {
                title: "Picture",
                dataIndex: "display_picture",
                key: "picture",
                render: Image => (
                    <img src={Image} style={{ width: 50, height: 50 }} />
                )
            },
            {
                title: "Price",
                dataIndex: "price",
                key: "price"
            },
            {
                title: "Category",
                dataIndex: "category_name",
                key: "category"
            },
            {
                title: "Action",
                dataIndex: "id",
                key: "actions",
                render: (text, record) => (
                    <div>
                        <Button
                            type="danger"
                            icon="delete"
                            onClick={event => this.handleDelete(event, record)}
                            style={{ margin: 10 }}
                        />
                        <Button
                            icon="edit"
                            onClick={event => this.handleEdit(event, record)}
                        />
                    </div>
                )
            },
            {
                title: "Rating/Reviews",
                dataIndex: "category",
                key: "rating"
            }
        ];
        return (
            <div>
                <Col span={14} offset={6}>
                    <div>
                        <h1 style={{ textAlign: "center" }}>
                            These are all the products you have listed.
                        </h1>
                    </div>
                    <Table columns={columns} dataSource={this.state.products} />

                    <Modal
                        title="Edit a Question"
                        visible={this.state.show}
                        onOk={event => this.handleOk(event)}
                        onCancel={this.handleCancel}
                        destroyOnClose={true}
                        footer={null}
                    >
                        <EPForm
                            record={this.state.erecord}
                            handleOk={this.handleOk}
                        />
                    </Modal>
                </Col>
            </div>
        );
    }
}

export default ViewProducts;
