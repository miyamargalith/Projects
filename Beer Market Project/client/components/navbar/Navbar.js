import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ButtonContainer } from "../Button";
import { NavWrapper, IconWrapper } from "./Nav-style";
import Search from "../Search";
import { ProductConsumer } from "../../context";
import { logOutUser } from "../../api/users-api";
import { getAllContacts } from "../../api/contact-api";

export const AdminButton = () => {
  return (
    <ProductConsumer>
      {value => {
        const { user } = value;
        let adminButton = null;
        if (user.isAdmin) {
          adminButton = (
            <div>
              <li>
                <Link to="/admin" onClick={() => value.setActivities()} className="text-dark">
                  <span className="mr-2 ml-2">
                    <i className="fas fa-user-cog" />
                  </span>
                  Admin's page
                </Link>
              </li>
              <li>
                <Link to="/adminContactUs" className="text-dark">
                  <span className="mr-2 ml-2">
                    <i className="fas fa-envelope" />
                  </span>
                  Manage Inquiries
                </Link>
              </li>
            </div>
          );
        }
        return <React.Fragment>{adminButton}</React.Fragment>;
      }}
    </ProductConsumer>
  );
};

export default class Navbar extends Component {
  render() {
    return (
      <NavWrapper className="navbar navbar-expand-sm  px-sm-5">
        <Link to="/">
          <IconWrapper>
            <span>
              <i className="fas fa-beer" />
            </span>
          </IconWrapper>
        </Link>
        <ul className="navbar-nav align-items-center mr-5">
          <li className="nav-item ml-5">
            <Link to="/" className="nav-link">
              beers
            </Link>
          </li>
          <li className="nav-item ml-2">
            <Link to="/CurrencyConverter" className="nav-link">
              Currency Converter
            </Link>
          </li>
          <li className="nav-item ml-2">
            <Link to="/ContactUs" className="nav-link">
              Contact us
            </Link>
          </li>
          <li className="nav-item ml-2">
            <Search />
          </li>
        </ul>

        <ProductConsumer>
          {value => {
            const { user } = value;
            return (
              <div className="ml-auto mr-3">
                <div className="dropdown">
                  <button className="btn dropdown-toggle" type="button" data-toggle="dropdown">
                    Hi, {user.firstName}
                    <span className="caret" />
                  </button>
                  <ul className="dropdown-menu bg-light ">
                    <li>
                      <Link
                        to="/userPage"
                        className="text-dark"
                        onClick={() => value.setUserCheckoutActivities()}
                      >
                        <span className="mr-2 ml-2">
                          <i className="fas fa-user-alt" />
                        </span>
                        User's page
                      </Link>
                    </li>
                    <li>
                      <Link to="/cart" className="text-dark">
                        <span className="mr-2 ml-2">
                          <i className="fas fa-shopping-cart" />
                        </span>
                        My cart
                      </Link>
                    </li>
                    {/* <li> */}
                    <AdminButton />
                    {/* </li> */}
                    <li>
                      <Link
                        to="/signIn"
                        onClick={() =>
                          logOutUser().catch(err => {
                            console.log(err);
                            return null;
                          })
                        }
                        className="text-dark"
                      >
                        <span className="mr-2 ml-2">
                          <i className="fas fa-sign-out-alt" />
                        </span>
                        Sign out
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            );
          }}
        </ProductConsumer>

        <Link to="/cart">
          <ButtonContainer>
            <span className="mr-2 ml-2">
              <i className="fas fa-shopping-cart" />
            </span>
            cart
          </ButtonContainer>
        </Link>
      </NavWrapper>
    );
  }
}
