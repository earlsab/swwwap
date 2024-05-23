import React from "react";
import PropTypes from "prop-types";
import "./Item.css";

const Item = ({ imageUrl, ownerName, title, price, priceDetail, quality, content }) => {

  return (
    <button className="item-container">
      <img src={imageUrl} alt={title} className="item-image" />
      <div className="item-details">

        <p className="item-owner">{ownerName}</p>
        <h2 className="item-title">{title}</h2>
        <p className="item-price">PHP {price}</p>
        <p className="item-price-detail">• {priceDetail}</p>
        <p className="item-quality">• {quality}</p>
        <p className="item-content">• {content}</p>
        
      </div>
    </button>
  );
};

Item.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  ownerName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  priceDetail: PropTypes.string.isRequired,
  quality: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  redirectUrl: PropTypes.string.isRequired, // URL to redirect to
};

export default Item;