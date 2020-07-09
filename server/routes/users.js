const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res
      .status(400)
      .send("A user with this email address is already registered.");

  user = new User(_.pick(req.body, ["username", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();

  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "name", "email"]));
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort("username");
    res.send(users);
  } catch (err) {
    res.status(500).send("Something failed");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id); 
    if (!user) return res.status(404).send("The user with the given ID was not found.");
  
    res.send(user);     
  }
  catch (err) { // id isn't valid mongo ID (e.g. ID isn't 24 chars)
    res.status(500).send("Something failed.");
  }
});

module.exports = router;
