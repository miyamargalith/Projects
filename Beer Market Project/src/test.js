//to test our app with this file please use the command:
//NODE_ENV=test npm start

fetch = require("node-fetch");

async function testing() {
  const date = new Date();
  let time = date.toLocaleDateString() + " " + date.toLocaleTimeString();
  /*************************************************************** *
   * users test starts here
   *************************************************************** */
  //signUp user #1
  let user1 = await registerNewUserTest(
    (firstName = "user"),
    (lastName = "1"),
    (email = "user1@test.com"),
    (password = "1111")
  );

  //signUp user #2
  let user2 = await registerNewUserTest(
    (firstName = "user"),
    (lastName = "2"),
    (email = "user2@test.com"),
    (password = "2222")
  );
  //signUp user #3
  let user3 = await registerNewUserTest(
    (firstName = "user"),
    (lastName = "3"),
    (email = "user3@test.com"),
    (password = "3333")
  );
  //signUp user #4 with an existing mail
  let user4 = await registerNewUserTest(
    (firstName = "user"),
    (lastName = "4"),
    (email = "user1@test.com"),
    (password = "4444")
  );
  console.log("Register 3 New Users. On success the 3 users objects will be printed.");
  console.log({ user1 });
  console.log({ user2 });
  console.log({ user3 });

  console.log("Register a new user with an existing mail. On success an error will be printed.");
  console.log("The error is: " + user4);

  //logIn user #1
  let logIn1 = await loginUserTest(
    (email = "user1@test.com"),
    (password = "1111"),
    (rememberMe = false)
  );
  console.log("Log in the first user. On success the user's object will be printed: ");
  console.log({ logIn1 });

  //logIn user #2 with a wrong password
  let logIn2 = await loginUserTest(
    (email = "user2@test.com"),
    (password = "1111"),
    (rememberMe = false)
  );
  console.log(
    "Log in the second user with a wrong password. On success an error will be printed: "
  );
  console.log({ logIn2 });

  // logIn user #3 with a wrong email
  let logIn3 = await loginUserTest(
    (email = "user33@test.com"),
    (password = "3333"),
    (rememberMe = false)
  );
  console.log("Log in the third user with a wrong email. On success an error will be printed:");
  console.log({ logIn3 });

  // logIn a user that doesn't exist
  let logIn4 = await loginUserTest(
    (email = "no@test.com"),
    (password = "3333"),
    (rememberMe = false)
  );
  console.log(
    "Log in with an email and password which doesn’t exist. On success an error will be printed."
  );
  console.log({ logIn4 });

  // logIn user #2 with rememberMe
  let logIn5 = await loginUserTest(
    (email = "user2@test.com"),
    (password = "2222"),
    (rememberMe = true)
  );
  console.log(
    "Log in the second user with the remember me option. On success the user's object will be printed: "
  );
  console.log({ logIn5 });

  //change password user #2
  let changePass1 = await changeUserPasswordTest(
    (email = "user2@test.com"),
    (password = "2222"),
    (newPassword = "22")
  );
  console.log("Change password for second user. On success the user will be printed");
  console.log({ changePass1 });

  //change password user #2 with a wrong password
  let changePass2 = await changeUserPasswordTest(
    (email = "user2@test.com"),
    (password = "2222"),
    (newPassword = "22")
  );
  console.log(
    "Change password for second user, with the old password. On success an error will be printed"
  );
  console.log({ changePass2 });

  //logIn user #2 with the old password
  let logIn6 = await loginUserTest(
    (email = "user2@test.com"),
    (password = "2222"),
    (rememberMe = true)
  );
  console.log("Log in the second user with the old password. On success an error will be printed ");
  console.log({ logIn6 });

  //logIn user #2 with the new password
  let logIn7 = await loginUserTest(
    (email = "user2@test.com"),
    (password = "22"),
    (rememberMe = true)
  );
  console.log("Log in the second user with the new password. On success the user will be printed");
  console.log({ logIn7 });

  //logOut user2
  let logOut1 = await logoutUserTest();
  console.log({ logOut1 });

  /*************************************************************** *
   * beers test starts here
   *************************************************************** */

  // get all beers
  let beers = await getBeersTest();
  console.log("Get all beers. On Success an array with the beers objects will be printed:");
  console.log({ beers });

  /*************************************************************** *
   * activities test starts here
   *************************************************************** */

  //write a new activity
  let activity1 = await createNewActivityTest({
    name: "visit item",
    description: "user user1@test.com visited item Goldstar",

    userEmail: "user1@test.com",
    time: time
  }).then({});
  console.log(
    "Write a new - visit item activity. On success the new activity object will be printed."
  );
  console.log({ activity1 });

  //write a new check out activity
  const cartActivity = [{ beer: "Stella Artois", count: 5 }];
  let activity2 = await createNewActivityTest({
    name: "checkout",
    description: "user user1@test.com checked out",
    cart: JSON.stringify(cartActivity),
    cartTotal: "8.8",
    userEmail: "user1@test.com",
    time: time
  });
  console.log(
    "Write a new - check out activity. On success the new activity object will be printed."
  );
  console.log({ activity2 });

  //get user1 checkout activities
  let user1CheckoutActivities = await getUserCheckoutTest((userEmail = "user1@test.com"));
  console.log(
    "Get all checkout activities of the first user. On success an array with the user’s checkout activities will be printed."
  );
  console.log({ user1CheckoutActivities });

  //get non existing user checkout activities
  let userNonExistCheckoutActivities = await getUserCheckoutTest((userEmail = "no@test.com"));
  console.log(
    "Get all checkout activities of a non existing user. On success an empty array will be printed."
  );
  console.log({ userNonExistCheckoutActivities });

  // get all activities
  let allActivities = await getAllActivitiesTest();
  console.log(
    "Get all activities. On success an array with the activities objects will be printed."
  );
  console.log({ allActivities });

  /*************************************************************** *
   * contact us test starts here
   *************************************************************** */

  //create new inquiry
  let contactUs1 = await createNewContactTest(
    (name = "user"),
    (email = "user1@test.com"),
    (phoneNumber = "0540000000"),
    (description = "I would like to suggest a new beer of my own"),
    (time = time),
    (active = true)
  );
  console.log(
    "Write a new contact us inquiry. On success the new inquiry’s object will be printed:"
  );
  console.log({ contactUs1 });

  // mark inquiry as done
  let done = await doneWithContactTest(contactUs1.id);
  console.log(
    "Change inquiry 1 from active to inactive. On success the inquiry 1’s object will be printed with the active field as false."
  );
  console.log({ done });

  // get all inquiries
  let allInquiries = await getAllContactsTest();
  console.log("Get all inquiries. On success an array with the inquiries objects will be printed:");
  console.log({ allInquiries });
}

/*************************************************************** *
 * users functions starts here
 *************************************************************** */
async function registerNewUserTest(firstName, lastName, email, password) {
  return await fetch("http://localhost:3000/api/users/signUp/", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    })
  }).then(res => {
    if (res.status === 200) {
      return res.json();
    } else {
      return res.text();
    }
  });
}

async function loginUserTest(email, password, rememberMe) {
  return await fetch("http://localhost:3000/api/users/signIn/", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
      rememberMe: rememberMe
    })
  }).then(res => {
    if (res.status === 200) {
      return res.json();
    } else {
      return res.text();
    }
  });
}

async function logoutUserTest() {
  return await fetch("http://localhost:3000/api/users/", {
    method: "GET"
  }).then(res => {
    return res.text();
  });
}

async function changeUserPasswordTest(email, password, newPassword) {
  return await fetch("http://localhost:3000/api/users/userPage", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
      newPassword: newPassword
    })
  }).then(res => {
    if (res.status === 200) {
      return res.json();
    } else {
      return res.text();
    }
  });
}

/*************************************************************** *
 * beers functions starts here
 *************************************************************** */

async function getBeersTest() {
  return await fetch("http://localhost:3000/api/beers/", {
    method: "GET"
  }).then(res => {
    if (res.status === 200) {
      return res.json();
    } else {
      return res.text();
    }
  });
}

/*************************************************************** *
 * activities functions starts here
 *************************************************************** */

async function getAllActivitiesTest() {
  return await fetch("http://localhost:3000/api/activities/admin", {
    method: "GET"
  }).then(res => {
    if (res.status === 200) {
      return res.json();
    } else {
      return res.text();
    }
  });
}

async function getUserCheckoutTest(userEmail) {
  return await fetch("http://localhost:3000/api/activities/userPage", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      userEmail: userEmail
    })
  }).then(res => {
    if (res.status === 200) {
      return res.json();
    } else {
      return res.text();
    }
  });
}

async function createNewActivityTest({ name, description, cart, cartTotal, userEmail, time }) {
  return await fetch("http://localhost:3000/api/activities/", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name: name,
      description: description,
      cart: cart,
      cartTotal: cartTotal,
      userEmail: userEmail,
      time: time
    })
  }).then(res => {
    if (res.status === 200) {
      return res.json();
    } else {
      return res.text();
    }
  });
}

/*************************************************************** *
 * contact functions starts here
 *************************************************************** */

async function getAllContactsTest() {
  return await fetch("http://localhost:3000/api/contact/contactUsAll", {
    method: "GET"
  }).then(res => {
    if (res.status === 200) {
      return res.json();
    } else {
      return res.text();
    }
  });
}

//active is bool
async function createNewContactTest(name, email, phoneNumber, description, time, active) {
  return await fetch("http://localhost:3000/api/contact/contactUs", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      description: description,
      time: time,
      active: active
    })
  }).then(res => {
    if (res.status === 200) {
      return res.json();
    } else {
      return res.text();
    }
  });
}

async function doneWithContactTest(id) {
  return await fetch("http://localhost:3000/api/contact/adminContactUs", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      id: id
    })
  }).then(res => {
    if (res.status === 200) {
      return res.json();
    } else {
      return res.text();
    }
  });
}

testing();
