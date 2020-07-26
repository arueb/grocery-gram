import React from 'react'
import Form from './common/form'
import Joi from "joi-browser";
// import { getRecipe, deleteRecipe, updateRecipe, newRecipe, } from "../services/recipeService";
import { FaHeart, FaRegHeart } from "react-icons/fa";

class RecipeDetail extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        reviewNotes: "Blanks",
      },
      errors: {},
    }
  }

  schema = {
    reviewNotes: Joi.string().required().label("Review Notes"),
  };

  render() {
    return (
      <React.Fragment>
        <div className="container" id={console.log(this.state)}>
          <h1>Recipe Title</h1>
          <p>Recipe Author</p>
          <p>Number of stars</p>
          <p>
            <span style={{ float: "left" }}>Number of reviews</span>
            <span style={{ float: "right" }}>Like this recipe<FaHeart /><FaRegHeart /></span>
          </p>
          <img className="img-fluid text-center" src="https://picsum.photos/1000/150" alt="lorem" />
          <div className="row">
            <div className="col-md-2">
              <img className="text-center" src="https://picsum.photos/50" alt="lorem" />
            </div>
            <div className="col-md-2">
              <img className="text-center" src="https://picsum.photos/50" alt="lorem" />
            </div>
            <div className="col-md-2">
              <img className="text-center" src="https://picsum.photos/50" alt="lorem" />
            </div>
            <div className="col-md-2">
              <img className="text-center" src="https://picsum.photos/50" alt="lorem" />
            </div>
            <div className="col-md-2">
              <img className="text-center" src="https://picsum.photos/50" alt="lorem" />
            </div>
            <div className="col-md-2">
              <img className="text-center" src="https://picsum.photos/50" alt="lorem" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <p>Bacon ipsum dolor amet bresaola shank rump tongue tri-tip. Ball tip bacon prosciutto boudin frankfurter swine filet mignon ground round.</p>
              <p>Landjaeger cow rump chuck sausage. Beef sirloin tongue ham pork cow biltong shank drumstick kevin.</p>
            </div>
            <div className="col-md-6">
              <table class="table table-striped">
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
          <hr style={{ "border-top": "5px solid #8c8b8b" }} />
          <h1>Review The Recipe</h1>
          <form>
            <h1>Star rater goes here</h1>
            {this.renderTextArea("reviewNotes", "Enter Review", 3)}
            {this.renderButton("Submit Review")}
          </form>


          <div className="row mt-5">
            <div className="col-1">
              <img className="text-center" src="https://picsum.photos/20" alt="lorem" />
            </div>
            <div className="col-11">
              <div className="row">
                <div className="col-6 align-left">
                  <h3>Username</h3>
                  <h3>Star Rated</h3>
                </div>
                <div className="col-6 align-right ">
                  <h3>Review Date</h3>
                </div>
              </div>
              <div className="row">
                <p>Bacon ipsum dolor amet porchetta brisket shank, pork chop pig hamburger rump shankle andouille prosciutto sausage ham picanha. Venison shoulder turkey tenderloin andouille short ribs drumstick ball tip pig chislic. Tongue shankle shoulder spare ribs picanha kevin pancetta short ribs andouille. Shank picanha fatback turducken rump buffalo sausage cow. Bresaola cupim swine hamburger jowl venison kielbasa ribeye. Flank ham hock tri-tip shank, meatball beef tongue ground round. Bacon t-bone flank pork, kielbasa tenderloin picanha.</p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default RecipeDetail;