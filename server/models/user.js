const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, max: 64, unique: true, required: true },
  username: { type: String, min: 3, max: 32, unique: true, required: true },
  password: { type: String, min: 3, max: 64, required: true },
  addedItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
  removedItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
  itemCounts: [
    {
      itemID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
      count: {
        type: Number,
        min: 0,
        default: 0,
      },
    },
  ],
  date: { type: Date, default: Date.now },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

// call User.validate(user, true) for validating PATCH request
validateUser = (user, ignoreRequiredFields = false) => {
    const schema = Joi.object({
    email: Joi.string().email().min(5).max(64).required(),
    username: Joi.string().alphanum().min(3).max(32).required(),
    password: Joi.string().alphanum().min(3).max(64).required(),
    addedItems: Joi.array(),
    removedItems: Joi.array(),
    itemCounts: Joi.array()
  });

  if (ignoreRequiredFields) {
    const optionalSchema = schema.fork(["email", "username", "password"], (schema) => schema.optional());
    return optionalSchema.validate(user);
  }
  return schema.validate(user);
};

exports.User = User;
exports.validate = validateUser;
