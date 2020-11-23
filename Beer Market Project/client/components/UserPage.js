import React, { Component } from "react";
import Navbar from "./navbar/Navbar";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../context";
import { IconWrapper } from "./navbar/Nav-style";

class UserPage extends Component {
  showCart = cart => {
    return cart.map(item => {
      return <li key={item.beer}>{item.beer + " x " + item.count}</li>;
    });
  };
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="container mx-auto ">
          <h1 className="text-main-title text-center py-4"> User's page </h1>

          <ProductConsumer>
            {value => {
              const { checkoutUserActivities, user } = value;
              const { firstName, lastName, email } = user;
              let userActivityList = (
                <h4 className="text-danger text-capitalize text-darken-3 pb-3">
                  {" "}
                  no purchase history found{" "}
                  <IconWrapper>
                    <span>
                      <i className="fas fa-heart-broken text-danger" />
                    </span>
                  </IconWrapper>
                </h4>
              );
              let cart, cartTotal;
              if (checkoutUserActivities.length != 0) {
                userActivityList = checkoutUserActivities.map(activity => {
                  cart = JSON.parse(activity.cart);

                  cartTotal = activity.cartTotal;
                  return (
                    <li className="pt-1" key={activity.id}>
                      <b>
                        {" "}
                        {"Checked out at " +
                          activity.time +
                          ". The cart total was: " +
                          cartTotal +
                          "$."}{" "}
                      </b>
                      <br />
                      <span className="pl-4">
                        <u>Purchased:</u>
                      </span>
                      <br />
                      <ol>{this.showCart(cart)}</ol>
                    </li>
                  );
                });
              }
              return (
                <div className="row">
                  <div className="col-xs-6 pl-5">
                    <h5 className="grey-text text-darken-3 pb-3">
                      <u>First Name:</u> {firstName}
                    </h5>
                    <h5 className="grey-text text-darken-3 pb-3">
                      <u>Last Name:</u> {lastName}
                    </h5>
                    <h5 className="grey-text text-darken-3 pb-3">
                      <u>Email:</u> {email}
                    </h5>
                    <h5 className="grey-text text-darken-3 pb-3">
                      <u>Change Password:</u>{" "}
                      <Link to="/ChangePassword" className="">
                        Click here
                      </Link>
                    </h5>
                    <h5 className="grey-text text-darken-3 pb-3">
                      <u>Item's purchased history:</u>{" "}
                    </h5>
                    <div>{userActivityList}</div>
                  </div>
                </div>
              );
            }}
          </ProductConsumer>
        </div>
      </React.Fragment>
    );
  }
}

export default UserPage;
