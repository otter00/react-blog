import React from "react";
import "./ArticlesPageStyles.scss";
//import { CustomButton } from "../../UI/CustomButton/CustomButton";
import { posts } from "../../utils/articlesData";
//import { getAmountOfArticles } from "../../utils/getAmountOfArticles";
import { ArticleItem } from "../ArticeItem/ArticleItem";

export const ArticlesPage = () => {
  const articlesArray = posts.map((item) => {
    return (
      <ArticleItem
        key={item.id}
        title={item.title}
        description={item.description}
      />
    );
  });

  return (
    <>
      <h1>Simple Blog</h1>
      <div className="posts">{articlesArray}</div>

      {/* <div className="count">
        <CustomButton onClick={() => getAmountOfArticles(posts)} />
      </div> */}
    </>
  );
};
