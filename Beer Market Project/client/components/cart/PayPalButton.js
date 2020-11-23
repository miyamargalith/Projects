import React from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";
import { createNewActivity } from "../../api/activities-api";

export default class PayPalButton extends React.Component {
  render() {
    const onSuccess = payment => {
      // Congratulation, it came here means everything's fine!
      console.log("The payment was succeeded!", payment);
      const date = new Date();
      const stringifyCart = JSON.stringify(
        this.props.cart.map(item => {
          return {
            beer: item.title,
            count: item.count
          };
        })
      );

      createNewActivity({
        name: "checkout",
        description: `user ${this.props.user.id} checked out`,
        userEmail: `${this.props.user.id}`,
        cart: `${stringifyCart}`,
        cartTotal: `${this.props.total}`,
        time: date.toLocaleDateString() + " " + date.toLocaleTimeString()
      }).catch(err => {
        if (!err.response) {
          console.log("Unknown error " + "did not create user activity");
        } else if (err.response.status === 401) {
          console.log("Unauthorized " + "did not create user activity");
          this.props.history.push("/signIn");
        } else if (err.response.status === 500) {
          console.log(
            "Whoops! Something went wrong :( Our best programmers are working on it! " +
              "did not create user activity"
          );
        }

        return;
      });
      this.props.clearCart();
      this.props.history.push("/completePay");
    };

    const onCancel = data => {
      console.log("The payment was cancelled!", data);
    };

    const onError = err => {
      console.log("Error!", err);
    };

    let env = "sandbox";
    let currency = "USD";
    const client = {
      sandbox: process.env.REACT_APP_APP_ID
    };
    return (
      <PaypalExpressBtn
        env={env}
        client={client}
        currency={currency}
        total={this.props.total}
        onError={onError}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    );
  }
}
