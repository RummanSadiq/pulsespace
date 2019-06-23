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
       console.log('Posts received are ', this.props.posts);
    }

    report = id => {
        // axios.post("https://api.pulsespace.com/reports/reviews"+id).then(res => {
        //     const user = res.data;
        //     console.log("calling from inside Reviews.js Logged in user is", user);
        //     this.setState({ user: res.data });
        // });
        console.log("Reporting review", id);
    };
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
                            dataSource={this.props.posts}
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
                                    actions={[
                                       
    
                                        <span>
                                            <Icon
                                                type="exclamation-circle"
                                                theme="twoTone"
                                                onClick={() => {
                                                    this.report(item.id);
                                                }}
                                                style={{
                                                    marginRight: 8,
                                                    fontSize: "20px"
                                                }}
                                            />{" "}
                                            Report
                                        </span>
                                        // <IconText type="exclamation-circle" text="Report" onClick={()=>{this.report(item.id)}}/>
                                        // <Icon type="exclamation" />
                                    ]}
                                >
                                    <List.Item.Meta

                                        avatar={
                                            <Avatar
                                                
                                            ><Icon type='shop' theme='twoTone'/></Avatar>
                                        }
                                        title={
                                            <a href={"store/" + element.id}>
                                                {" "}
                                                {/* {this.props.name} */}
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
