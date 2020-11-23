import React, { Component } from "react";
import { ProductConsumer } from "../context";

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchValue: ""
    };
  }

  handleChange = e => {
    this.setState({
      searchValue: e.target.value
    });
  };

  handleSubmit = callback => e => {
    e.preventDefault();
    callback(this.state.searchValue);
  };

  render() {
    return (
      <ProductConsumer>
        {value => {
          return (
            <form
              className="form-inline ml-auto nav-item"
              onSubmit={this.handleSubmit(value.searchFilter)}
            >
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Search beers"
                aria-label="Search"
                value={this.state.searchValue}
                onChange={this.handleChange}
              />
              <button className="btn btn-outline-dark my-2 my-sm-0" type="submit">
                Search
              </button>
            </form>
          );
        }}
      </ProductConsumer>
    );
  }
}
