const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  _id: String,
  name: String,
  description: String,
  userEmail: String,
  cart: String,
  cartTotal: String,
  time: String
});
const Activities = new mongoose.model("activities", activitySchema);

module.exports = Activities;
