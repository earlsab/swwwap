import React from "react";
import PropTypes from "prop-types";
import "./Item.css";
import { CldImage } from "next-cloudinary";

const Item = ({
  imageUrl,
  ownerName,
  title,
  price,
  priceDetail,
  quality,
  content,
}) => {
  return (
    <button className="item-container">
      {/* TODO: Auto adjust width and height based on image */}
      <CldImage
        src={imageUrl}
        className="item-image"
        alt={title}
        width={100}
        height={100}
      ></CldImage>
      
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
