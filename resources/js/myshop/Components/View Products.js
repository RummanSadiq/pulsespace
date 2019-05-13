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
    Modal,
    Popconfirm
} from "antd";
import EPForm from "./EditProduct";
import { Link } from "react-router-dom";
import axios from "axios";
import { element } from "prop-types";

const { TextArea } = Input;
const Option = Select.Option;

class ViewProducts extends Component {
    state = {
        products: [],
        visible: false,
        erecord: {},
        show: false,
        categories: [],
        selectedRowKeys: [],
        discount: 0
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
    onSelectChange = selectedRowKeys => {
        console.log("selectedRowKeys changed: ", selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    discountChange = event => {
        console.log("event target value is", event.target.value);
        this.setState({ discount: event.target.value });
    };
    handleDiscount = () => {
        var disc = {
            products: this.state.selectedRowKeys,
            percent: this.state.discount
        };
        console.log("Discount data to be sent to api will be: ", disc);
    };
    render() {
        const columns = [
            // {
            //     title: "ID",
            //     dataIndex: "id",
            //     key: "id"
            // },
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
                key: "price",
                defaultSortOrder: "descend",
                sorter: (a, b) => a.price - b.price
            },
            {
                title: "Category",
                dataIndex: "category_name",
                key: "category",
                filters: [
                    { text: "category one", value: "category one" },
                    {
                        text: "category two",
                        value: "category two"
                    }
                    // this.state.categories.map(element=>{
                    //     text=element.name,
                    //     value=element.name

                    // })
                ],
                filterMultiple: true,
                onFilter: (value, record) => record.address.indexOf(value) === 0
                // sorter: (a, b) => a.address.length - b.address.length
                // sortDirections: ["descend", "ascend"]
            },
            {
                title: "Action",
                dataIndex: "id",
                key: "actions",
                render: (text, record) => (
                    <div>
                        <Popconfirm
                            title="Are you sure delete this product?"
                            onConfirm={event =>
                                this.handleDelete(event, record)
                            }
                            onCancel={this.popCancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                type="danger"
                                icon="delete"
                                style={{ margin: 10 }}
                            />
                        </Popconfirm>
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
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };
        const hasSelected = selectedRowKeys.length > 0;
        const isdiscount = this.state.discount > 0;
        return (
                <Col   xs={{ offset: 6, span: 18 }}
                sm={{ offset: 6, span: 18 }}
                md={{ offset: 6, span: 18 }}
                lg={{ offset: 6, span: 18 }}
                xl={{ offset: 3, span: 20 }} style={{backgroundColor:'#FFFFFF'}}>
                    <div>
                        <h1 style={{ textAlign: "center" }}>
                            These are all the products you have listed.
                        </h1>
                    </div>
                    <div>
                        <Input
                            type="number"
                            placeholder="%"
                            onChange={this.discountChange}
                            disabled={!hasSelected}
                            style={{ width: 200 }}
                        />
                        <span style={{ marginLeft: 8 }}>
                            <Button
                                type="primary"
                                onClick={this.handleDiscount}
                                disabled={!isdiscount}
                                // loading={loading}
                            >
                                Create Discount
                            </Button>{" "}
                        </span>

                        <span style={{ marginLeft: 8 }}>
                            {hasSelected
                                ? `Selected ${selectedRowKeys.length} items`
                                : ""}
                        </span>
                    </div>
                    <Table
                        bordered={true}
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={this.state.products}
                        style={{ backgroundColor: "white" }}
                        rowKey={record => record.id}
                    />

                    <Modal
                        title="Edit Product"
                        visible={this.state.show}
                        onOk={event => this.handleOk(event)}
                        onCancel={this.handleCancel}
                        destroyOnClose={true}
                        footer={null}
                        style={{overflow:'auto'}}
                    >
                        <EPForm
                            record={this.state.erecord}
                            handleOk={this.handleOk}
                        />
                    </Modal>
                </Col>
        );
    }
}

export default ViewProducts;
