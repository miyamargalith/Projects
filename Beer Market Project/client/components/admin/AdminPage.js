import React, { Component } from "react";
import Navbar from "../navbar/Navbar";
import { ProductConsumer } from "../../context";
import FilterUsers from "./FilterUsers";
import { IconWrapper } from "../navbar/Nav-style";
export default class AdminPage extends Component {
  showCart = cart => {
    return cart.map(item => {
      return <li key={item.beer}>{item.beer + " x " + item.count}</li>;
    });
  };
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="container mx-auto">
          <h1 className="text-main-title text-center py-4"> Admin's page </h1>
          <div className="container mx-auto text-center">
            <FilterUsers />
          </div>
          <div className="row">
            <div className="col-10 mx-auto">
              <ProductConsumer>
                {value => {
                  const { activities } = value;
                  if (activities.length != 0) {
                    return activities.map(activity => {
                      if (activity.name === "checkout") {
                        const cart = JSON.parse(activity.cart);
                        return (
                          <li
                            className="pt-1"
                            key={activity.time + activity.userEmail + activity.name}
                          >
                            {activity.description +
                              ", at " +
                              activity.time +
                              ". The cart total was: " +
                              activity.cartTotal +
                              "$."}{" "}
                            <br /> <span className="pl-4">Items Purchased:</span>
                            <br />
                            <ol>{this.showCart(cart)}</ol>
                            <hr></hr>
                          </li>
                        );
                      }
                      return (
                        <li
                          className="pt-1 pb-1"
                          key={activity.time + activity.userEmail + activity.name}
                        >
                          {activity.description + " at " + activity.time}
                          <hr></hr>
                        </li>
                      );
                    });
                  } else {
                    return (
                      <div className="container mx-auto text-center pt-3">
                        <h4 className="text-danger text-capitalize text-darken-3 pb-3">
                          {" "}
                          no results found for this user{" "}
                          <IconWrapper>
                            <span>
                              <i className="fas fa-heart-broken text-danger" />
                            </span>
                          </IconWrapper>
                        </h4>
                      </div>
                    );
                  }
                }}
              </ProductConsumer>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
