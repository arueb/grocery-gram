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
      <React.Fragment>
        <div className="review-row">
          <img
            className="text-center rounded-circle"
            src="https://picsum.photos/20"
            alt="lorem"
          />
          <p className="review-username">@{this.props.username}</p>
          <AvgStarRating
            avgRating={this.props.rating}
            starSize={starSize}
          />
          <span className="review-date">{this.prettyDate()}</span>
          <p>{this.props.comments}</p>
        </div>
        {/* <div className="row mt-5">
          <div className="col">
            <img
              className="text-center rounded-circle"
              src="https://picsum.photos/20"
              alt="lorem"
            />
          </div>
          <div className="col- mr-3">
            <span className="review-user">@{this.props.username}</span>
          </div>
          <div className="ml-auto">{this.prettyDate()}</div>
        </div>
        <div className="row">
          <div className="col-"></div>
          <div className="col-auto ml-3">
            <AvgStarRating avgRating={this.props.rating} starSize={starSize} />
          </div>
          <div className="col-"></div>
        </div>
        <div className="row">
          <div className="col-"></div>
          <div className="col-auto ml-3">{this.props.comments}</div>
          <div className="col-"></div>
        </div> */}
      </React.Fragment>
    );
  }
}

export default ReviewRow;
