const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Recipe, validate } = require("../models/recipe");
const { User } = require("../models/user");
const mongoose = require("mongoose");

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
    es.status(500).send("Something failed.", err);
  }
});

router.post("/", async (req, res) => {
  console.log("post request received", req.body);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
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
    res.send(recipe);
  } catch (err) {
    res.status(500).send("Something failed.", err);
  }
});

module.exports = router;
