import React, { Component } from "react";
import {
    Row,
    Col,
    Card,
    Button,
    Carousel,
    List,
    Tabs,
    Icon,
    message,
    Skeleton
} from "antd";
import { NavLink } from "react-router-dom";
import Axios from "axios";
import store from "../Images/store.jpg";

const { Meta } = Card;
class Stores extends Component {
    constructor(props) {
        super(props);
        this.state.shops = this.props.shops;
        this.state.title = this.props.title;
        this.state.size = this.props.size;
    }
    state = {
        // shops: []
    };

    componentDidMount() {
        this.getStores();
        this.getFollowed();
    }
    getStores() {
        // Axios.get("/api/shops").then(res => {
        //     const shops = res.data;
        //     console.log("Shops are", shops);
        //     this.setState({ shops: shops });
        // });
        this.props.getShops();
    }
    getFollowed() {
        Axios.get("/api/followed").then(res => {
            const followedData = res.data;
            console.log("followed data is", followedData);
            this.setState({ followed: followedData });
        });
    }

    handleFollow(id) {
        Axios.get("/api/follow/" + id)
            .then(res => {
                message.success("following store");
                this.getFollowed();
                this.getStores();
            })
            .catch(err => {
                console.log(
                    "Error occured, cannot make api call to follow store",
                    err
                );
                message.error("please login");
            });
    }

    checkFollow(id) {
        if (this.state.followed) {
            console.log("followed found");
            const result = this.state.followed.find(
                element => element.store_id === id
            );
            if (result) {
                console.log("result is", result);
                return true;
            } else return false;
        }
        // else {
        //     message.error('please login');
        // }
    }
    render() {
        return (
            <div>
               
                    <Card
                        title={<h2>{this.state.title}</h2>}
                        extra={<Button icon="plus">All</Button>}
                        bordered={false}
                        style={{ background: "#ECECEC" }}
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
                            dataSource={this.state.shops}
                            renderItem={element => (
                                <List.Item>
                                    <Card
                                        hoverable
                                        cover={
                                            <NavLink to={"store/" + element.id}>
                                                <Carousel>
                                                    {this.state.shops
                                                        .attachments &&
                                                        this.state.store.attachments.map(
                                                            element => (
                                                                <div>
                                                                    <img
                                                                        src={
                                                                            element.url
                                                                        }
                                                                        alt="Store Image"
                                                                        height={
                                                                            350
                                                                        }
                                                                    />
                                                                </div>
                                                            )
                                                        )}
                                                </Carousel>
                                            </NavLink>
                                        }
                                        style={{ width: 240 }}
                                    >
                                        <Meta
                                            title={element.name}
                                            description={element.contact}
                                        />
                                        <List.Item.Meta
                                            description={
                                                <div>
                                                    <Button
                                                        icon="add"
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
                                                        {this.checkFollow(
                                                            element.id
                                                        ) && "Following"}
                                                        {!this.checkFollow(
                                                            element.id
                                                        ) && "Follow"}
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

export default Stores;
