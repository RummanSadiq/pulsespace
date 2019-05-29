import React, { Component } from "react";
import {
    Row,
    Col,
    Button,
    Card,
    Modal,
    message,
    Input,
    Popconfirm,
    Icon
} from "antd";
import axios from "axios";

class Faqs extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.m2handleOk = this.m2handleOk.bind(this);
        this.showModalm2 = this.showModalm2.bind(this);
    }
    state = {
        // faqs: [],
        visible: false,
        m2visible: false,
        newquestion: "",
        newanswer: "",
        nid: "",

        newfaq: {}
    };

    componentDidMount() {
        axios.get("https://api.pulsespace.com/faqs").then(res => {
            const faqsdata = res.data;
            this.setState({ faqs: faqsdata });
        });
    }

    handleDelete(event, id) {
        event.preventDefault();
        const counters = this.state.faqs.filter(c => c.id !== id);
        this.setState({ faqs: counters });
        axios.delete("https://api.pulsespace.com/faqs/" + id).then(res => {
            const faqsdata = res.data;
            this.setState(
                { faqs: faqsdata }
                //     ,()=>{
                //     message.success('FAQ deleted successfully');
                // }
            );
        });
    }

    showModal = () => {
        this.setState({
            visible: true
        });
    };
    handleOk = e => {
        console.log(e);
        if (this.state.newquestion || this.state.newanswer) {
            this.setState({
                visible: false
            });
            var str = {
                question: this.state.newquestion,
                answer: this.state.newanswer
            };

            axios.post("https://api.pulsespace.com/faqs", str).then(res => {
                console.log(res);
                console.log(res.data);
                message.success("FAQ Added");
            });

            this.state.faqs.push(str);
            this.setState({ faqs: this.state.faqs });
            e.preventDefault();
        } else {
            message.error("All inputs are required");
        }
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false
        });
    };

    onChangeQuestion = e => {
        this.setState({ newquestion: e.target.value });
    };

    onChangeAnswer = e => {
        this.setState({ newanswer: e.target.value });
    };

    showModalm2 = element => {
        let str = element;
        // {id:element.id,store_id:element.store_id,question:element.question, answer:element.answer, created_at:element.created_at,updated_at:element.updated_at};

        this.setState(
            {
                newfaq: str
            },
            function() {
                console.log(this.state.newfaq);
                this.setState({
                    m2visible: true
                });
            }
        );
        this.setState({ newquestion: str.question, newanswer: str.answer });

        console.log(this.state.newfaq);
    };

    m2handleOk(event) {
        console.log(event);

        let faq = this.state.faqs;
        var index = faq.indexOf(this.state.newfaq);
        faq[index].question = this.state.newquestion;
        faq[index].answer = this.state.newanswer;

        let updatedfaq = faq[index];
        axios
            .post(
                "https://api.pulsespace.com/faqs/" + updatedfaq.id,
                updatedfaq
            )
            .then(res => {
                const faqsdata = res.data;
                // this.setState({ faqs: faqsdata });
                message.success("FAQ Updated");
            })
            .catch(err => {
                console.log("Error occured while updating new faq");
                throw err;
            });

        this.setState({ faqs: faq });
        this.setState({
            m2visible: false
        });
    }

    m2handleCancel = e => {
        console.log(e);
        this.setState({
            m2visible: false,
            newquestion: "",
            newanswer: "",
            nid: ""
        });
    };

    popCancel = () => {
        console.log("Canceled");
    };
    render() {
        return (
            <div>
                {/* <Row> */}
                <Col span={16} offset={6}>
                    <div style={{ background: "#ECECEC", padding: "30px" }}>
                        <h1 style={{ textAlign: "center" }}>FAQS</h1>
                        <Button
                            type="primary"
                            shape="round"
                            icon="plus"
                            size={"large"}
                            onClick={this.showModal}
                        >
                            Add new Question
                        </Button>
                        <Modal
                            title="Add a new Question"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            // okButtonProps={{ disabled: true }}
                        >
                            <Input
                                placeholder="Question"
                                allowClear
                                required
                                onChange={this.onChangeQuestion}
                                style={{ marginBottom: 20 }}
                            />
                            <Input
                                placeholder="Answer"
                                allowClear
                                required
                                onChange={this.onChangeAnswer}
                            />
                        </Modal>
                        {!this.state.faqs && <Icon type="loading" />}
                        {this.state.faqs &&
                            this.state.faqs.map(element => (
                                <div style={{ paddingTop: "10px" }}>
                                    <Card
                                        title={element.question}
                                        // key={element.id}
                                        type="inner"
                                        hoverable="true"
                                        bordered={false}
                                        // style={{ width: 1200 }}
                                        extra={
                                            <div>
                                                <Button
                                                    type="primary"
                                                    size={"large"}
                                                    icon="edit"
                                                    onClick={() =>
                                                        this.showModalm2(
                                                            element
                                                        )
                                                    }
                                                />
                                                <Popconfirm
                                                    title="Are you sure delete this question?"
                                                    onConfirm={event =>
                                                        this.handleDelete(
                                                            event,
                                                            element.id
                                                        )
                                                    }
                                                    onCancel={this.popCancel}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    {/* <Icon type="delete" stye={{color:'#FF7678'}}/> */}
                                                    <Button
                                                        type="danger"
                                                        size={"large"}
                                                        icon="delete"
                                                        // onClick={event =>
                                                        //     this.handleDelete(
                                                        //         event,
                                                        //         element.id
                                                        //     )
                                                        // }
                                                    />
                                                </Popconfirm>{" "}
                                            </div>
                                        }
                                    >
                                        <p>{element.answer}</p>
                                    </Card>
                                </div>
                            ))}

                        <Modal
                            title="Edit a Question"
                            visible={this.state.m2visible}
                            onOk={event => this.m2handleOk(event)}
                            onCancel={this.m2handleCancel}
                            destroyOnClose={true}
                        >
                            <Input
                                placeholder="Question"
                                allowClear
                                onChange={this.onChangeQuestion}
                                defaultValue={this.state.newfaq.question}
                                style={{ marginBottom: 20 }}
                            />
                            <Input
                                placeholder="Answer"
                                allowClear
                                onChange={this.onChangeAnswer}
                                defaultValue={this.state.newfaq.answer}
                            />
                        </Modal>
                    </div>
                </Col>
                {/* </Row> */}
            </div>
        );
    }
}

export default Faqs;
