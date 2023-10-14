import React from "react";
import "./CustomButtonStyles.scss";

export const CustomButton = ({ onClick, className, name }) => {
  return (
    <button onClick={onClick} className={className}>
      {name}
    </button>
  );
};
