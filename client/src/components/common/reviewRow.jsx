import React, { Component } from "react";
import AvgStarRating from "./avgStarRating";

class ReviewRow extends Component {
  render() {
    return (
      <div className="row mt-5">
        <div className="col-1">
          <img className="text-center" src="https://picsum.photos/20" alt="lorem" />
        </div>
        <div className="col-11">
          <div className="row">
            <div className="col-6 align-left">
              <h3>{this.props.username}</h3>
              <AvgStarRating avgRating={this.props.rating} starSize={25} />
            </div>
            <div className="col-6 align-right ">
              <h3>{this.props.date.toLocaleDateString()}</h3>
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
