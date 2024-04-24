import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa";

const StarRating = ({ totalStars }) => {
  const [selectedStars, setSelectedStars] = useState(0);

  const handleStarSelect = (selectedStar) => {
    setSelectedStars(selectedStar);
  };

  return (
    <div className="star-rating" style={{align:"center"}}>
      {[...Array(totalStars)].map((n, i) => (
        <Star
          key={i}
          selected={selectedStars > i}
          onSelect={() => handleStarSelect(i + 1)}
        />
      ))}
      <p style={{align:"center"}}>
        {selectedStars} out of {totalStars} stars
      </p>
    </div>
  );
};

StarRating.propTypes = {
  totalStars: PropTypes.number,
};

StarRating.defaultProps = {
  totalStars: 5,
};

const Star = ({ selected, onSelect }) => (
  <FaStar color={selected ? "goldenrod" : "grey"} onClick={onSelect} />
);

Star.propTypes = {
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default StarRating;
