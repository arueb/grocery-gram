import React from 'react';
import Form from './common/form';
// import StarRating from "./common/starRating";

class ReviewEdit extends Form {
  state = {  }
  render() { 
    return ( 
      <div>
        <div className="up-heading">
          <h2><span className="up-hdg-user text-secondary">
            {this.props.user.username}
          </span> User Profile</h2>
        </div>
        <hr className="divider" />
        <h3 className="my-3">Edit Review</h3>
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