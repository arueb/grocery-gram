const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: { type: String, max: 128, required: true },
  userId: { type: String, max: 128, required: true },
  category: { type: String, max: 128, required: true },
  avgRating: { type: Number, min: 0, max: 5, default: 0 },
  numReviews: { type: Number, min: 0, default: 0 },
  isPublished: { type: Boolean, default: false },
  instructions: { type: String, max: 2048 },
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
  createdOn: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

validateRecipe = (recipe) => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(128).required(),
    userId: Joi.string().max(128).required(),
    category: Joi.string().max(128).required(),
    avgRating: Joi.number().min(0).max(5),
    numReviews: Joi.number().min(0),
    isPublished: Joi.boolean(),
    instructions: Joi.string().max(2048),
    ingredients: Joi.array(),
    createdOn: Joi.date(),
  });
  return schema.validate(recipe);
};

exports.Recipe = Recipe;
exports.validate = validateRecipe;
