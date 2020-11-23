const mongoose = require("mongoose");

const beerSchema = new mongoose.Schema({
  _id: String,
  image: String,
  title: String,
  volume: Number,
  price: Number,
  info: String,
  beerType: String,
  alcohol: Number
});
const Beer = new mongoose.model("beers", beerSchema);

module.exports = Beer;
