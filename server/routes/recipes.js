const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Recipe, validate } = require("../models/recipe");
const { User } = require("../models/user");
const mongoose = require("mongoose");
// get all recipes
// router.get("/", async (req, res) => {
//   try {
//     const recipes = await Recipe.find().sort("-updatedOn");
//     res.send(recipes);
//   } catch (err) {
//     res.status(500).send("Something failed");
//   }
// });

// get all PUBLISHED recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.aggregate([
      { $match: { isPublished: true } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          "user.password": 0,
          "user.addedItems": 0,
          "user.removedItems": 0,
          "user.email": 0,
          "user.itemCounts": 0,
          "user.date": 0,
          "user.savedRecipes": 0,
        },
      },
    ]);

    res.send(recipes);
  } catch (err) {
    res.status(500).send("Something failed");
  }
});

// get given recipe, ingredient item objects re
router.get("/:id", async (req, res) => {
  let recipe = await Recipe.findById(req.params.id);
  if (!recipe) return res.status(404).send("The recipeId could not be found.");

  try {
    // build aggregate pipeline to embed item object in ingredients array object
    recipe = await Recipe.aggregate([
      // filter to single result
      { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },

      // split into to multiple recipes with a single ingredient each
      { $unwind: "$ingredients" },

      // look up the item object and embed as new property 'item' in ingredients object
      {
        $lookup: {
          from: "items",
          localField: "ingredients.itemId",
          foreignField: "_id",
          as: "ingredients.item", // this is the name of the new property
        },
      },

      // converts newly added 'item' property to a single object instead of an object array
      { $unwind: "$ingredients.item" },

      // group everythign back together again into a single parent object
      {
        $group: {
          _id: "$_id",
          root: { $mergeObjects: "$$ROOT" },
          ingredients: { $push: "$ingredients" },
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ["$root", "$$ROOT"],
          },
        },
      },
      {
        $project: {
          root: 0,
        },
      },
    ]);

    res.send(recipe);
  } catch (err) {
    res.status(500).send("Something failed.", err);
  }
});

router.post("/", async (req, res) => {
  //console.log(req.body);
  // validate request body
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    // check to make sure the specified user exists
    let user = await User.findOne({ _id: req.body.userId });
    if (!user) return res.status(404).send("The userId does not exist");

    // create the recipe object from the request body and save
    const recipe = new Recipe(req.body);
    console.log(recipe);
    await recipe.save();
    console.log * "saved recipe successfully!";
    res.status(200).send(recipe); // send recipe back with response
  } catch (err) {
    res.status(500).send("Something failed.", err);
  }
});

// update given recipe's properties with properties sent in request body
router.patch("/:id", async (req, res) => {
  const { error } = validate(req.body, true); // ignore required
  if (error) return res.status(400).send(error.details[0].message);

  // if editing recipe's userId, first ensure it is present in db
  if (req.body.userId) {
    try {
      const user = await User.findOne({ _id: req.body.userId });
      if (!user) return res.status(404).send("The userId does not exist");
    } catch (err) {
      res.status(500).send("Something failed.", err);
    }
  }

  // make requested updates to recipe
  try {
    const recipe = await Recipe.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    if (!recipe)
      return res
        .status(404)
        .send("The recipe with the given ID was not found.");

    res.send(recipe);
  } catch (err) {
    res.status(500).send("Something failed", err);
  }
});

router.delete("/:id", async (req, res) => {
  // check to make sure the specified user exists
  try {
    let recipe = await Recipe.findByIdAndRemove(req.params.id);
    if (!recipe)
      return res.status(404).send("The recipeId could not be found.");
    res.send(recipe);
  } catch (err) {
    res.status(500).send("Something failed.", err);
  }
});

module.exports = router;
