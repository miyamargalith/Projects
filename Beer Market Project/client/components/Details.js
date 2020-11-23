import React, { Component } from "react";
import { ProductConsumer } from "../context";
import { Link } from "react-router-dom";
import { ButtonContainer } from "./Button";
import Navbar from "./navbar/Navbar";

export default class Details extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <ProductConsumer>
          {value => {
            const {
              id,
              beerType,
              image,
              info,
              price,
              title,
              volume,
              alcohol,
              inCart
            } = value.detailProduct;
            return (
              <div className="container py-4 ">
                {/* product info */}
                <div className="row">
                  <div className="col-10 mx-auto col-md-6 my-3">
                    <img src={image} className="img-fluid" alt="a beer" />
                  </div>

                  {/* product text */}
                  <div className="col-10 mx-auto col-md-6 my-3">
                    <h2 className="text-capitalize">{title}</h2>
                    <h4 className="text-black text-capitilize mt-3 mb-2">
                      Beer type : <span className="text-capitilize"> {beerType} </span>
                    </h4>
                    <p className="pt-2">
                      {info} <br />
                    </p>
                    <p>
                      Volume: {volume} ml <br />
                      Alcohol: {alcohol} %
                    </p>
                    <h4 className="text-black">
                      Price : <span>$</span>
                      {price}
                    </h4>

                    {/* buttons */}
                    <div className="pt-4">
                      <Link to="/">
                        <ButtonContainer>back to beers</ButtonContainer>
                      </Link>
                      <ButtonContainer
                        disabled={inCart}
                        onClick={() => {
                          value.addToCart(id);
                          value.openModal(id);
                        }}
                      >
                        {inCart ? "in Cart" : "add to cart"}
                      </ButtonContainer>
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
        </ProductConsumer>
      </React.Fragment>
    );
  }
}
