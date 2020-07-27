import React, { Component } from "react";
import AvgStarRating from "./avgStarRating";

class ReviewRow extends Component {
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
      <div className="row mt-5">
        <div className="col-1">
          <img className="text-center rounded-circle" src="https://picsum.photos/20" alt="lorem" />
        </div>
        <div className="col-11">
          <div className="row">
            <div className="col-6 align-left">
              <h4>{this.props.username}</h4>
              <AvgStarRating avgRating={this.props.rating} starSize={starSize} />
            </div>
            <div className="col-6 align-right ">
              <p>{this.prettyDate()}</p>
            </div>
          </div>
          <div className="row">
            <p>{this.props.comments}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default ReviewRow;
