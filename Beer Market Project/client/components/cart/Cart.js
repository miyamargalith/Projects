import React, { Component } from "react";
import CartColunms from "./CartColunms";
import EmptyCart from "./EmptyCart";
import { ProductConsumer } from "../../context";
import CartList from "./CartList";
import CartTotals from "./CartTotals";
import Navbar from "../navbar/Navbar";

export default class Cart extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <section>
          <ProductConsumer>
            {value => {
              const { cart } = value;
              if (cart.length > 0) {
                return (
                  <React.Fragment>
                    <h1 className="text-main-title text-center py-4"> My cart</h1>
                    <CartColunms />
                    <CartList value={value} />
                    <CartTotals value={value} history={this.props.history} />
                  </React.Fragment>
                );
              } else {
                return <EmptyCart />;
              }
            }}
          </ProductConsumer>
        </section>
      </React.Fragment>
    );
  }
}
