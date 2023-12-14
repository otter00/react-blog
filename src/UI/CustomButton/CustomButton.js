import React from "react";
import "./CustomButtonStyles.scss";

export const CustomButton = ({ name, ...props }) => {
  return <button {...props}>{name}</button>;
};
