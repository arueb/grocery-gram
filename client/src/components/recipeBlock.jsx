import React, { Component } from "react";
import { Link } from "react-router-dom";
//import { FaStarHalfAlt, FaStar, FaRegStar, FaHeart, FaRegHeart } from "react-icons/fa";
//import StarRating from "./common/starRating";
import AvgStarRating from "./common/avgStarRating";

class RecipeBlock extends Component {
  placeholderOrImage() {
    if (this.props.recipe.images && this.props.recipe.images[0].thumbUrl) {
      return (
        <img
          className="card-img-top"
          src={this.props.recipe.images[0].thumbUrl}
          alt="the thing"
        />
      );
    } else {
      return (
        <img
          className="card-img-top"
          src={"https://picsum.photos/200/300"}
          alt="the thing"
        />
      );
    }
  }
  render(props) {
    console.log(
      this.props.recipe.user[0] ? this.props.recipe.user[0].username : "name"
    );
    return (
      <React.Fragment>
        <div className="col-md-4 col-lg-3 mb-4">
          <Link
            to={"/my-recipes/" + this.props.recipe._id}
            className="card-link"
          >
            <div className="card">
              {/* <div className="card" style={{ width: "200px" }}> */}
              <div className="img-hover-zoom">{this.placeholderOrImage()}</div>
              <div className="card-body bg-secondary text-white">
                <h5 className="card-title">{this.props.recipe.title}</h5>
                {/* <p className="card-text">{this.props.recipe.instructions}</p> */}
                <p className="card-text">
                  By{" "}
                  {this.props.recipe.user
                    ? this.props.recipe.user.username
                    : this.props.recipe.userId}
                </p>
                <AvgStarRating
                  avgRating={this.props.recipe.avgRating}
                  numReviews={this.props.recipe.numReviews}
                  starSize={20}
                />
              </div>
            </div>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default RecipeBlock;
