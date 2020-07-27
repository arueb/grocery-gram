import React from 'react'
import Form from './common/form'
import Joi from "joi-browser";
import ReviewRow from "./common/reviewRow"
// import { getRecipe, deleteRecipe, updateRecipe, newRecipe, } from "../services/recipeService";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { getRecipe, getReviews } from "../services/recipeService"
import AvgStarRating from "./common/avgStarRating";
import StarRating from "./common/starRating";

class RecipeDetail extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        reviewNotes: "Blanks",
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
  };

  async componentDidMount() {
    // load the reviews
    await this.populateReviews();
  }

  // populates reviews in state if valid recipe id
  async populateReviews() {
    try {
      const recipeId = this.props.match.params.id;

      const { data: reviews } = await getReviews(recipeId);
      this.setState({ reviews });

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

      /*           recipe[0].images.forEach(image => {
                   image.fileId = image.fullsizeUrl
                 });
           
                 this.setState({ recipeImages : recipe[0].images});
                 */
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  doSubmit = async () => {
    console.log("we did a submit!")
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <h1>{this.state.data.title}</h1>
          <p>{"by " + this.state.data.author}</p>
          <div>
            <span style={{ float: "left" }}><AvgStarRating avgRating={this.state.data.avgRating} numReviews={this.state.data.numReviews} starSize={35} /></span>
            <span style={{ float: "right" }}>Like this recipe<FaHeart /><FaRegHeart /></span>
          </div>
          <img className="img-fluid text-center" src="https://picsum.photos/1000/150" alt="lorem" />
          <div className="row">
            <div className="col-2">
              <img className="text-center" src="https://picsum.photos/50" alt="lorem" />
            </div>
            <div className="col-2">
              <img className="text-center" src="https://picsum.photos/50" alt="lorem" />
            </div>
            <div className="col-2">
              <img className="text-center" src="https://picsum.photos/50" alt="lorem" />
            </div>
            <div className="col-2">
              <img className="text-center" src="https://picsum.photos/50" alt="lorem" />
            </div>
            <div className="col-2">
              <img className="text-center" src="https://picsum.photos/50" alt="lorem" />
            </div>
            <div className="col-2">
              <img className="text-center" src="https://picsum.photos/50" alt="lorem" />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <p>Bacon ipsum dolor amet bresaola shank rump tongue tri-tip. Ball tip bacon prosciutto boudin frankfurter swine filet mignon ground round.</p>
              <p>Landjaeger cow rump chuck sausage. Beef sirloin tongue ham pork cow biltong shank drumstick kevin.</p>
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
          <hr style={{ "borderTop": "5px solid #8c8b8b" }} />
          <h1>Review The Recipe</h1>
          <form onSubmit={this.handleSubmit}>
            <StarRating starSize={25} />
            {this.renderTextArea("reviewNotes", "Enter Review", 3)}
            {this.renderButton("Submit Review")}
          </form>

          {this.state.reviews.map((review) =>
            <ReviewRow
              key={review._id}
              username={review.username}
              comments={review.comments}
              date={review.date}
              rating={review.rating}
              starSize={25}
            />
          )}
        </div>
      </React.Fragment>
    )
  }
}

export default RecipeDetail;