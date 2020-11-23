import React, { Component } from "react";
import Product from "./Product";
import { ProductConsumer } from "../context";
import Navbar from "./navbar/Navbar";

export default class ProductList extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="py-5">
          <div className="container">
            <h1 className="text-main-title pb-3 text-center"> beer market </h1>
            <div className="row pt-4">
              <ProductConsumer>
                {value => {
                  return value.mergedProducts().map(product => {
                    return <Product key={product.id} product={product} />;
                  });
                }}
              </ProductConsumer>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
