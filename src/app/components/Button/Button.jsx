import React from "react";
import "./Button.css";

const Button = ({ children, onClick, isLoading }) => {
  return (
    <button className="checkout-btn" onClick={onClick} >
      {children} {isLoading && <span className="loader"></span>}
    </button>
  );
};

export default Button;
