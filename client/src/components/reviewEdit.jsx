import React, { Component } from 'react';
import Form from './common/form';
import StarRating from "./common/starRating";

class ReviewEdit extends Form {
  state = {  }
  render() { 
    return ( 
      <div>
        <h3 className="my-3">Review The Recipe</h3>
        {/* <form onSubmit={this.handleSubmit}>
          <StarRating
            starSize={25}
            onChange={this.handleStarChange}
            currentStars={this.state.data.reviewStars}
          />
          <br></br>
          {this.renderTextArea(
            "reviewNotes",
            "",
            3,
            "Add your review here"
          )}
          {this.renderButton("Submit Review")}
        </form> */}
      </div>
     );
  }
}
 
export default ReviewEdit;

{/* <div>
  <h3 className="my-3">Review The Recipe</h3>
  <form onSubmit={this.handleSubmit}>
    <StarRating
      starSize={25}
      onChange={this.handleStarChange}
      currentStars={this.state.data.reviewStars}
    />
    <br></br>
    {this.renderTextArea(
      "reviewNotes",
      "",
      3,
      "Add your review here"
    )}
    {this.renderButton("Submit Review")}
  </form>
</div> */}



// class RecipeForm extends Form {
//   constructor(props) {
//     super(props);
//     this.state = {
//       recipeImages: [],
//       errors: {},
//       units: [],
//       quantities: [],
//       rows: [{}],
//       data: {
//         title: "",
//         category: "",
//         isPublished: false,
//         instructions: "",
//         filesToUpload: [],
//       },
//       //   ingredients: [{ qty: "", unit: "", itemId: "", notes: "" }],
//       ingredients: [],
//     };