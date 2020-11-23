const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: String,
  hashPassword: String,
  firstName: String,
  lastName: String,
  email: String
});
const User = new mongoose.model("users", userSchema);

module.exports = User;
