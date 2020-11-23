import React, { Component } from "react";
import Product from "./Product";
import { ProductConsumer } from "../context";
import { IconWrapper } from "./navbar/Nav-style";
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
                  const searchResult = value.mergedSearchProducts();
                  if (searchResult.length === 0) {
                    return (
                      <div className="container mx-auto text-center">
                        <h4 className="text-danger text-capitalize text-darken-3 pb-3">
                          {" "}
                          no results found{" "}
                          <IconWrapper>
                            <span>
                              <i className="fas fa-heart-broken text-danger" />
                            </span>
                          </IconWrapper>
                        </h4>
                      </div>
                    );
                  }
                  return searchResult.map(product => {
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
