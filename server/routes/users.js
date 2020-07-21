const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const { Recipe } = require("../models/recipe");

// create new user
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res
      .status(400)
      .send("A user with this email address is already registered.");

  user = await User.findOne({ username: req.body.username });
  if (user)
    return res
      .status(400)
      .send("A user with this username is already registered.");

  user = new User(_.pick(req.body, ["username", "email", "password"]));
  user.addedItems = [];
  user.removedItems = [];
  user.itemCounts = [];
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();

  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(
      _.pick(user, [
        "_id",
        "username",
        "email",
        "addedItems",
        "removedItems",
        "itemCounts",
      ])
    );
});  

// update given user's properties with properties sent in request body
router.patch("/:id", async (req, res) => {
  const { error } = validate(req.body, true); // ignore required
  if (error) return res.status(400).send(error.details[0].message);

  // for email change: ensure requested email is unique in db
  if (req.body.email) {
    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(400)
        .send("A user with this email address is already registered.");
  }

  // for username change: ensure requested username is unique in db
  if (req.body.username) {
    const user = await User.findOne({ username: req.body.username });
    if (user)
      return res
        .status(400)
        .send("A user with this username is already registered.");
  }
  
  // make requested updates to user
  try {
    const user = await User.findOneAndUpdate(    
      { _id: req.params.id },
      { $set: req.body },  
      { new: true }    
    ); 

    if (!user)
      return res.status(404).send("The user with the given ID was not found.");    

      // Need to remove password key from output
      user.password = undefined;

      res.json(user);    
  } catch (err) {
    res.status(500).send("Something failed", err);
  }
});

// get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort("username");
    // res.send(users);
    res.send(
      _.map(
        users,
        _.partialRight(_.pick, [
          "_id",
          "username",
          "email",
          "addedItems",
          "removedItems",
          "itemCounts",
        ])
      )
    );
  } catch (err) {
    res.status(500).send("Something failed");
  }
});

// get user with given id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).send("The user with the given ID was not found.");

    res.send(
      _.pick(user, [
        "_id",
        "username",
        "email",
        "addedItems",
        "removedItems",
        "itemCounts",
      ])
    );
  } catch (err) {
    // id isn't valid mongo ID (e.g. ID isn't 24 chars)
    res.status(500).send("Something failed.");
  }
});

// get all recipes for user with given id
router.get("/:id/recipes", async (req, res) => {
  try {
    // const user = await User.findById(req.params.id);
    // if (!user)
    //   return res.status(404).send("The user with the given ID was not found.");

    const recipes = await Recipe.find({ userId: req.params.id });
    console.log(recipes);
    res.send(recipes);
  } catch (err) {
    // id isn't valid mongo ID (e.g. ID isn't 24 chars)
    res.status(500).send("Something failed.");
  }
});

module.exports = router;
