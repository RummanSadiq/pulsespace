import React from "react";
import ReactDOM from "react-dom";
import Myshop from "./Myshop";
import background from "./react_Images/background.jpg";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Myshop />, div);
    ReactDOM.unmountComponentAtNode(div);
});
