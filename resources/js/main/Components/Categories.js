import React, { Component } from "react";
import { Row, Col, Card, Icon, Button, List } from "antd";
import axios from "axios";
const { Meta } = Card;
class Categories extends Component {
    state = {
        redirect: false,
        categories: []
    };

    componentDidMount() {
        axios.get("/api/categories").then(res => {
            const data = res.data;
            console.log('categories are',data);
            this.setState({ categories: data });
        });
    }
    renderRedirect = id => {
        if (this.state.redirect) {
            return <Redirect to={"/category/" + id} />;
        }
    };
    setRedirect = () => {
        this.setState({
            redirect: true
        });
    };
    render() {
        return (
            <Row>
                <Col span={16} offset={4}>
                    <Card
                        title={<h2>Shop by Categories</h2>}
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
                                pageSize: 4
                            }}
                            dataSource={this.state.categories}
                            renderItem={element => (
                                <List.Item style={{ padding: "3%" }}>
                                    {this.renderRedirect(element.id)}
                                    <Card
                                        hoverable
                                        // style={{ width: 240 }}
                                        bordered={false}
                                        className="cards"
                                        cover={
                                            <img
                                                alt=""
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLbS5qAOQMxVEv9mt1YkqNn-04eKRDlZK5fAN5FOaD1ez7HG_f"
                                                className="image"
                                                onClick={this.setRedirect}
                                                width={240}
                                            />
                                        }
                                    >
                                        <Meta
                                            title="Electronics"
                                            style={{ textAlign: "center" }}
                                        />
                                    </Card>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default Categories;
