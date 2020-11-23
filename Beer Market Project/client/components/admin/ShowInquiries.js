import React from "react";
import { doneWithContact } from "../../api/contact-api";

export default class ShowInquiries extends React.Component {
  state = {
    error: ""
  };
  render() {
    const inquiries = this.props.inquiries;
    const func = this.props.func;
    if (inquiries.length !== 0) {
      return (
        <div className="container pt-4">
          {" "}
          {inquiries.map(item => {
            const id = item.id;
            return (
              <div className="mb-4" key={item.id}>
                <div className="row mx-auto">
                  <div className="col col-8">
                    <u>
                      <b>
                        Message sent by <span className="text-capitalize">{item.name}</span>
                      </b>
                    </u>{" "}
                    at {item.time}.<br />
                    <u>User's contact details-</u>
                    <br />
                    Email: {item.email}, <br />
                    Phone number: {item.phoneNumber}
                    <br />
                    <u>Message:</u> <br />
                    {item.description}
                  </div>
                  <br />
                  <br />
                  <div className="col col-4">
                    <div className="container-fluid text-right ">
                      <button
                        className="btn btn-success"
                        disabled={!item.active}
                        onClick={() => {
                          doneWithContact({ id }).catch(err => {
                            if (!err.response) {
                              console.error(err);
                              this.setState(prevState => ({
                                error: "Unknown error"
                              }));
                            } else if (err.response.status === 401) {
                              this.props.history.push("/signIn");
                              this.setState(prevState => ({
                                error: "not authorized"
                              }));
                            } else if (err.response.status === 500) {
                              this.setState(prevState => ({
                                error:
                                  "Whoops! Something went wrong :( Our best programmers are working on it!"
                              }));
                            }
                          });
                          func();
                        }}
                      >
                        <span className="mr-2 ml-2">
                          <i className="fas fa-check" />
                        </span>
                        {item.active ? "Mark as done" : "done"}
                      </button>
                      {this.state.error && <div>{this.state.error}</div>}
                    </div>
                  </div>
                </div>
                <hr></hr>
              </div>
            );
          })}
        </div>
      );
    } else {
      return <p className="pt-3">No inquiries found at the moment</p>;
    }
  }
}
