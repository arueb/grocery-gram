const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  comments: { type: String, max: 2048 },
  rating: { type: Number, min: 0, max: 5, default: 0.0 },
  date: { type: Date, required: true, default: Date.now },
  user: { type: mongoose.Schema.ObjectId, ref: "User", required: true }
})

const Review = mongoose.model("Review", reviewSchema);

validateReview = (review, ignoreRequiredFields = false) => {
  const schema = Joi.object({
    comments: Joi.string().min(0).max(2048).required(),
    rating: Joi.number().min(0).max(5).required(),
    date: Joi.date(),
    user: Joi.string().min(2).max(128).required()
  });

  if (ignoreRequiredFields) {
    const optionalSchema = schema.fork(
      ['comments', 'rating', 'date', 'user'],
      (schema) => schema.optional()
    );
    return optionalSchema.validate(review);
  }
  return schema.validate(review);
}

exports.Review = Review;
exports.validate = validateReview;