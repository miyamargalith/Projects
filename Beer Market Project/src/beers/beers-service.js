const Beer = require("./beer-model");
const _ = require("lodash");

async function findAllBeers() {
  const beers = await Beer.find({});
  return _.map(beers, sanitizeBeer);
}

function sanitizeBeer(beer) {
  return {
    id: beer._id,
    ...beer._doc
  };
}

module.exports = {
  findAllBeers
};
