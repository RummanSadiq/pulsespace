import React, { Component } from "react";
import HomePage from "./HomePage";
import Store from "./store";
import SearchComponent from "./Search";
import Categories from "./Categories";
import Chat from "./Chat";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import MyList from "./myList";

class SubPage extends Component {
    state = {};
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/store/:id" component={Store} />
                    <Route exact path="/" component={HomePage} />
                    <Route
                        exact
                        path="/product/:id"
                        component={ProductDetails}
                    />
                    <Route exact path="/search/:value" component={SearchComponent} />
                    <Route exact path="/categories" component={Categories} />
                    <Route exact path="/mylist" component={MyList} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default SubPage;
