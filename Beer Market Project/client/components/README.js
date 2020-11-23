import React, { Component } from "react";
import { NavWrapper, IconWrapper } from "./navbar/Nav-style";

export default class README extends Component {
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
          <h1 className="text-main-title text-center py-4"> README Page </h1>
          <h5 className="grey-text text-darken-3 pb-3">
            {" "}
            Please select who's README page to see by clicking the relevant tab.{" "}
          </h5>
          <ul className="nav nav-tabs" id="READMETabs" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link active"
                id="LiaTab"
                data-toggle="tab"
                href="#LiaTabContent"
                role="tab"
                aria-controls="LiaTabContent"
                aria-selected="true"
              >
                Lia Levy
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="MiyaTab"
                data-toggle="tab"
                href="#MiyaTabContent"
                role="tab"
                aria-controls="MiyaTabContent"
                aria-selected="false"
              >
                Miya Margalith
              </a>
            </li>
          </ul>
          <div className="tab-content text-left" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="LiaTabContent"
              role="tabpanel"
              aria-labelledby="LiaTab"
            >
              <ol className="pt-3">
                <li className="pb-3">
                  <u>Full name:</u> Lia Levy <br />
                  <u>ID:</u> 311352488 <br />
                </li>
                <li className="pb-3">
                  {" "}
                  <u>Store name:</u> Beer Market
                </li>
                <li className="pb-3">
                  {" "}
                  <u>What are you selling?</u> Beers
                </li>
                <li>
                  {" "}
                  <u>What additional pages did you add? How to operate them</u>
                  <br />
                  <p>
                    <b>Special instructions:</b> <br />
                    The admin is : Email - admin@beerMarket.com, password - Aa123456
                    <br />
                    The user to checkout with paypal is: beerpay@gmail.com, password -beerpay2019{" "}
                    <br />
                    To run the test.js you should run the server with - "NODE_ENV=test npm start",{" "}
                    <br />
                    go to the src folder (where the test.js file is) and run with "node test.js" the
                    test file.
                    <br />
                    <b>additional pages:</b> <br />
                    currency converter - we sell our products in us dollars, if you want to check
                    the price in other currency like ILS/GBP/EUR/CAD you can type the amount, check
                    the desired checkboxes and we will display the results according to updated
                    rates. <br />
                    contactUs - if you wish to write us a message, fill in the details in the form
                    and admin will see it in a designated page. <br /> user page - shows your
                    details, link to change password. displays your previous purchases.
                    <br />
                    change password - type your current password and new one and submit.
                    <br />
                    inquiries - only visible for admin. displays the messages from the users. admin
                    can mark a message as done and handled. the page is divided to tabs to filter
                    active/inactive/all inquiries.
                  </p>
                </li>
                <li>
                  {" "}
                  <u> What was hard to do?</u>
                  <br />
                  <p>
                    starting the project,understanding the connection between client and server and
                    writing in react for the first time. there was a big learning curve. this
                    project was hard because with very little experience, it took a lot of time and
                    effort. now that it is done i can say i have learnd a lot!
                  </p>
                </li>
                <li>
                  {" "}
                  <u> Who is your partner?</u> My partner is Miya Margalith - 208406645 <br />
                  <u> What did you do? What did your partner do?</u> <br />
                  <p>
                    Throughout the project the coding part was done together. We studied and made
                    some research each one on her own and then completed and coded the things
                    together. It was very helpful to do it this way. A few of the things I had a big
                    part in was the work with the DB/server requests and manage the users - like the
                    sign in and sign up components. A few of the things Miya worked on were the
                    additional functional pages and bootstrap.
                  </p>
                </li>
                <li>
                  {" "}
                  <u> Specify all the different route your app supports</u> <br />
                  <p>
                    / main page of the app, /cart, /signIn, /signUp, /admin – admin’s page, /search
                    – result page of navbar search,/details – a detail page for each beer,
                    /completePay – if a user completed a purchase he will be redirected to here,
                    /userPage, /currencyConverter, /contactUs, /changePassword, /adminContactUs and
                    /README.html.
                  </p>
                </li>
                <li>
                  {" "}
                  <u> How did you make your store secured?</u>
                  <br />
                  <p>
                    We used private route to authenticate the session and we authenticated the
                    session in every server request.
                  </p>
                </li>
                <li>
                  {" "}
                  <u> Did you implement the store using react.js?</u> YES.
                </li>
              </ol>
            </div>
            <div
              className="tab-pane fade"
              id="MiyaTabContent"
              role="tabpanel"
              aria-labelledby="MiyaTab"
            >
              <ol className="pt-3">
                <li className="pb-3">
                  <u>Full name:</u> Miya Margalith <br />
                  <u>ID:</u> 208406645 <br />
                </li>
                <li className="pb-3">
                  {" "}
                  <u>Store name:</u> Beer Market
                </li>
                <li className="pb-3">
                  {" "}
                  <u>What are you selling?</u> Beers
                </li>
                <li>
                  {" "}
                  <u>What additional pages did you add? How to operate them</u>
                  <br />
                  <p>
                    <b>Special instructions: </b>
                    <br />
                    The admin is : Email - admin@beerMarket.com, password - Aa123456
                    <br />
                    The user to checkout with paypal is: beerpay@gmail.com, password -beerpay2019{" "}
                    <br />
                    To run the test.js you should run the server with - "NODE_ENV=test npm start",{" "}
                    <br />
                    go to the src folder (where the test.js file is) and run with "node test.js" the
                    test file.
                    <br />
                    <b>We added 5 additional page.</b>
                    <br /> Currency Converter - converts a amount of money from USD to either ILS,
                    EUR, GBP or CAD. In order to operate the page you can fill in the text box with
                    the wanted amount to convert and the click on the checkboxes for the given
                    currency which you wish to see, submit, and the prices will be shown on screen.{" "}
                    <br />
                    Contact Us – a contact us form to the store. In order to operate the page you
                    simply fill up the form and submit. <br />
                    Change password – a page to change the logged in user’s password. In order to
                    operate the page fill in the form and submit. A link to this page can be found
                    in the user’s page.
                    <br />
                    Manage inquiries – a page which is available only to the admin user. In this
                    page the admin can see all the inquires (the contact us from all users). As you
                    enter the page you see all inquiries, and you can switch between the tabs to see
                    only active inquiries or inactive inquiries as well. In addition you can also
                    mark an inquiry as done by clicking the button next to each inquiry.
                    <br /> Users page - were you can see details about the user and recent purchase,
                    and a link to the change password page
                  </p>
                </li>
                <li>
                  {" "}
                  <u> What was hard to do?</u>
                  <br />
                  <p>
                    I think that the most difficult part was to start the project. It is the first
                    time I encountered with a coding project in this size without any prepared code
                    given to us. The whole learning process of all the new concepts throughout the
                    whole project was hard for me.
                  </p>
                </li>
                <li>
                  {" "}
                  <u> Who is your partner?</u> Lia Levy - 311352488 <br />
                  <u> What did you do? What did your partner do?</u> <br />
                  <p>
                    We did most of the coding and the project itself together. We work very well and
                    complete each other in many ways. One finds the idea and the other find a way to
                    improve it or even fill the missing parts. I focused on the additional pages and
                    the app styling, while Lia focused on the user management and the workflow with
                    the DB/server.
                  </p>
                </li>
                <li>
                  {" "}
                  <u> Specify all the different route your app supports</u> <br />
                  <p>
                    / – to see all the beers, /cart,/details – to see a beers description, /search –
                    to see the results of the search from the navbar, /completePay – a page when a
                    checkout was successful, /signIn, /signUp, /admin – admin’s page, /userPage,
                    /currencyConverter, /contactUs, /changePassword, /adminContactUs – the manage
                    inquiries page, and this page /README.html.
                  </p>
                </li>
                <li>
                  {" "}
                  <u> How did you make your store secured?</u>
                  <br />
                  <p>
                    In order to make the store secured we did a few things. Among those things are –
                    we added a Private Route for all the routes which you need to be a user in order
                    to see, we tried to keep all content available for the user without private or
                    confidential information, we used the cookies to check the sessions etc.
                  </p>
                </li>
                <li>
                  {" "}
                  <u> Did you implement the store using react.js?</u> Yes, it is implemented in
                  react.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
