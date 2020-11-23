import React, { Component } from "react";
import Navbar from "../navbar/Navbar";
import { ProductConsumer } from "../../context";
import { changeUserPassword } from "../../api/users-api";

class ChangePassword extends Component {
  state = {
    password: "",
    newPassword: "",
    verifyNewPassword: "",
    email: "",
    error: ""
  };

  passwordChange = userData => {
    const { password, newPassword, email } = userData;
    changeUserPassword({ email, password, newPassword })
      .then(user => {
        if (user) {
          alert("your password has changed");
          this.props.history.push("/UserPage");
        }
      })
      .catch(err => {
        if (!err.response) {
          this.setState(prevState => ({
            error: "Unknown error"
          }));
        } else if (err.response.status === 401) {
          this.setState(prevState => ({
            error: "wrong password"
          }));
        } else if (err.response.status === 500) {
          this.setState(prevState => ({
            error: "Whoops! Something went wrong :( Our best programmers are working on it!"
          }));
        }
      });
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = email => e => {
    e.preventDefault();
    if (this.state.verifyNewPassword !== this.state.newPassword) {
      this.setState({
        error: "please verify your new password"
      });
    } else {
      const { password, newPassword } = this.state;
      this.passwordChange({ email, password, newPassword });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="container mx-auto text-center">
          <h1 className="text-main-title text-center py-4"> Change password </h1>
          {/* Form Start */}
          <ProductConsumer>
            {value => {
              const { user } = value;
              return (
                <form className="log-form" onSubmit={this.handleSubmit(user.email)}>
                  {/* old password */}
                  <div className="form-group">
                    <label htmlFor="password">Old password</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Enter old password"
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  {/* new password */}
                  <div className="form-group">
                    <label htmlFor="newPassword">New password</label>
                    <input
                      type="password"
                      id="newPassword"
                      className="form-control"
                      placeholder="Enter new password"
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  {/* verify new password */}
                  <div className="form-group">
                    <label htmlFor="verifyNewPassword">Verify new password</label>
                    <input
                      type="password"
                      id="verifyNewPassword"
                      className="form-control"
                      placeholder="Re-enter new password"
                      onChange={this.handleChange}
                      required
                    />
                  </div>

                  <div className="input-field py-3">
                    <button type="submit" className="btn btn-primary">
                      Send
                    </button>
                    {this.state.error && <div>{this.state.error}</div>}
                  </div>
                </form>
              );
            }}
          </ProductConsumer>
        </div>
      </React.Fragment>
    );
  }
}

export default ChangePassword;
