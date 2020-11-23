import React, { Component } from "react";
import Navbar from "./navbar/Navbar";
import { convertCurrency } from "currencies-exchange-rates";

let calcEUR, calcILS, calcGBP, calcCAD, calcUSD;
export default class CurrencyConverter extends Component {
  constructor() {
    super();
    this.state = {
      amountToConvert: "",
      ILS: "off",
      EUR: "off",
      GBP: "off",
      CAD: "off",
      show: false,
      notAValidNumber: false
    };
  }

  handleChange = e => {
    this.setState(
      {
        [e.target.id]: parseFloat(e.target.value),
        show: false
      },
      () => {
        calcUSD = new Intl.NumberFormat("he", { style: "currency", currency: "USD" }).format(
          this.state.amountToConvert
        );
        convertCurrency("USD", "ILS", this.state.amountToConvert).then(function(result) {
          calcILS = new Intl.NumberFormat("he", { style: "currency", currency: "ILS" }).format(
            result
          );
        });
        convertCurrency("USD", "EUR", this.state.amountToConvert).then(function(result) {
          calcEUR = new Intl.NumberFormat("he", { style: "currency", currency: "EUR" }).format(
            result
          );
        });
        convertCurrency("USD", "GBP", this.state.amountToConvert).then(function(result) {
          calcGBP = new Intl.NumberFormat("he", { style: "currency", currency: "GBP" }).format(
            result
          );
        });
        convertCurrency("USD", "CAD", this.state.amountToConvert).then(function(result) {
          calcCAD = new Intl.NumberFormat("he", { style: "currency", currency: "CAD" }).format(
            result
          );
        });
      }
    );
  };

  handleChangeCheckBox = e => {
    const id = e.target.id;
    let fix;
    if (id == "ILS") {
      fix = this.state.ILS;
    } else if (id == "EUR") {
      fix = this.state.EUR;
    } else if (id == "GBP") {
      fix = this.state.GBP;
    } else {
      fix = this.state.CAD;
    }
    if (fix == "on") {
      fix = "off";
    } else {
      fix = "on";
    }
    this.setState({
      show: false,
      [e.target.id]: fix
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (isNaN(this.state.amountToConvert)) {
      this.setState({
        show: false,
        notAValidNumber: true
      });
    } else {
      this.setState({
        show: true,
        notAValidNumber: false
      });
    }
  };
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <h1 className="text-main-title text-center py-4"> Currency Converter </h1>
        <div className="container mx-auto ">
          <form className="log-form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="amountToConvert">Amount in U.S. dollar to convert</label>
              <input
                type="text"
                id="amountToConvert"
                className="form-control"
                placeholder="Amount"
                onChange={this.handleChange}
                required
              />
              {this.state.notAValidNumber && (
                <span className="text-danger">
                  <b>* Please make sure you insert a valid number.</b>
                </span>
              )}
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                id="ILS"
                className="form-check-input"
                onChange={this.handleChangeCheckBox}
              />
              <label className="form-check-label" htmlFor="ILS">
                ILS - Israeli shekels
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                id="EUR"
                className="form-check-input"
                onChange={this.handleChangeCheckBox}
              />
              <label className="form-check-label" htmlFor="EUR">
                EUR - Euros
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                id="GBP"
                className="form-check-input"
                onChange={this.handleChangeCheckBox}
              />
              <label className="form-check-label" htmlFor="GBP">
                GBP - British pounds
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                id="CAD"
                className="form-check-input"
                onChange={this.handleChangeCheckBox}
              />
              <label className="form-check-label" htmlFor="CAD">
                CAD - Canadian dollars
              </label>
            </div>
            <div className="input-field py-3">
              <button type="submit" className="btn btn-primary">
                Convert
              </button>
            </div>
          </form>
          <hr className="my-4"></hr>
          <div className="row">
            <div className="col col-4">
              {this.state.show && (
                <div className="container">
                  <h3>
                    <b>{calcUSD} is - </b>
                  </h3>
                </div>
              )}
            </div>
            <div className="col col-8 pt-1">
              {this.state.show && this.state.ILS == "on" && (
                <div className="container">
                  <div className="row">
                    <div className="col col-1">
                      <i className="fas fa-coins text-muted" />
                    </div>
                    <div className="col col-11">
                      <h5>{calcILS}</h5>
                    </div>
                  </div>
                </div>
              )}
              {this.state.show && this.state.EUR == "on" && (
                <div className="container">
                  <div className="row">
                    <div className="col col-1">
                      <i className="fas fa-coins text-muted" />
                    </div>
                    <div className="col col-11">
                      <h5>{calcEUR}</h5>
                    </div>
                  </div>
                </div>
              )}
              {this.state.show && this.state.GBP == "on" && (
                <div className="container">
                  <div className="row">
                    <div className="col col-1">
                      <i className="fas fa-coins text-muted" />
                    </div>
                    <div className="col col-11">
                      <h5>{calcGBP}</h5>
                    </div>
                  </div>
                </div>
              )}
              {this.state.show && this.state.CAD == "on" && (
                <div className="container">
                  <div className="row">
                    <div className="col col-1">
                      <i className="fas fa-coins text-muted" />
                    </div>
                    <div className="col col-11">
                      <h5>{calcCAD}</h5>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
