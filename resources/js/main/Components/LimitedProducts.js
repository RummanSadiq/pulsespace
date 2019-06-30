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
class Products extends Component {
    constructor(props) {
        super(props);
        this.state.products = this.props.products;
        this.state.title = this.props.title;
        this.state.size = this.props.size;
    }
    state = {
        // products: [],
        redirect: false,
        followed:[]
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
        console.log("received props are", this.props.products);
        this.getFollowed();
    }

    getFollowed() {
        axios.get("https://api.pulsespace.com/shoppinglist").then(res => {
            const followedData = res.data;
            console.log("shoppinglist data is", followedData);
            // if (res.data.length>0){
                this.setState({ followed: followedData });
            // }
            
        });
    }
    handleFollow(id) {
        if (this.checkFollow(id)){
            axios.post("https://api.pulsespace.com/shoppinglist/remove/" + id)
            .then(res => {
                // message.success("following store");
                this.getFollowed();
                this.getStores();
            })
            .catch(err => {
                console.log(
                    "Error occured, cannot make api call to add product to list",
                    err
                );
                message.error("please login");
            });
        }
        else{
           axios.post("https://api.pulsespace.com/shoppinglist/add/" + id)
            .then(res => {
                // message.success("following store");
                this.getFollowed();
                this.getStores();
            })
            .catch(err => {
                console.log(
                    "Error occured, cannot make api call to add product to list",
                    err
                );
                message.error("please login");
            }); 
        }
        
    }

    checkFollow(id) {

        if (this.state.followed.length>0) {
            console.log("productlist found");
            const result = this.state.followed.find(
                element => element.shop_id === id
            );
            console.log('Result of find is', result);
            if (result) {
                console.log("returning true result is", result);
                return true;
            }
        }
        return false;
        
    }
    render() {
        return (
            <div>
                <Card
                    title={<h2>{this.state.title}</h2>}
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
                            pageSize: this.state.size
                        }}
                        dataSource={this.props.products}
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
                                                        // padding: "5%"
                                                    }}
                                                />
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
                                                        this.handleFollow(
                                                            element.id
                                                        )
                                                    }
                                                >
                                                    {this.checkFollow(element.id) ? "Removes":"Add to list"}
                                                    {/* {this.checkFollow(
                                                        element.id
                                                    ) && "Add to List"}
                                                    {!this.checkFollow(
                                                        element.id
                                                    ) && "Remove from List"} */}
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

export default Products;
