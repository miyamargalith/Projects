const Contact = require("./contact-model");
const _ = require("lodash");
const mongoose = require("mongoose");

async function findAllContacts() {
  const contacts = await Contact.find({});
  return _.map(contacts, sanitizeContact);
}

function sanitizeContact(contact) {
  return {
    id: contact._id,
    ...contact._doc
  };
}

async function registerNewContact(contactData) {
  const dbFields = _.pick(contactData, [
    "name",
    "email",
    "phoneNumber",
    "description",
    "time",
    "active"
  ]);
  // Generate a new ObjectId
  const uId = new mongoose.Types.ObjectId();

  const contact = await Contact.create({
    _id: uId,
    ...dbFields
  });
  return sanitizeContact(contact);
}

async function updateContactActive(contactData) {
  const updatedContact = await Contact.findOneAndUpdate(
    {
      _id: contactData
    },
    { active: false },
    { new: true }
  );
  if (!updatedContact) {
    return null;
  }
  return sanitizeContact(updatedContact);
}

module.exports = {
  findAllContacts,
  registerNewContact,
  updateContactActive
};
