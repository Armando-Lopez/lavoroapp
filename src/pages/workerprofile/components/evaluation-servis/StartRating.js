import React from "react";
import { FaStar } from "react-icons/fa";
import { useState } from "react";

const StarRating = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  return (
    <div className="section" style={{ marginTop: "20px" }}>
      <div className="divider" style={{ marginBottom: "50px" }}></div>
      <h6> Ya has contratado a este usuario calificalo</h6>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label>
            <input
              type="radio"
              name="rating"
              id="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <FaStar
              size={25}
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
        style={{ marginLeft: "20px" }}
        onClick={() => setRating(null)}
      >
        cancel
      </i>
      <p> {rating && rating + " estrellas."} </p>
    </div>
  );
};
export default StarRating;
