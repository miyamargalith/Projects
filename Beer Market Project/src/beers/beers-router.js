const beersRouter = require("express").Router();
const { findAllBeers } = require("./beers-service");

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

beersRouter.get("/", sessionChecker, async (req, res) => {
  const beers = await findAllBeers();
  res.json(beers);
});

module.exports = beersRouter;
