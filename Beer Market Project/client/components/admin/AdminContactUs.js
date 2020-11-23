import React, { Component } from "react";
import Navbar from "../navbar/Navbar";
import _ from "lodash";
import ShowInquiries from "./ShowInquiries";
import { getAllContacts } from "../../api/contact-api";

export default class AdminContactUs extends Component {
  state = {
    contacts: [],
    activeContacts: [],
    inactiveContacts: [],
    sortedContacts: []
  };

  isActive = item => {
    return item.active === true;
  };
  isInactive = item => {
    return item.active === false;
  };
  setContacts = () => {
    getAllContacts()
      .then(contacts => {
        const activeContacts = contacts.filter(this.isActive);
        const inactiveContacts = contacts.filter(this.isInactive);
        this.setState({
          contacts: contacts,
          activeContacts: activeContacts,
          inactiveContacts: inactiveContacts,
          sortedContacts: _.concat(activeContacts, inactiveContacts)
        });
      })
      .catch(err => {
        if (!err.response) {
          console.error(err);
        } else if (err.response.status === 401) {
          this.props.history.push("/signIn");
        } else if (err.response.status === 500) {
          console.log("Whoops! Something went wrong :( Our best programmers are working on it!");
        }
      });
  };
  componentDidMount() {
    this.setContacts();
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />

        <div className="container mx-auto">
          <h1 className="text-main-title text-center pt-4 pb-5"> Manage Inquiries Page</h1>
          <ul className="nav nav-tabs" id="inquiriesTabs" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link active"
                id="allInquiries"
                data-toggle="tab"
                href="#allInquiriesContent"
                role="tab"
                aria-controls="allInquiriesContent"
                aria-selected="true"
              >
                All inquiries
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="activeInquiries"
                data-toggle="tab"
                href="#activeInquiriesContent"
                role="tab"
                aria-controls="activeInquiriesContent"
                aria-selected="false"
              >
                Active inquiries
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="inactiveInquiries"
                data-toggle="tab"
                href="#inactiveInquiriesContent"
                role="tab"
                aria-controls="inactiveInquiriesContent"
                aria-selected="false"
              >
                Inactive inquiries
              </a>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="allInquiriesContent"
              role="tabpanel"
              aria-labelledby="allInquiries"
            >
              <ShowInquiries inquiries={this.state.sortedContacts} func={this.setContacts} />
            </div>
            <div
              className="tab-pane fade"
              id="activeInquiriesContent"
              role="tabpanel"
              aria-labelledby="activeInquiries"
            >
              <ShowInquiries inquiries={this.state.activeContacts} func={this.setContacts} />
            </div>
            <div
              className="tab-pane fade"
              id="inactiveInquiriesContent"
              role="tabpanel"
              aria-labelledby="inactiveInquiries"
            >
              <ShowInquiries inquiries={this.state.inactiveContacts} func={this.setContacts} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
