import React, { useState } from "react";
import "./ArticleItem.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

export const ArticleItem = ({
  id,
  title,
  description,
  avatarURL,
  liked,
  likePost,
  likeCount,
  handleDeleteArticle,
  handleEditArticle,
  handleSelectArticle,
  isOwner,
}) => {
  const showEditForm = () => {
    handleSelectArticle();
    handleEditArticle();
  };

  console.log(id);

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const descriptionClass = isDescriptionExpanded ? "expanded" : "collapsed";

  // console.log(isOwner);

  // меняем цвет иконки в зависимости от состояния - лайкнута статья или нет
  const isLiked = liked ? "brown" : "lightgrey";

  return (
    <div className="post">
      <div className="post__container">
        <div className="post__header">
          <img src={avatarURL} alt="avatar" />
          <h2 className="post__title">{title}</h2>
        </div>

        <p
          // className={`post__description ${descriptionClass}`}
          // onClick={toggleDescription}
          className="post__description"
        >
          {description}
        </p>

        <div className="subdescription__section">
          <button className="like-post__btn" onClick={likePost}>
            <FavoriteIcon style={{ fill: isLiked }} />
            {likeCount}
          </button>
          {liked}

          <Link to={`/blog/${id}`}>Подробнее...</Link>
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
