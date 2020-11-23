const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const apiRouters = require("./api-routers");
const { boot: bootMongo, shutdown: shutdownMongo } = require("./mongoose-setup");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "localhost" }));
app.use(morgan());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    key: "user_sid",
    secret: process.env.COOKIE,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 1000 * 60 * 5 // 5 minutes
    },
    rolling: true
  })
);

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
  }
  next();
});

app.use("/img", express.static(path.join(__dirname, "../assets/img")));
app.use("/api", apiRouters);

bootMongo();

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
app.on("error", () => {
  shutdownMongo();
});
