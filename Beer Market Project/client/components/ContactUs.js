import React, { Component } from "react";
import Navbar from "./navbar/Navbar";
import { createNewContact } from "../api/contact-api";

class ContactUs extends Component {
  state = {
    email: "",
    description: "",
    name: "",
    phoneNumber: 0,
    active: true,
    error: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    const { email, description, name, phoneNumber, active } = this.state;
    const date = new Date();
    const time = date.toLocaleDateString() + " " + date.toLocaleTimeString();
    e.preventDefault();
    createNewContact({
      email: email,
      description: description,
      name: name,
      phoneNumber: phoneNumber,
      active: active,
      time: time,
      error: ""
    })
      .then((res, err) => {
        if (res) {
          alert("Your message has been sent");
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
          this.setState(prevState => ({
            error: "not authorized"
          }));
          this.props.history.push("/signIn");
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
        <Navbar />
        <div className="container mx-auto text-center">
          <h1 className="text-main-title text-center py-4"> Contact Us </h1>
          <h5 className="grey-text text-darken-3 pb-3">
            {" "}
            Please fill up the following form and we will contact you shortly.{" "}
          </h5>
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Enter name"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="col"></div>
            </div>
            <div className="row">
              <div className="col">
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
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone number</label>
                  <input
                    type="tel"
                    pattern="[0-9]*"
                    id="phoneNumber"
                    className="form-control"
                    placeholder="Enter Phone number (optional)"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="description">Message</label>
              <textarea
                type="text"
                id="description"
                className="form-control"
                placeholder="Enter your message"
                onChange={this.handleChange}
                className="form-control"
                rows="5"
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
        </div>
      </React.Fragment>
    );
  }
}

export default ContactUs;
