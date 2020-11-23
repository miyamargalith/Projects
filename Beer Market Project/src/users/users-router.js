const router = require("express").Router();
const { registerNewUser, authenticateUser, updateUserPassword } = require("./users-service");

async function sessionChecker(req, res, next) {
  if (process.env.NODE_ENV === "test") {
    next();
  } else {
    if (!req.session.user) {
      res.sendStatus(401);
    } else {
      next();
    }
  }
}

router.get("/signIn", sessionChecker, async (req, res) => {
  res.status(200).send(req.session.user);
});

router.post("/signUp", async (req, res) => {
  const newUser = req.body;
  const user = await registerNewUser(newUser);
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(401).send(`user alredy exists`);
  }
});

router.get("/", sessionChecker, async (req, res) => {
  req.session.destroy();
  res.status(200).send(`user is logged out`);
});

router.post("/signIn", async (req, res) => {
  const { email, password, rememberMe } = req.body;

  if (!email || !password) {
    res.status(500).send("User name or Password are missing!");
  }
  const user = await authenticateUser({ email, password });

  if (user) {
    req.session.user = user;
    if (rememberMe === "on") {
      req.session.cookie.expires = 1000 * 60 * 60 * 24 * 7 * 3; // 3 weeks
    }
    res.status(200).send(user);
  } else {
    res.status(401).send("Password incorrect or user does not exist!");
  }
});

router.post("/userPage", async (req, res) => {
  const { email, password, newPassword } = req.body;

  if (!email || !password || !newPassword) {
    res.status(500).send("User name or Password are missing!");
  }
  const user = await authenticateUser({ email, password });

  if (user) {
    const updatedUser = await updateUserPassword({ email, password, newPassword });
    if (updatedUser) {
      res.status(200).send(updatedUser);
    } else {
      //update failed
      res.status(401).send("Password incorrect or user does not exist!");
    }
  } else {
    //password is incorrect
    res.status(401).send("Password incorrect or user does not exist!");
  }
});

module.exports = router;
