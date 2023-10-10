import React from "react";
import "./ArticlesPageStyles.scss";
import { CustomButton } from "../../UI/CustomButton/CustomButton";
import { posts } from "../../utils/articlesData";
import { getAmountOfArticles } from "../../utils/getAmountOfArticles";

export const ArticlesPage = () => {
  const articlesArray = posts.map((item) => {
    return (
      <div key={item.id} className="post">
        <h2>{item.title}</h2>
        <p>{item.description}</p>
      </div>
    );
  });

  return (
    <>
      <h1>Simple Blog</h1>
      <div className="posts">{articlesArray}</div>

      <div className="count">
        <CustomButton onClick={() => getAmountOfArticles(posts)} />
      </div>
    </>
  );
};
