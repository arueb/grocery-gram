import React from "react";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import "../../css/starRating.css";

const AvgStarRating = ({ avgRating, numReviews, starSize = 50 }) => {
  const roundedRating = Math.round(avgRating * 2) / 2; // round to nearest half
  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        if (roundedRating - ratingValue === -0.5) {
          return (
            <label>
              <FaStarHalfAlt size={starSize} color={"#ffc107"} />
            </label>
          );
        } else {
          return (
            <label>
              <FaStar
                size={starSize}
                color={ratingValue <= roundedRating ? "#ffc107" : "#DDDDDD"}
              />
            </label>
          );
        }
      })}
      <span>{avgRating}</span>
      <div>{numReviews + (numReviews === 1 ? " Review" : " Reviews")}</div>
    </div>
  );
};

export default AvgStarRating;