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
    Popconfirm,
    DatePicker,
    Rate
} from "antd";
import EPForm from "./EditProduct";
import ProductReviews from "./ProductReviews";
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
        discount: 0,
        showReview: false
    };

    componentDidMount() {
        this.getProducts();
    }

    getProducts() {
        axios.get("https://api.pulsespace.com/myproducts").then(res => {
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

        axios.delete("https://api.pulsespace.com/products/" + record.id);
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
        if (event.target.value > 0 && event.target.value < 90) {
            this.setState({ discount: event.target.value });
        } else {
            message.error(
                "Discount value muust be greater than 0 and less than 90"
            );
        }
    };
    handleDiscount = () => {
        if (this.state.discount > 0 && this.state.discount < 90) {
            var disc = {
                products: this.state.selectedRowKeys,
                percent: this.state.discount,
                sale_ends_at: this.state.end_date
            };
            console.log("Discount data to be sent to api will be: ", disc);

            axios
                .post("https://api.pulsespace.com/products/discount", disc)
                .then(res => {
                    console.log("Discounts Added");
                    message.success("discount added successfully");
                });
        } else {
            message.error(
                "Discount value muust be greater than 0 and less than 90"
            );
        }
    };
    handleReviews = (event, record) => {
        this.setState({ reviews: record.reviews }, () => {
            this.setState({ showReview: true });
        });
        console.log("record is", record);
    };
    handleReviewOk = () => {
        this.setState({ showReview: false });
    };
    onChangeDate = (date, dateString) => {
        console.log(
            "Date is ",
            date.format("MMMM Do YYYY, h:mm:ss a"),
            " Date String is ",
            dateString
        );
        this.setState({ end_date: date.format("YYYY-MM-DD hh:mm:ss") });
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
                dataIndex: "attachments",
                key: "picture",
                render: attachments => (
                    <img
                        src={attachments[0].url}
                        style={{ width: 50, height: 50 }}
                    />
                )
            },
            {
                title: "Actual Price",
                dataIndex: "price",
                key: "price",
                defaultSortOrder: "descend",
                sorter: (a, b) => a.price - b.price
            },
            {
                title: "Discounted Price",
                dataIndex: "sale_price",
                key: "sale_price",
                defaultSortOrder: "descend",
                sorter: (a, b) => a.price - b.price
            },
            {
                title: "Discount Started at",
                dataIndex: "sale_starts_at",
                key: "starts_at"
            },
            {
                title: "Discount Ends at",
                dataIndex: "sale_ends_at",
                key: "ends_at"
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
                title: "Average Rating",
                dataIndex: "avg_rating",
                key: "rating",
                render: (avg_rating, record) => (
                    <a
                        href="javascript:;"
                        onClick={event => this.handleReviews(event, record)}
                    >
                        {avg_rating}
                    </a>
                )
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
            <Col
                xs={{ offset: 6, span: 18 }}
                sm={{ offset: 6, span: 18 }}
                md={{ offset: 6, span: 18 }}
                lg={{ offset: 6, span: 18 }}
                xl={{ offset: 3, span: 20 }}
                style={{ backgroundColor: "#FFFFFF" }}
            >
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
                        <DatePicker
                            onChange={this.onChangeDate}
                            disabled={!isdiscount}
                        />
                    </span>
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
                    style={{ overflow: "auto" }}
                >
                    <EPForm
                        record={this.state.erecord}
                        handleOk={this.handleOk}
                    />
                </Modal>

                <Modal
                    title="Product reviews"
                    visible={this.state.showReview}
                    onOk={event => this.handleReviewOk(event)}
                    onCancel={this.handleReviewOk}
                    destroyOnClose={true}
                    maskClosable={true}
                    footer={null}
                    style={{ overflow: "auto" }}
                >
                    <ProductReviews reviews={this.state.reviews} />
                </Modal>
            </Col>
        );
    }
}

export default ViewProducts;
