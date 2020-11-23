import React, { Component } from "react";
import { Link } from "react-router-dom";
import { NavWrapper, IconWrapper } from "../navbar/Nav-style";
import { loginUser } from "../../api/users-api";
import { Route, Redirect } from "react-router-dom";
import { ProductConsumer } from "../../context";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <ProductConsumer>
      {value => {
        const { user } = value;
        return (
          <React.Fragment>
            <Route
              {...rest}
              render={props =>
                user.isAuthenticated ? (
                  <Component {...props} />
                ) : (
                  <Redirect to={{ pathname: "/signIn", state: { from: props.location } }} />
                )
              }
            />
          </React.Fragment>
        );
      }}
    </ProductConsumer>
  );
};

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    rememberMe: "off",
    error: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = callback => e => {
    e.preventDefault();

    loginUser(this.state)
      .then((res, err) => {
        callback(res.data);
        if (res) {
          this.props.history.push("/");
        }
      })
      .catch(err => {
        if (!err.response) {
          console.error(err);
          this.setState(prevState => ({
            error: "Unknown error"
          }));
        } else if (err.response.status === 401) {
          this.props.history.push("/signIn");
          this.setState(prevState => ({
            error: "Email or password incorrect"
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
          <h1 className="text-main-title text-center py-4"> Welcome to the Beer Market </h1>
          <h5 className="grey-text text-darken-3 pb-3">
            In order to start shopping please sign in
          </h5>
          <ProductConsumer data={this.state.userId}>
            {({ authenticate }) => (
              <form className="log-form" onSubmit={this.handleSubmit(authenticate)}>
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
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    className="form-check-input"
                    onChange={this.handleChange}
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember Me
                  </label>
                </div>
                <div className="input-field py-3">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
                {this.state.error && <div>{this.state.error}</div>}
                <div className="form group">
                  <Link className="h5 mt-4" to="/signUp">
                    I am not a member, take me to sign up
                  </Link>
                </div>
              </form>
            )}
          </ProductConsumer>
        </div>
      </React.Fragment>
    );
  }
}

export default SignIn;
