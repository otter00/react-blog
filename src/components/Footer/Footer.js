import React from "react";
import "./FooterStyles.scss";

export const Footer = ({ year }) => {
  return (
    <footer>
      <span>ReactJs Diploma Blog {year}</span>
    </footer>
  );
};
