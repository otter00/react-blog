import React from "react";
import "./ArticleItem.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export const ArticleItem = ({
  title,
  id,
  description,
  liked,
  likeCount,
  avatarURL,
  likePost,
  handleDeleteArticle,
  handleEditArticle,
  handleSelectArticle,
}) => {
  const showEditForm = () => {
    handleSelectArticle();
    handleEditArticle();
  };

  // меняем цвет иконки в зависимости от состояния - лайкнута статья или нет
  const isLiked = liked ? "crimson" : "lightgrey";

  return (
    <div className="post">
      <div className="post__container">
        <div className="post__header">
          <img src={avatarURL} alt="avatar" />
          <h2>{title}</h2>
        </div>

        <p>{description}</p>
        <div>
          <button className="like-post__btn" onClick={likePost}>
            <FavoriteIcon style={{ fill: isLiked }} />
            {likeCount}
          </button>
          {liked}
        </div>
      </div>

      <div className="functional__btns">
        <button className="edit__btn" onClick={showEditForm}>
          <EditIcon />
        </button>

        <button className="delete__btn" onClick={handleDeleteArticle}>
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};
