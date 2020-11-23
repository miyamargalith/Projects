const contactRouter = require("express").Router();
const { findAllContacts, registerNewContact, updateContactActive } = require("./contact-service");

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

contactRouter.get("/contactUsAll", sessionChecker, async (req, res) => {
  const contacts = await findAllContacts();
  res.json(contacts);
});

contactRouter.post("/contactUs", sessionChecker, async (req, res) => {
  const newContact = req.body;
  const contact = await registerNewContact(newContact);
  if (contact) {
    res.status(200).send(contact);
  } else {
    res.status(401).send(`error`);
  }
});

contactRouter.post("/adminContactUs", sessionChecker, async (req, res) => {
  const { id } = req.body;
  const contact = await updateContactActive(id);
  if (contact) {
    res.status(200).send(contact);
  } else {
    res.status(401).send(`error`);
  }
});

module.exports = contactRouter;
