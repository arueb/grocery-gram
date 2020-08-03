import React, { Component } from "react";
import AvgStarRating from "./common/avgStarRating";
import { FaPen, FaTrash } from "react-icons/fa";


class UPReviewRow extends Component {
  prettyDate = () => {
    let date = new Date(this.props.date);
    return date.toLocaleDateString();
  };

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
          <div
            className="icon-container text-secondary"
            // className="delete-review-icon "
            // style={({ cursor: "pointer" }, { float: "right" })}
            data-toggle="modal"
            data-target="#deleteModal"
          >
            <FaTrash

            // type="button"
            // className="btn btn-secondary up-edit-btn"
            ></FaTrash>
          </div>
          <div
            // onClick={() => this.props.onEdit(this.props.review)}
            onClick={() => this.props.onEdit(this.props.review)}
            className="icon-container text-secondary"
            // className="edit-review-icon text-secondary"
            data-toggle="modal"
            // style={({ cursor: "pointer" }, { float: "right" })}
            data-target="#editModal"
            // data-val={this.props.review}
          >
            <FaPen></FaPen>
          </div>
          {/* <button
            type="button"
            className="btn btn-secondary up-edit-btn"
            data-toggle="modal"
            data-target="#editModal"
            >
            Edit
        </button> */}
          {/* 
          <button
          type="button"
          className="btn btn-danger up-del-btn"
          data-toggle="modal"
          data-target="#deleteModal"
          // onClick={() => this.populateDeleteModal(review)}
          >
          Delete
        </button> */}
          <p className="title-url">
            <a href={"/recipes/" + this.props.recipeId}>
              {this.props.recipeTitle}
            </a>
          </p>

          <AvgStarRating avgRating={this.props.rating} starSize={starSize} />
          <p className="up-review-date text-secondary">{this.prettyDate()}</p>
          <p>{this.props.comments}</p>
        </div>
      </React.Fragment>
    );
  }
}

export default UPReviewRow;
