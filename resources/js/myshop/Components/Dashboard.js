import React, { Component } from "react";
import "antd/dist/antd.css";
import "antd/dist/antd";
import { BrowserRouter, Route } from "react-router-dom";
import Chat from "./Chat";
import Sidemenu from "./Sidemenu";
import Faqs from "./FAQs";
import Posts from "./Posts";
import UserReviews from "./UserReviews";
import AddProduct from "./Add Product";
import EPForm from "./EditProduct";
import ViewProducts from "./View Products";
import Promote from "./Promote";
import Shop from "./Shop";
class Dashboard extends Component {
    state = {
        logged: 0
    };
    changeState = () => {
        console.log("change state called");
        this.setState({ logged: true });
    };
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <div>
                            <Route path="" component={Sidemenu} />
                            <Route exact path="" component={Shop} />
                            <Route path="/Messages" component={Chat} />
                            <Route path="/Faqs" component={Faqs} />
                            <Route path="/Reviews" component={UserReviews} />
                            <Route path="/Posts" component={Posts} />
                            <Route path="/Add" component={AddProduct} />
                            <Route
                                path="/ViewProduct"
                                component={ViewProducts}
                            />
                            <Route path="/Edit" component={EPForm} />
                            <Route path="/Shop" component={Shop} />
                            <Route path="/promote" component={Promote} />
                        </div>

                        {/* <Route
                            path="/logout"
                            component={() => {
                                window.location.href = "/logout";
                                return null;
                            }}
                        /> */}
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default Dashboard;
