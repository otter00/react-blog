import React from "react";
import "./CustomButtonStyles.scss";

export const CustomButton = ({ onClick, className, name, type }) => {
  return (
    <button onClick={onClick} className={className} type={type}>
      {name}
    </button>
  );
};
