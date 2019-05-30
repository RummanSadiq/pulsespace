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
        this.props.getShops();
    }
    getFollowed() {
        Axios.get("https://api.pulsespace.com/followed").then(res => {
            const followedData = res.data;
            console.log("followed data is", followedData);
            this.setState({ followed: followedData });
        });
    }

    handleFollow(id) {
        Axios.get("https://api.pulsespace.com/follow/" + id)
            .then(res => {
                // message.success("following store");
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
                element => element.shop_id === id
            );
            if (result) {
                console.log("returning ture result is", result);
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
                                            <img
                                                src={element.attachments[0].url}
                                                alt="Store Image"
                                                width={'100%'}
                                                height={200}
                                            />
                                           
                                        </NavLink>
                                    }
                                >
                                    <Meta
                                        title={element.name}
                                        description={<div style={{color:'#72BEFC', marginBottom:'1%'}}>{element.contact}</div>}
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
