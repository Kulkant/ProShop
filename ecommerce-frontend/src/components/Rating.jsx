// frontend/src/components/Rating.jsx

import React from "react";

// Destructuring props to use them easily
const Rating = ({ value, text, color }) => {
  return (
    <div className="rating">
      {/* Loop for 5 stars (0 to 4 index) */}
      {[...Array(5)].map((_, index) => {
        // index starts at 0, so we check against (index + 1)
        const ratingThreshold = index + 1;

        return (
          <span key={index}>
            <i
              style={{ color }}
              className={
                // Full Star: value is greater than or equal to the current rating threshold (e.g., 4.5 >= 1, 2, 3, 4)
                value >= ratingThreshold
                  ? "fas fa-star"
                  : // Half Star: value is greater than or equal to the threshold minus 0.5 (e.g., 4.5 >= 5 - 0.5)
                  value >= ratingThreshold - 0.5
                  ? "fas fa-star-half-alt"
                  : // Empty Star: Otherwise
                    "far fa-star"
              }
            ></i>
          </span>
        );
      })}

      {/* Display text (e.g., 10 reviews) if provided */}
      <span className="rating-text">{text && text}</span>
    </div>
  );
};

// Set a default color for stars if the color prop is not passed
Rating.defaultProps = {
  color: "#f8e825", // Gold/Yellow color
};

export default Rating;
