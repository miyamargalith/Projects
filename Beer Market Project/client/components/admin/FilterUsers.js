import React, { Component } from "react";
import { ProductConsumer } from "../../context";

export default class FilterUsers extends Component {
  constructor() {
    super();
    this.state = {
      filterValue: ""
    };
  }

  handleChange = e => {
    this.setState({
      filterValue: e.target.value
    });
  };

  handleSubmit = callback => e => {
    e.preventDefault();
    callback(this.state.filterValue);
  };

  render() {
    return (
      <ProductConsumer>
        {value => {
          return (
            <div className="container mb-3">
              <form
                className="form-inline align-items-center d-flex justify-content-center"
                onSubmit={this.handleSubmit(value.setUserActivities)}
              >
                <div className="form-group ">
                  <input
                    className="form-control mr-sm-2"
                    type="text"
                    placeholder="fiter user"
                    aria-label="Filter"
                    value={this.state.filterValue}
                    onChange={this.handleChange}
                  />
                  <button className="btn btn-outline-dark my-2 my-sm-0" type="submit">
                    Filter
                  </button>
                </div>
              </form>

              <small id="filterHelp" className="form-text text-muted">
                * Please make sure you insert a full and valid user email.
              </small>
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}
