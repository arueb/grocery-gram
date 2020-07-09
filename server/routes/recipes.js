const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Recipe, validate } = require("../models/recipe");
const { User } = require("../models/user");
const mongoose = require("mongoose");

router.get("/:id", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) return res.status(404).send("The recipeId could not be found.");
  res.send(recipe);
});

router.get("/:id/ingredients", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) return res.status(404).send("The recipeId could not be found.");

  //   const ingredientIds = recipe.ingredients.map((ingredient) => {
  //     return ingredient._id;
  //   });
  //   console.log(port);
  //   const db = mongoose.connection;
  //   console.log(db);
  //   const test = await db.collections.recipes;
  //   console.log(test);
  const recipeIng = await Recipe.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
    { $unwind: "$ingredients" },
    {
      $lookup: {
        from: "Item",
        localField: "ingredients.itemId",
        foreignField: "_id",
        as: "ingredients.item",
      },
    },
    // { $unwind: "$ingredients.item" },
    // {
    //   $group: {
    //     _id: "$_id",
    //     root: { $mergeObjects: "$$ROOT" },
    //     ingredients: { $push: "$ingredients" },
    //   },
    // },
    // {
    //   $replaceRoot: {
    //     newRoot: {
    //       $mergeObjects: ["$root", "$$ROOT"],
    //     },
    //   },
    // },
    // {
    //   $project: {
    //     root: 0,
    //   },
    // },
  ]);

  res.send(recipeIng);
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
