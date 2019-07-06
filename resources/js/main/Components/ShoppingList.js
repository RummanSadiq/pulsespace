import React, { Component } from "react";
import {
    Row,
    Col,
    Card,
    Button,
    Carousel,
    List,
    message,
    Badge,
    Avatar,
    Icon,
    Skeleton
} from "antd";
import axios from 'axios';
import { NavLink, Route, Redirect } from "react-router-dom";
const { Meta } = Card;
class ShoppingList extends Component {
    constructor(props) {
        super(props);
      
    }
    state = {
        products: [],
        redirect: false,
        list:[]
    };
    renderRedirect = id => {
        if (this.state.redirect) {
            return <Redirect to={"/product/" + id} />;
        }
    };
    setRedirect = () => {
        this.setState({
            redirect: true
        });
    };
    componentDidMount() {
        this.getList();
    }

    getList() {
        axios.get("https://api.pulsespace.com/shoppinglist").then(res => {
            console.log("shoppinglist data is", res.data);
                this.setState({ list: res.data });            
        });
    }
    handleList(id) {
        
            axios.post("https://api.pulsespace.com/shoppinglist/toggle/" + id)
            .then(res => {
                // message.success("following store");
                this.getList();
            })
            .catch(err => {
                console.log(
                    "Error occured, cannot make api call to add product to list",
                    err
                );
                message.error("Trouble performing action");
            });
        
    }

    checkList(id) {

        if (this.state.list.length>0) {
            console.log("productlist found");
            const result = this.state.list.find(
                element => element.shop_id === id
            );
            console.log('Result of find is', result);
            if (result) {
                console.log("returning true result is", result);
                return true;
            }else return false;
        }
        else return false;
    }
    render() {
        return (
            <div>
                <Card
                    title={<h2>List</h2>}
                    // extra={
                    //     <div>
                    //         {this.props.all && <Button icon="plus">All</Button>}
                    //     </div>
                    // }
                    bordered={false}
                    style={{ background: "#ECECEC", textAlign: "center" }}
                >
                    <List
                        grid={{
                            gutter: 18,
                            column: 6,
                            xs: 1,
                            sm: 2,
                            md: 2,
                            lg: 3,
                            xl: 3,
                            xxl: 4
                        }}
                        pagination={{
                            onChange: page => {
                                console.log(page);
                            },
                            pageSize:10
                        }}
                        dataSource={this.state.list}
                        renderItem={element => (
                            <List.Item>
                                <Card
                                    hoverable
                                    cover={
                                        <div>
                                            <NavLink
                                                to={"/product/" + element.id}
                                            >
                                            {/* <a href={"product/" + element.id}> */}
                                                {element.attachments &&
                                                <img
                                                    alt="example"
                                                    src={
                                                        element.attachments[0]
                                                            .url
                                                    }
                                                    // onClick={this.setRedirect}
                                                    style={{
                                                        width: 290,
                                                        height: 250
                                                    }}
                                                />}
                                            {/* </a> */}
                                            </NavLink>
                                        </div>
                                    }
                                    style={{
                                        background: "white"
                                        // width: 188,
                                        // height: 290,
                                        // padding: "5%"
                                    }}
                                >
                                    <Meta
                                        title={
                                            <div>
                                                <NavLink
                                                    to={"product/" + element.id}
                                                >
                                                    {element.name}
                                                </NavLink>
                                            </div>
                                        }
                                        description={element.category}
                                    />{" "}
                                    <List.Item.Meta
                                        title={
                                            <NavLink
                                                to={"store/" + element.shop_id}
                                            >
                                                {element.shop_name}
                                            </NavLink>
                                        }
                                        description={
                                            <div>
                                                <h3
                                                    style={{ color: "#F57224" }}
                                                >
                                                    {element.sale_price > 0 && (
                                                        <div>
                                                            {/* <Badge
      count={4}
      style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }}
    /> */}
                                                            Price Rs.{" "}
                                                            <strike
                                                                style={{
                                                                    color:
                                                                        "black"
                                                                }}
                                                            >
                                                                {element.price}
                                                            </strike>
                                                            {element.sale_price}
                                                            {/* <div>
                                                                Discounted Price
                                                                Rs.
                                                                {
                                                                    element.sale_price
                                                                }
                                                            </div> */}
                                                        </div>
                                                    )}
                                                    {!element.sale_price >
                                                        0 && (
                                                        <div>
                                                            Rs.{element.price}
                                                        </div>
                                                    )}
                                                </h3>

                                                <Button
                                                    icon="shopping-cart"
                                                    block
                                                    style={{
                                                        backgroundColor:
                                                            "#F57224",
                                                        color: "white"
                                                    }}
                                                    onClick={() =>
                                                        this.handleList(
                                                            element.id
                                                        )
                                                    }
                                                >
                                                    {this.checkList(element.id) ? "Remove": "Add to list"}
                                                    {/* {this.checkList(
                                                        element.id
                                                    ) && "Remove from List"}
                                                    {!this.checkList(
                                                        element.id
                                                    ) && "Add to List"} */}
                                                </Button>
                                            </div>
                                        }
                                    />
                                </Card>
                            </List.Item>
                        )}
                    />
                </Card>
            </div>
        );
    }
}

export default ShoppingList;
