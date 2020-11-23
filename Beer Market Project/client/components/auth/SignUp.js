import React, { Component } from "react";
import { Link } from "react-router-dom";
import { createNewUser } from "../../api/users-api";
import { NavWrapper, IconWrapper } from "../navbar/Nav-style";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    error: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    createNewUser(this.state)
      .then((res, err) => {
        this.props.history.push("/signIn");
      })
      .catch(err => {
        if (!err.response) {
          console.error(err);
          this.setState(prevState => ({
            error: "Unknown error"
          }));
        } else if (err.response.status === 401) {
          this.setState(prevState => ({
            error: "this email alredy exists"
          }));
        } else if (err.response.status === 500) {
          this.setState(prevState => ({
            error: "Whoops! Something went wrong :( Our best programmers are working on it!"
          }));
        }
      });
  };

  render() {
    return (
      <React.Fragment>
        <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
          <IconWrapper className="pr-3">
            <span>
              <i className="fas fa-beer" />
            </span>
          </IconWrapper>
          <h2 className="navbar-nav text-main-title">Beer Market</h2>
        </NavWrapper>
        <div className="container mx-auto text-center">
          <h1 className="text-main-title text-center py-4"> Sign Up for Beer Market </h1>
          <h5 className="grey-text text-darken-3 pb-3">
            {" "}
            In order to start shopping please sign up{" "}
          </h5>
          <form className="log-form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                id="firstName"
                className="form-control"
                placeholder="Enter first name"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                id="lastName"
                className="form-control"
                placeholder="Enter last name"
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter Email"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter Password"
                onChange={this.handleChange}
                required
              />
              <small id="passwordHelp" className="form-text text-muted">
                Please make sure you don't share this password.
              </small>
            </div>

            <div className="input-field py-3">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
            {this.state.error && <div>{this.state.error}</div>}
            <div className="form group">
              <Link className="h5 mt-4" to="/signIn">
                already a member, take me to sign in
              </Link>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default SignUp;
