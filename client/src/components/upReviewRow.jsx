import React, { Component } from "react";
import AvgStarRating from "./common/avgStarRating";

class UPReviewRow extends Component {
  prettyDate = () => {
    let date = new Date(this.props.date);
    return date.toLocaleDateString();
  }

  render() {
    let starSize;
    if (this.props.starSize !== undefined) {
      starSize = this.props.starSize;
    } else {
      starSize = 50;
    }

    return (
      <React.Fragment>
        <div className="up-review-row">
          <p className="title-url"><a href={"/recipes/" + this.props.recipeId} >{this.props.recipeTitle}</a></p>
          
          <button type="button" className="btn btn-secondary up-edit-btn" data-toggle="modal" data-target="#editModal">Edit</button>
          
          <button type="button" className="btn btn-danger up-del-btn" data-toggle="modal" data-target="#deleteModal" 
            // onClick={() => this.populateDeleteModal(review)}
          >Delete</button>
          
          <AvgStarRating
            avgRating={this.props.rating}
            starSize={starSize}
          />
          <p className="up-review-date text-secondary">{this.prettyDate()}</p>
          <p>{this.props.comments}</p>
        </div>
      </React.Fragment>
    );
  }
}

export default UPReviewRow;
