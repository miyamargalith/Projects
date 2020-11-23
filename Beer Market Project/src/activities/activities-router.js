const activitiesRouter = require("express").Router();
const {
  findAllActivities,
  registerNewActivity,
  findUserActivities,
  findUserCheckout
} = require("./activities-service");

async function sessionChecker(req, res, next) {
  if (process.env.NODE_ENV === "test") {
    next();
  } else {
    if (!req.session.user) {
      res.status(401).send("Not authorized!");
    } else {
      next();
    }
  }
}

activitiesRouter.get("/admin", sessionChecker, async (req, res) => {
  const activities = await findAllActivities();
  res.json(activities);
});

activitiesRouter.post("/userPage", sessionChecker, async (req, res) => {
  const userEmail = req.body;
  const activities = await findUserCheckout(userEmail);
  res.json(activities);
});

activitiesRouter.post("/", sessionChecker, async (req, res) => {
  const newActivity = req.body;
  const activity = await registerNewActivity(newActivity);
  if (activity) {
    res.status(200).send(activity);
  } else {
    res.status(401).send(`error`);
  }
});

module.exports = activitiesRouter;
