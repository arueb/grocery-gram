const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Review, validate } = require("../models/review");
const { User } = require("../models/user");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check to make sure the specified user exists
  try {
    let user = await User.findOne({ _id: req.body.user });
    if (!user) return res.status(404).send("The user does not exist");
  } catch (err) {
    console.log("Problem Finding User.  Error:", err);
    console.log("k done");
    return res.status(500).send("Problem with userId");
  }

  let review = new Review(req.body);

  try {
    await review.save();
    console.log("New review saved id=" + review._id);
    res.status(201).json(review);
  } catch (err) {
    res.status(500).send("Problem saving recipe to db", err)
  }
});

module.exports = router;