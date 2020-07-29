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
        <div className="row mt-5">
          <div className="col-">
            <img
              className="text-center rounded-circle"
              src="https://picsum.photos/20"
              alt="lorem"
            />
          </div>
          <div className="col-">
            <span className="review-user">@{this.props.username}</span>
          </div>
          <div className="ml-auto">{this.prettyDate()}</div>
        </div>
        <div className="row">
          <div className="col-"></div>
          <div className="col-auto ml-3">
            <AvgStarRating avgRating={this.props.rating} starSize={starSize} />
          </div>
        </div>
        <div className="row">
          <div className="col-"></div>
          <div className="col-auto ml-3">
            {this.props.comments}
          </div>
          {/* <p>{this.props.comments}</p> */}
        </div>
      </React.Fragment>

      // <div className="row mt-5">
      //   <div className="col-1">
      //     <img className="text-center rounded-circle" src="https://picsum.photos/20" alt="lorem" />
      //   </div>
      //   <div className="col-11">
      //     <div className="row">
      //       <div className="col-9 align-left">
      //         <h6>@{this.props.username}</h6>
      //         <AvgStarRating avgRating={this.props.rating} starSize={starSize} />
      //       </div>
      //       <div className="align-right ">
      //         <p>{this.prettyDate()}</p>
      //       </div>
      //     </div>
      //     <div className="row">
      //       <p>{this.props.comments}</p>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

export default ReviewRow;
