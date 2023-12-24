import React from "react";
import "./ArticleItem.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export const ArticleItem = ({
  title,
  description,
  liked,
  likePost,
  handleDeleteArticle,
  handleEditArticle,
  handleSelectArticle,
  isOwner,
}) => {
  const showEditForm = () => {
    handleSelectArticle();
    handleEditArticle();
  };

  // console.log(isOwner);

  // меняем цвет иконки в зависимости от состояния - лайкнута статья или нет
  const isLiked = liked ? "crimson" : "lightgrey";

  return (
    <div className="post">
      <div className="post__container">
        <div className="post__header">
          <img
            src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${Math.round(
              Math.random() * 15
            )}`}
            alt="avatar"
          />
          <h2>{title}</h2>
        </div>

        <p>{description}</p>
        <div>
          <button onClick={likePost}>
            <FavoriteIcon style={{ fill: isLiked }} />
          </button>
          {liked}
        </div>
      </div>

      {isOwner && (
        <div className="functional__btns">
          <button className="edit__btn" onClick={showEditForm}>
            <EditIcon />
          </button>

          <button className="delete__btn" onClick={handleDeleteArticle}>
            <DeleteIcon />
          </button>
        </div>
      )}
    </div>
  );
};
