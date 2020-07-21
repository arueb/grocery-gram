import React, { Component } from "react";
//import Link from 'react-router-dom'
//import { FaStarHalfAlt, FaStar, FaRegStar, FaHeart, FaRegHeart } from "react-icons/fa";
//import StarRating from "./common/starRating";
import AvgStarRating from "./common/avgStarRating";

//{<FaStarHalfAlt size={50} />}
//{<FaStar size={50} />}
//{<FaRegStar size={50} />}
//{<FaHeart size={50} />}
//{<FaRegHeart size={50} />}

class RecipeBlock extends Component {

  placeholderOrImage() {
    if (this.props.recipe.images && this.props.recipe.images[0].thumbUrl) {
      return <img className="card-img-top" src={this.props.recipe.images[0].thumbUrl} alt="the thing" />
    } else {
      return <img className="card-img-top" src={"https://picsum.photos/200/300"} alt="the thing" />
    }
  }
  render(props) {
    return (
      <React.Fragment>
        <div className="card" style={{ width: '200px' }}>
          {this.placeholderOrImage()}          
          <div className="card-body bg-secondary text-white">
            <h5 className="card-title">{this.props.recipe.title}</h5>
            <p className="card-text">{this.props.recipe.instructions}</p>
            <p className="card-text">{"by " + this.props.recipe.userId}</p>
            <AvgStarRating avgRating={this.props.recipe.avgRating} numReviews={this.props.recipe.numReviews} starSize={20} />
            <a href={window.location.pathname + '/' + this.props.recipe._id} className="stretched-link">Here</a>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default RecipeBlock;