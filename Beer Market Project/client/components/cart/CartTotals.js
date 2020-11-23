import React from "react";
import { Link } from "react-router-dom";
import PayPalButton from "./PayPalButton";

export default function CartTotals({ value, history }) {
  const { cartSubTotal, cartTax, cartTotal, clearCart, cart, user } = value;
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
            <button
              className="btn btn-outline-danger text-capitalize mb-3 px-5"
              type="button"
              onClick={() => clearCart()}
            >
              clear cart
            </button>
            <h5>
              <span className="text-title">subtotal :</span>
              <strong>$ {cartSubTotal} </strong>
            </h5>

            <h5>
              <span className="text-title">tax :</span>
              <strong>$ {cartTax} </strong>
            </h5>

            <h5>
              <span className="text-title">total :</span>
              <strong>$ {cartTotal} </strong>
            </h5>
            <div className="mt-4 ml-2">
              <PayPalButton
                cart={cart}
                user={user}
                total={cartTotal}
                clearCart={clearCart}
                history={history}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
