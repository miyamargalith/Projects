import React from "react";

export default function CartItem({ item, value }) {
  const { id, title, image, price, total, count } = item;
  const { increment, decrement, removeFromCart } = value;
  return (
    <div className="row my-2 text-capitalize text-center">
      <div className="col-10 mx-auto col-lg-2">
        <img
          src={image}
          style={{ width: "5rem", height: "5rem" }}
          className="img-fluid"
          alt="a beer"
        />
      </div>
      <div className="col-10 mx-auto col-lg-2">
        {/* for small screen only: */}
        <span className="d-lg-none"> beer : </span>
        {title}
      </div>

      <div className="col-10 mx-auto col-lg-2">
        <span className="d-lg-none"> price : </span>$ {price}
      </div>

      <div className="col-10 mx-auto col-lg-2 my-lg-0">
        <div className="d-flex justify-content-center">
          <div>
            <span className="btn btn-black mx-1" onClick={() => decrement(id)}>
              {" "}
              -{" "}
            </span>
            <span className="btn btn-black mx-1"> {count} </span>
            <span className="btn btn-black mx-1" onClick={() => increment(id)}>
              {" "}
              +{" "}
            </span>
          </div>
        </div>
      </div>
      {/* col end */}

      <div className="col-10 mx-auto col-lg-2">
        <div className="cart-icon" onClick={() => removeFromCart(id)}>
          <i className="fas fa-trash" />
        </div>
      </div>

      <div className="col-10 mx-auto col-lg-2">
        <strong> item total : $ </strong>
        {total}
      </div>
    </div>
  );
}
