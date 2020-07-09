const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { Recipe, validate } = require("../models/recipe");
const { User } = require("../models/user");

router.get("/", (req, res) => {
  res.send("list of recipes");
});

router.post("/", async (req, res) => {
  console.log("post request received", req.body);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ _id: req.body.userId });
  if (!user) return res.status(404).send("The userId does not exist");

  const recipe = new Recipe(
    _.pick(req.body, [
      "title",
      "userId",
      "avgRating",
      "ingredients",
      "updatedOn",
    ])
  );
  await recipe.save();

  res.send(
    _.pick(recipe, [
      "_id",
      "title",
      "userId",
      "avgRating",
      "ingredients",
      "updatedOn",
    ])
  );
});

module.exports = router;
