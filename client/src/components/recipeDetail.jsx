import React from "react";
import Joi from "joi-browser";
import ImageGallery from "react-image-gallery";
import Form from "./common/form";
import Like from "./common/like";
import ReviewRow from "./common/reviewRow";
import AvgStarRating from "./common/avgStarRating";
import StarRating from "./common/starRating";
// import { getRecipe, deleteRecipe, updateRecipe, newRecipe, } from "../services/recipeService";
import { getUserData } from "../services/userService";
import { FaPen } from "react-icons/fa";
import { getRecipe, getReviews } from "../services/recipeService";
import { newReview } from "../services/reviewService";
import "react-image-gallery/styles/css/image-gallery.css";
import { updateUserProperty } from "../services/userService";
class RecipeDetail extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        reviewNotes: "",
        reviewStars: 0,
        title: "",
        userId: "",
        author: "",
        category: "",
        isPublished: false,
        instructions: "",
      },
      reviews: [],
      isSaved: null,
      errors: {},
    };
  }

  schema = {
    reviewNotes: Joi.string().required().label("Review Notes"),
    reviewStars: Joi.number().min(0).max(5).required(),
    userId: Joi.any(),
    _id: Joi.any(),
    reviews: Joi.any(),
    images: Joi.any(),          // I am not sure if it's correct to just be ignoring all this stuff
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

    if (this.props.user) {
      // Load the user
      const user = await getUserData(this.props.user._id);

      // figure out if the recipe is saved
      const isSaved = user.data.savedRecipes.includes(this.state.data._id);
      this.setState({ savedRecipes: user.data.savedRecipes, isSaved });
    }

    // Load the reviews
    await this.populateReviews();
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
      data._id = recipe[0]._id;
      data.userId = recipe[0].userId;
      data.avgRating = recipe[0].avgRating;
      data.numReviews = recipe[0].numReviews;
      data.images = recipe[0].images;
      data.reviews = recipe[0].reviews;
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
    data.reviewStars = clickedStars;
    this.setState({ data });
  };

  doSubmit = async () => {
    let toSubmit = {};
    toSubmit.comments = this.state.data.reviewNotes;
    toSubmit.rating = this.state.data.reviewStars;
    toSubmit.userId = this.props.user._id;
    toSubmit.recipeId = this.props.match.params.id;
    await newReview(toSubmit);

    // Get the page again
    await this.populateReviews();

    const data = { ...this.state.data };
    data.reviewNotes = "";
    data.reviewStars = 0;
    this.setState({ data });
  };

  returnImgArray = () => {
    if (this.state.data.images) {
      const images = this.state.data.images.map((i) => {
        let imgObject = {};
        imgObject.original = i.fullsizeUrl;
        imgObject.thumbnail = i.thumbUrl;
        return imgObject;
      });

      //   console.log(images);
      return images;
    }
  };

  handleSaveRecipe = async () => {
    const {
      isSaved,
      data: recipe,
      //   savedRecipes,
      savedRecipes: origSavedRecipes,
    } = this.state;
    let savedRecipes = [];
    this.setState({ isSaved: !isSaved });

    if (isSaved) {
      // remove from saved recipes
      console.log("remove from saved recipes");
      savedRecipes = this.state.savedRecipes.filter((r) => r !== recipe._id);
    } else {
      // add to saved recipes
      console.log("add to saved recipes");
      savedRecipes = [...this.state.savedRecipes, recipe._id];
    }

    this.setState({ savedRecipes });

    try {
      await updateUserProperty(this.props.user._id, {
        savedRecipes,
        //   savedRecipes: newSavedRecipes,
      });
    } catch (err) {
      this.setState({ origSavedRecipes });
    }
  };

  renderIcon = () => {
    if (this.state.data.userId === this.props.user._id) return <FaPen />;

    return (
      <React.Fragment>
        {this.state.isSaved ? "Recipe Saved " : "Save Recipe "}
        <Like liked={this.state.isSaved} onClick={this.handleSaveRecipe} />
      </React.Fragment>
    );
  };

  render() {
    const { data } = this.state;

    return (
      <React.Fragment>
        <section className="recipe-detail-header">
          <h1>{data.title}</h1>
          <p>{"by " + data.author}</p>
          <div>
            <AvgStarRating
              avgRating={data.avgRating}
              numReviews={data.numReviews}
              starSize={25}
            />
          </div>
          {this.props.user ?
            <span style={{ float: "right", marginTop: "-25px" }}>
              {this.state.savedRecipes && this.renderIcon()}
            </span>
            :
            null
          }
        </section>
        <section className="image-gallery">
          {data.images && (
            <ImageGallery
              items={this.returnImgArray()}
              showPlayButton={false}
              showThumbnails={data.images.length > 1}
            />
          )}
        </section>

        <div className="row">
          <div className="col-md-6 order-md-12">
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
          <div className="col-md-6">
            <p>{this.state.data.instructions}</p>
          </div>
        </div>
        <hr className="divider" />
        {this.props.user ?
          <div>
            <h3 className="my-3">Review The Recipe</h3>
            <form onSubmit={this.handleSubmit}>
              <StarRating starSize={25} onChange={this.handleStarChange} />
              <br></br>
              {this.renderTextArea("reviewNotes", "", 3, "Add your review here")}
              {this.renderButton("Submit Review")}
            </form>
          </div>
          :
          null
        }
        {this.state.reviews.map((review) => (
          <ReviewRow
            key={review._id}
            username={review.username}
            comments={review.comments}
            userImage={review.profileImageUrl || (process.env.REACT_APP_SERVER_URL + "/images/blank-profile.png")}
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
