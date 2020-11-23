import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import ProductList from "./components/ProductList";
import Details from "./components/Details";
import Cart from "./components/cart/Cart";
import Default from "./components/Default";
import Modal from "./components/Modal";
import CompletePay from "./components/cart/CompletePay";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import ProductSearchList from "./components/ProductSearchList";
import AdminPage from "./components/admin/AdminPage";
import AdminContactUs from "./components/admin/AdminContactUs";
import UserPage from "./components/UserPage";
import CurrencyConverter from "./components/CurrencyConverter";
import ContactUs from "./components/ContactUs";
import ChangePassword from "./components/auth/ChangePassword";
import README from "./components/README";
import { PrivateRoute } from "./components/auth/SignIn";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <PrivateRoute exact path="/" component={ProductList} />
          <PrivateRoute path="/details" component={Details} />
          <PrivateRoute path="/cart" component={Cart} />
          <PrivateRoute path="/search" component={ProductSearchList} />
          <PrivateRoute path="/completePay" component={CompletePay} />
          <Route path="/signIn" component={SignIn} />
          <Route path="/signUp" component={SignUp} />
          <PrivateRoute path="/admin" component={AdminPage} />
          <PrivateRoute path="/userPage" component={UserPage} />
          <PrivateRoute path="/currencyConverter" component={CurrencyConverter} />
          <PrivateRoute path="/contactUs" component={ContactUs} />
          <PrivateRoute path="/changePassword" component={ChangePassword} />
          <PrivateRoute path="/adminContactUs" component={AdminContactUs} />
          <Route path="/README.html" component={README} />
          <PrivateRoute component={Default} />
        </Switch>
        <Modal />
      </React.Fragment>
    );
  }
}

export default App;
