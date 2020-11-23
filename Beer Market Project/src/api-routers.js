const router = require("express").Router();
const usersRouter = require("./users/users-router");
const beersRouter = require("./beers/beers-router");
const activitiesRouter = require("./activities/activities-router");
const contactRouter = require("./contact/contact-router");

router.use("/users", usersRouter);
router.use("/beers", beersRouter);
router.use("/activities", activitiesRouter);
router.use("/contact", contactRouter);

module.exports = router;
