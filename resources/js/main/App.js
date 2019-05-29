import React, { Component } from "react";
import "./App.css";
import Head from "./Components/head";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "antd/dist/antd";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import SubPage from "./Components/subPage";
import ProductDetails from "./Components/ProductDetails";
import Categories from "./Components/Categories";

class App extends Component {
    render() {
        return (
            <div style={{ backgroundColor: "#F5F5F5" }}>
                <Head />
                {/* <Categories/> */}
                <SubPage />
                {/* <ProductDetails/> */}
            </div>
        );
    }
}

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
