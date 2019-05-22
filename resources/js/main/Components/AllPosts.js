import React, { Component } from "react";
import axios from "axios";
import { Row, Col, Card, Button, List, Avatar, Icon, Skeleton, Carousel } from "antd";

class AllPosts extends Component {
    constructor (props){
        super(props);
        this.state.posts=this.props.posts;
        this.state.title=this.props.title;
        // this.state.size = this.props.size;

    }
    state = {
        // posts: []
    };

    componentDidMount() {
       
    }
    render() {
        return (
            <div>
                {!this.state.posts && <Skeleton />}
                {this.state.posts && (
                    <Card
                        title={
                            <h2>{this.state.title}</h2>
                        }
                        extra={<Button icon="plus">All</Button>}
                        bordered={false}
                        style={{ background: "#ECECEC" }}
                    >
                        <List
                            itemLayout="vertical"
                            bordered
                            pagination={{
                                onChange: page => {
                                    console.log(page);
                                },
                                pageSize: 6
                            }}
                            dataSource={this.state.posts}
                            footer={
                                <div>
                                    <b>POSTS</b>
                                </div>
                            }
                            style={{ background: "#F5F5F5" }}
                            renderItem={element => (
                                <List.Item
                                    key={element.id}
                                    style={{ textAlign: "left" }}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                
                                            ><Icon type='shop' theme='twoTone'/></Avatar>
                                        }
                                        title={
                                            <a href={"store/" + element.id}>
                                                {" "}
                                                {element.shop.name}
                                            </a>
                                        }
                                        description={element.created_at}
                                    />

                                    <div style={{ marginLeft: "100" }}>
                                        <h4>{element.description}</h4>
                                    </div>

                                    <div style={{ marginTop: "20" }}>
                                    <Carousel style={{textAlign:'center', height:'100', maxHeight:'100'}}>
                                           { element.attachments.map(
                                                image => (
                                                    <div style={{textAlign:'center', height:'100'}}>
                                                        <img
                                                            src={image.url}
                                                            alt="Store Image"
                                                            height='600'
                                                            width='100%'
                                                        />
                                                    </div>
                                                )
                                            )}
                                            </Carousel>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </Card>
                )}
            </div>
        );
    }
}

export default AllPosts;
