import React, { Component } from "react";
import Store from "./store";
import SearchComponent from "./Search";
import Categories from "./Categories";
import Chat from "./Chat";
import Profile from "./Profile";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ProductDetails from "./ProductDetails";
// import MyList from "./myList";
import ShoppingList from './ShoppingList';
import HomeComponents from "./HomeComponents";


class SubPage extends Component {
    state = {};
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/store/:id" component={Store} />
                    <Route exact path="/" component={HomeComponents} />
                    <Route
                        exact
                        path="/product/:id"
                        component={ProductDetails}
                    />
                    <Route
                        exact
                        path="/store/product/:id"
                        component={ProductDetails}
                    />
                    <Route
                        exact
                        path="/search/:value"
                        component={SearchComponent}
                    />

                    <Route  exact path="/Messages" component={Chat} />
                    {/* <Route key="new message" exact path="/Messages:id" component={Chat} /> */}


                    <Route exact path="/categories" component={Categories} />
                    <Route exact path="/mylist" component={ShoppingList} />
                    <Route exact path="/profile" component={Profile} />
                    {/* <Route exact path="/signin" component={Login} />
                    <Route exact path="/up" component={SignUp} /> */}
                    <Redirect from="*" to="/" />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default SubPage;
