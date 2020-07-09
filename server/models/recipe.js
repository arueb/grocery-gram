const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
// const config = require("config");
// const { string } = require("@hapi/joi");

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: { type: String, max: 128, required: true },
  userId: { type: String, max: 128, required: true },
  avgRating: { type: Number, min: 0, max: 5 },
  //   ingredients: [{ qty: Number, unit: String, item: String, notes: String }],
  ingredients: [
    {
      type: new Schema({
        qty: {
          type: Number,
          default: 1,
        },
        itemId: {
          type: mongoose.Schema.ObjectId,
          required: true,
          ref: "Item",
        },
        unit: {
          type: String,
        },
        notes: {
          type: String,
          maxLength: 64,
        },
      }),
    },
  ],
  updatedOn: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);
const db = mongoose.Connection;

validateRecipe = (recipe) => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(128).required(),
    userId: Joi.string().max(64).required(),
    avgRating: Joi.number().min(0).max(5),
    ingredients: Joi.array(),
    updatedOn: Joi.date(),
    // ingredients: Joi.array().items(
    //   Joi.object({
    //     qty: Joi.number(),
    //     unit: Joi.string(),
    //     item: Joi.string(),
    //     notes: string(),
    //   })
    // ),
  });
  return schema.validate(recipe);
};

exports.Recipe = Recipe;
exports.validate = validateRecipe;
