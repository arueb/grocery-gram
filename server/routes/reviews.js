const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Review, validate } = require("../models/review");
const { User } = require("../models/user");
const { Recipe } = require("../models/recipe")

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // check to make sure the specified user exists
  let user = {};
  try {
    user = await User.findOne({ _id: req.body.userId });
    if (!user) return res.status(404).send("The specified user does not exist");
  } catch (err) {
    console.log("Problem Finding User.  Error:", err);
    return res.status(500).send("Problem with userId");
  }

  // check to make sure the specified recipe exists
  let recipe = {};
  try {
    recipe = await Recipe.findOne({ _id: req.body.recipeId });
    if (!recipe) return res.status(404).send("The specified recipe does not exist");
  } catch (err) {
    console.log("Problem Finding Recipe.  Error:", err);
    return res.status(500).send("Problem with recipeId");
  }

  // Try creating a review
  let review = {};
  try {
    review = new Review(req.body);
    await review.save();
    console.log("New review saved id=" + review._id);
  } catch (err) {
    return res.status(500).send("Problem saving recipe to db", err)
  }

  // Try updating user.reviews
  try {
    await User.findByIdAndUpdate(user._id,
      { $push: { reviews: review._id } }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send("Problem updating user reviews array")
  }

  // Try updating recipe.reviews
  try {
    await Recipe.findByIdAndUpdate(recipe._id,
      { $push: { reviews: review._id } }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send("Problem updating recipe reviews array")
  }

  res.status(201).json(review);
});

router.get("/", async (req, res) => {
  try {
    const reviews = await Review.aggregate([
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

    // remove user data except username
    reviews.forEach(review => {
      review.username = review.user[0].username;
      delete review.user;
    })

    res.send(reviews);
  } catch (err) {
    res.status(500).send("Error getting reviews");
  }
});

router.delete('/:id', async (req, res) => {
  // check to make sure the specified review exists
  let review = {}
  try {
    review = await Review.findByIdAndRemove(req.params.id);
    if (!review) {
      return res.status(404).send("The recipeId could not be found.");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something failed finding & deleting the review.");
  }

  // Remove review from the reviewers user.reviews
  try {
    await User.updateOne({reviews: review._id},
      { $pull: { reviews: review._id } });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something failed updating the user.");
  }

  // Remove the review from recipe.reviews
  try {
    await Recipe.updateOne({reviews: review._id},
      { $pull: { reviews: review._id } });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something failed updating the recipe.");
  }

  res.sendStatus(204);
});

module.exports = router;