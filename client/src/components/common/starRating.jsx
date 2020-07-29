import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "../../css/starRating.css";

const StarRating = ({ starSize = 50, onChange}) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div>
      <span className="star-label mr-2">Your Rating: </span>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              style={{ display: "none" }}
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
              onChange={() => onChange(ratingValue)}
            />
            <FaStar
              size={starSize}
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#DDDDDD"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
