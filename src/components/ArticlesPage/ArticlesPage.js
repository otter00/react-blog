import React from "react";
import "./ArticlesPageStyles.scss";
import { CustomButton } from "../../UI/CustomButton/CustomButton";

export const ArticlesPage = () => {
  return (
    <>
      <h1>Simple Blog</h1>
      <div className="posts">
        <div className="post">
          <h2>Post 1</h2>
          <p>paragraph</p>
        </div>

        <div className="post">
          <h2>Post 2</h2>
          <p>paragraph</p>
        </div>

        <div className="post">
          <h2>Post 3</h2>
          <p>paragraph</p>
        </div>
      </div>

      <div className="count">
        <CustomButton />
      </div>
    </>
  );
};
