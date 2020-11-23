const Activities = require("./activities-model");
const _ = require("lodash");
const mongoose = require("mongoose");

async function findAllActivities() {
  const activities = await Activities.find({});
  return _.map(activities, sanitizeActivity);
}

async function findUserCheckout(user) {
  const { userEmail } = user;
  const activities = await Activities.find({
    name: "checkout",
    userEmail: userEmail
  });
  return _.map(activities, sanitizeActivity);
}

function sanitizeActivity(activity) {
  return {
    id: activity._id,
    ...activity._doc
  };
}

async function registerNewActivity(activityData) {
  const dbFields = _.pick(activityData, [
    "name",
    "description",
    "cart",
    "cartTotal",
    "userEmail",
    "time"
  ]);
  // Generate a new ObjectId
  const uId = new mongoose.Types.ObjectId();

  const activity = await Activities.create({
    _id: uId,
    ...dbFields
  });
  return sanitizeActivity(activity);
}

module.exports = {
  findAllActivities,
  registerNewActivity,
  findUserCheckout
};
