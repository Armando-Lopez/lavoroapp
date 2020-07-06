import React from "react";
import { FaStar } from "react-icons/fa";
import { useState } from "react";

const StarRating = ({ onStarRating }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i} style={{ cursor: "pointer" }}>
            <input
              type="radio"
              name="rating"
              id="rating"
              value={ratingValue}
              onClick={() => {
                setRating(ratingValue);
                onStarRating(ratingValue);
              }}
            />
            <FaStar
              size={40}
              className="star"
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
      <i
        className="material-icons red-text"
        style={{ marginLeft: "10px" }}
        onClick={() => {
          setRating(null);
          onStarRating(null);
        }}
      >
        cancel
      </i>
      <br />
      <span> {rating && rating + " estrellas."} </span>
    </>
  );
};
export default StarRating;
