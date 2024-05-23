import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

const Button = ({ variant, onClick, text, type }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button className={`button ${variant}`} onClick={handleClick} type={type}>
      {text}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(["contained", "outlined"]),
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

Button.defaultProps = {
  variant: "contained",
};

export default Button;
