import React from "react";

export default function CartColunms() {
  return (
    // on small screen the cols do not appear
    <div className="container-fluid text-center d-none d-lg-block">
      <div className="row">
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-capitalize"> beers </p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-capitalize"> name of beer </p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-capitalize"> price </p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-capitalize"> quantity </p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-capitalize"> remove </p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-capitalize"> total </p>
        </div>
      </div>
    </div>
  );
}
