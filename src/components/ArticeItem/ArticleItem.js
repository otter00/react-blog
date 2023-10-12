import React from "react";
import "./ArticleItem.scss";

export const ArticleItem = ({ title, description }) => {
  console.log(title, description);

  return (
    <div className="post">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};
