const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  _id: String,
  name: String,
  email: String,
  phoneNumber: String,
  description: String,
  time: String,
  active: Boolean
});
const Contact = new mongoose.model("contact", contactSchema);

module.exports = Contact;
