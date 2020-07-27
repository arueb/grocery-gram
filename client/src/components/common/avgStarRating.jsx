import React from "react";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import "../../css/starRating.css";

const AvgStarRating = ({ avgRating, numReviews, starSize = 50 }) => {

  if (numReviews <= 0) {
    return null;
  }

  const roundedRating = Math.round(avgRating * 2) / 2; // round to nearest half

  let ratingNumber, reviewCount;
  if (numReviews !== undefined) {
    ratingNumber = <span className="ml-2">{avgRating}</span>
    reviewCount = <div>{numReviews + (numReviews === 1 ? " Review" : " Reviews")}</div>
  } else {
    ratingNumber = null;
    reviewCount = null;
  }

  return (
      <div className="avg-star-rating">
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          if (roundedRating - ratingValue === -0.5) {
            return (
              <label key={i}>
                <FaStarHalfAlt size={starSize} color={"#ffc107"} />
              </label>
            );
          } else {
            return (
              <label key={i}>
                <FaStar
                  size={starSize}
                  color={ratingValue <= roundedRating ? "#ffc107" : "#DDDDDD"}
                />
              </label>
            );
          }
        })}
        {ratingNumber}
        {reviewCount}
      </div>
  );
};

export default AvgStarRating;
