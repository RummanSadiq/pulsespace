import React, { Component } from "react";
import axios from "axios";
import {
    Layout,
    Row,
    Col,
    Card,
    Input,
    Avatar,
    Button,
    List,
    message,
    Spin
} from "antd";
import { timingSafeEqual } from "crypto";
const Search = Input.Search;
const { TextArea } = Input;
const { Header, Content } = Layout;

import Pusher from "pusher-js";
// import Echo from "laravel-echo";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// const options = {
//     broadcaster: "pusher",
//     key: "d4b9af39550bd7832778",
//     cluster: "ap2",
//     forceTLS: true,
//     encrypted: false,
//     //authEndpoint is your apiUrl + /broadcasting/auth
//     authEndpoint: "https://api.pulsespace.com/broadcasting/auth",
//     // As I'm using JWT tokens, I need to manually set up the headers.
//     auth: {
//         headers: {
//             "X-CSRF-TOKEN": csrf_token,
//             Authorization: "Bearer " + cookies.get("access_token"),
//             Accept: "application/json"
//         }
//     }
// };

// const echo = new Echo(options);

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher("d4b9af39550bd7832778", {
    cluster: "ap2",
    forceTLS: true,
    authEndpoint: "https://api.pulsespace.com/broadcasting/auth",
    // As I'm using JWT tokens, I need to manually set up the headers.
    auth: {
        headers: {
            "X-CSRF-TOKEN": csrf_token,
            Authorization: "Bearer " + cookies.get("access_token"),
            Accept: "application/json"
        }
    }
});

class Chat extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.myChat = React.createRef();
    }
    state = {
        newreply: "",
        initial_screen: true,
        conversation_id: "",
        title: "",
        conversations: [],
        chat: []
    };

    handleChange = event => {
        this.setState({ newreply: event.target.value });
        this.inputreply = event.target.value;
    };

    componentDidMount() {
        this.getConversations();
    }

    getConversations() {
        axios.get("https://api.pulsespace.com/conversations/shop").then(res => {
            this.setState({ conversations: res.data });

            if (this.state.initial_screen) {
                this.getMessages(
                    this.state.conversations[0].id,
                    this.state.conversations[0].username
                );
                this.setState({ initial_screen: false });
            }
        });
    }

    getMessages(id, username) {
        console.log("Rumman" + cookies.get("auth_id"));

        var channel = pusher.subscribe(
            "private-messages.shop." + cookies.get("auth_id")
        );
        channel.bind("chat", data => {
            this.setState(prevState => ({
                chat: [...prevState.chat, data.message]
            }));
        });

        this.setState({ title: username });

        if (id != this.state.conversation_id) {
            this.setState({ chat: [] });
        }
        this.setState({ conversation_id: id });

        axios.get("https://api.pulsespace.com/messages/" + id).then(res => {
            this.setState({ chat: res.data });
            console.log(this.state.chat);
            this.myChat.current.scrollTop = this.myChat.current.scrollHeight;
        });
    }

    handleSubmit(event) {
        // var today = new Date();
        // var tdate = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear() ;
        // var ttime= today.toLocaleTimeString();

        if (this.state.newreply != "") {
            var str = {
                text: this.state.newreply,
                conversation_id: this.state.conversation_id
            };

            axios.post("https://api.pulsespace.com/messages", str).then(res => {
                //Refresh the messages
                // this.getMessages(this.state.conversation_id, this.state.title);
                this.getConversations();
                this.setState({ newreply: "" });
            });
        }
    }

    render() {
        return (
            <Col
                xs={{ offset: 6, span: 18 }}
                sm={{ offset: 6, span: 18 }}
                md={{ offset: 6, span: 18 }}
                lg={{ offset: 6, span: 18 }}
                xl={{ offset: 3, span: 20 }}
                style={{ marginTop: "2em" }}
            >
                <Header style={{ backgroundColor: "#f5f5f5" }}>
                    <div style={{ textAlign: "center" }}>
                        <h1>Customer Queries</h1>
                    </div>
                </Header>
                <Row style={{ position: "inherit" }}>
                    <Col span={8} style={{ overflow: "auto" }}>
                        <Card title="Messages" bordered={false}>
                            <List
                                itemLayout="horizontal"
                                dataSource={this.state.conversations}
                                renderItem={item => (
                                    <List.Item
                                        onClick={() =>
                                            this.getMessages(
                                                item.id,
                                                item.username
                                            )
                                        }
                                        style={{ cursor: "pointer" }}
                                    >
                                        <List.Item.Meta
                                            avatar={
                                                <Avatar
                                                    size="large"
                                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                                />
                                            }
                                            title={item.username}
                                            description={
                                                item.prefix + item.last_message
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                    <Col span={16}>
                        <Card
                            title={this.state.title}
                            bordered={true}
                            style={{
                                marginLeft: "10dp",
                                width: "100%",
                                overflow: "auto"
                            }}
                        >
                            <div
                                ref={this.myChat}
                                style={{ height: "700px", overflow: "auto" }}
                            >
                                {this.state.chat.map(element => (
                                    <div>
                                        {element.receiver && (
                                            <div
                                                style={{
                                                    float: "left",
                                                    backgroundColor: " #d9d9d9",
                                                    width: "70%",
                                                    padding: "1%",
                                                    borderRadius: "2%",
                                                    margin: "1%"
                                                }}
                                            >
                                                {element.text}
                                                <div
                                                    style={{
                                                        marginLeft: "75%"
                                                    }}
                                                >
                                                    {element.created_at}
                                                </div>
                                            </div>
                                        )}

                                        {element.sender && (
                                            <div
                                                style={{
                                                    float: "right",
                                                    backgroundColor: "#3366ff",
                                                    width: "70%",
                                                    padding: "1%",
                                                    borderRadius: "2%",
                                                    marginLeft: "100%",
                                                    marginRight: "0px",
                                                    color: "#ffffff",
                                                    margin: "1%"
                                                }}
                                            >
                                                {element.text}
                                                <div
                                                    style={{
                                                        marginLeft: "75%"
                                                    }}
                                                >
                                                    {element.created_at}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Card>
                        <div
                            style={{
                                position: "relative",
                                bottom: "2%",
                                width: "100%",
                                display: "inline-block"
                            }}
                        >
                            <Search
                                placeholder="Type in your Reply"
                                enterButton="Send"
                                size="large"
                                onChange={this.handleChange}
                                onSearch={this.handleSubmit}
                            />
                            {/* <TextArea
                    rows={1}
                    placeholder="Enter your reply"
                    block="false"
                    onChange={this.handleChange}
                    value={this.state.newreply}
                    style={{
                      borderTop: "0px",
                      borderLeft: "0px",
                      borderRight: "0px",
                      width: "80%",
                      float: "left"
                    }}
                  />
                  <Button
                    type="primary"
                    icon="check"
                    size="large"
                    style={{ float: "left" }}
                    onClick={this.handleSubmit}
                  >Send</Button> */}
                        </div>
                    </Col>
                </Row>
            </Col>
        );
    }
}

export default Chat;
