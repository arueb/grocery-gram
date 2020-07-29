import React from 'react'
import Form from './common/form'
import Joi from "joi-browser";
import ReviewRow from "./common/reviewRow"
// import { getRecipe, deleteRecipe, updateRecipe, newRecipe, } from "../services/recipeService";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { getRecipe, getReviews } from "../services/recipeService"
import { newReview } from "../services/reviewService"
import AvgStarRating from "./common/avgStarRating";
import StarRating from "./common/starRating";

class RecipeDetail extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        reviewNotes: "",
        reviewStars: 0,
        title: "",
        author: "",
        category: "",
        isPublished: false,
        instructions: "",
      },
      reviews: [],
      errors: {},
    }
  }

  schema = {
    reviewNotes: Joi.string().required().label("Review Notes"),
    reviewStars: Joi.number().min(0).max(5).required(),
    author: Joi.any(),
    title: Joi.any(),
    category: Joi.any(),
    isPublished: Joi.any(),
    instructions: Joi.any(),
    avgRating: Joi.any(),
    numReviews: Joi.any(),
  };

  async componentDidMount() {
    // Load the Page
    await this.populateRecipe();

    // Load the reviews
    await this.populateReviews()
  }

  // populates reviews in state if valid recipe id
  async populateRecipe() {
    try {
      const recipeId = this.props.match.params.id;

      const { data: recipe } = await getRecipe(recipeId);

      const data = { ...this.state.data };
      data.title = recipe[0].title;
      data.category = recipe[0].category;
      data.instructions = recipe[0].instructions;
      data.isPublished = recipe[0].isPublished;
      data.author = recipe[0].username;
      data.avgRating = recipe[0].avgRating;
      data.numReviews = recipe[0].numReviews;
      this.setState({ data });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  // populates reviews in state if valid recipe id
  async populateReviews() {
    try {
      const recipeId = this.props.match.params.id;

      const { data: reviews } = await getReviews(recipeId);
      this.setState({ reviews });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  handleStarChange = (clickedStars) => {
    const data = { ...this.state.data };
    data.reviewStars = clickedStars
    this.setState({ data });
  }

  doSubmit = async () => {
    let toSubmit = {};
    toSubmit.comments = this.state.data.reviewNotes;
    toSubmit.rating = this.state.data.reviewStars
    toSubmit.userId = this.props.user._id;
    toSubmit.recipeId = this.props.match.params.id;
    await newReview(toSubmit);

    // Get the page again
    await this.populateReviews();

    const data = { ...this.state.data };
    data.reviewNotes = "";
    data.reviewStars = 0;
    this.setState({ data });
  }

  render() {
    return (
      <React.Fragment>
        <div className="row rdp-heading">
          <div className="col-md">
            <h2>{this.state.data.title}</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md rdp-author-block">
            by:<span className="rdp-author">@{this.state.data.author}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-10">
            <AvgStarRating
              avgRating={this.state.data.avgRating}
              numReviews={this.state.data.numReviews}
              starSize={25}
            />
          </div>
          <div className="col-2">
            Like this recipe:{" "}
            <span>
              <FaHeart />
              <FaRegHeart />
            </span>
          </div>
        </div>
        <div className="row">
          <div className="container-fluid img-no-padding col-12">
            <img
              className=""
              src="https://picsum.photos/1000/150"
              alt="lorem"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            <img
              className="text-center"
              src="https://picsum.photos/50"
              alt="lorem"
            />
          </div>
          <div className="col-2">
            <img
              className="text-center"
              src="https://picsum.photos/50"
              alt="lorem"
            />
          </div>
          <div className="col-2">
            <img
              className="text-center"
              src="https://picsum.photos/50"
              alt="lorem"
            />
          </div>
          <div className="col-2">
            <img
              className="text-center"
              src="https://picsum.photos/50"
              alt="lorem"
            />
          </div>
          <div className="col-2">
            <img
              className="text-center"
              src="https://picsum.photos/50"
              alt="lorem"
            />
          </div>
          <div className="col-2">
            <img
              className="text-center"
              src="https://picsum.photos/50"
              alt="lorem"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <p>{this.state.data.instructions}</p>
          </div>
          <div className="col-6">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Amount</th>
                  <th scope="col">Measure</th>
                  <th scope="col">Ingredient</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Cup</td>
                  <td>Flour</td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td>Gallons</td>
                  <td>Milk</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Dash</td>
                  <td>Coconut Oil</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <hr className="divider" />
        {/* <hr style={{ borderTop: "5px solid #8c8b8b" }} /> */}
        <h3 className="my-3">Review The Recipe</h3>
        <form onSubmit={this.handleSubmit}>
          <StarRating starSize={25} onChange={this.handleStarChange} />
          <br></br>
          {this.renderTextArea("reviewNotes", "", 3, "Add your review here")}
          {this.renderButton("Submit Review")}
        </form>
        {this.state.reviews.map((review) => (
          <ReviewRow
            key={review._id}
            username={review.username}
            comments={review.comments}
            date={review.date}
            rating={review.rating}
            starSize={20}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default RecipeDetail;