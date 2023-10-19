import React from "react";
import "./ArticleItem.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";

export const ArticleItem = ({
  title,
  description,
  liked,
  likePost,
  handleDeleteArticle,
}) => {
  // меняем цвет иконки в зависимости от состояния - лайкнута статья или нет
  const isLiked = liked ? "crimson" : "lightgrey";

  return (
    <div className="post">
      <div className="post__container">
        <h2>{title}</h2>
        <p>{description}</p>
        <div>
          <button onClick={likePost}>
            <FavoriteIcon style={{ fill: isLiked }} />
          </button>
          {liked}
        </div>
      </div>

      <button className="delete__btn" onClick={handleDeleteArticle}>
        <DeleteIcon />
      </button>
    </div>
  );
};
