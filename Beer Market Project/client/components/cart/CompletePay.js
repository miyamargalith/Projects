import React from "react";
import Navbar from "../navbar/Navbar";

export default function CompletePay() {
  return (
    <React.Fragment>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-10 mx-auto text-center text-title">
            <h1> thank you for your purchase </h1>
            <h2 className="pb-5"> cheers! </h2>
            <img style={{ width: "20rem", height: "20rem" }} src="/img/beer.png" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
