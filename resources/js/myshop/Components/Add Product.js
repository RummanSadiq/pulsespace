import React, { Component } from "react";
import APForm from './AddProductForm';

class AddProduct extends Component {
    state = {
        product: [
        ]
    };

  
    render() {
        return <APForm />;
    }
}


export default AddProduct;
