const User = require("./user-model");
const crypto = require("crypto");
const _ = require("lodash");
const mongoose = require("mongoose");

async function registerNewUser(userPayload) {
  const { password, email } = userPayload;
  const findUser = await User.findOne({
    email: email
  });

  if (findUser) {
    return null;
  }

  const dbFields = _.pick(userPayload, ["firstName", "lastName", "email"]);
  // Generate a new ObjectId
  const uId = new mongoose.Types.ObjectId();

  const hashPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("base64");

  const user = await User.create({
    _id: uId,
    hashPassword,
    ...dbFields
  });
  return sanitizeUser(user);
}

function sanitizeUser(user) {
  const sanitizedFields = _.pick(user, ["firstName", "lastName", "email"]);
  return {
    ...sanitizedFields,
    id: user._id
  };
}

async function findUserById(userId) {
  const rawUser = User.findOne({
    _id: userId
  });
  return sanitizeUser(rawUser);
}

async function authenticateUser(userPayload) {
  const { email, password } = userPayload;
  // create sha256
  const hashPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("base64");

  const rawUser = await User.findOne({
    email: email,
    hashPassword: hashPassword
  });

  if (!rawUser) {
    return null;
  }

  return sanitizeUser(rawUser);
}

async function updateUserPassword(userPayload) {
  const { email, password, newPassword } = userPayload;
  const hashPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("base64");

  const newHashPassword = crypto
    .createHash("sha256")
    .update(newPassword)
    .digest("base64");

  const updatedUser = await User.findOneAndUpdate(
    {
      email: email,
      hashPassword: hashPassword
    },
    { hashPassword: newHashPassword },
    { new: true }
  );
  if (!updatedUser) {
    return null;
  }
  return sanitizeUser(updatedUser);
}

module.exports = {
  registerNewUser,
  sanitizeUser,
  findUserById,
  authenticateUser,
  updateUserPassword
};
