import React from "react";
import PropTypes from "prop-types";
import "./SmallItem.css";

const SmallItem = ({
  imageUrl,
  ownerName,
  title,
  price,
  priceDetail,
  quality,
  content,
}) => {
  return (
    <button className="SmallItem-container">
      <div className="SmallItem-details">
        <p className="SmallItem-owner">{ownerName}</p>
        <h2 className="SmallItem-title">{title}</h2>
        <p className="SmallItem-price">PHP {price}</p>
      </div>
    </button>
  );
};

SmallItem.propTypes = {
  ownerName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  redirectUrl: PropTypes.string.isRequired, // URL to redirect to
};

export default SmallItem;
