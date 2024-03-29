import React, { useState } from "react";
import "./ArticleItem.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

export const ArticleItem = ({
  id,
  title,
  tags,
  description,
  // articleText,
  avatarURL,
  liked,
  likePost,
  publishDate,
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

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const descriptionClass = isDescriptionExpanded ? "expanded" : "collapsed";

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  console.log(id);

  // console.log(isOwner);

  // меняем цвет иконки в зависимости от состояния - лайкнута статья или нет
  const isLiked = liked ? "brown" : "lightgrey";

  return (
    <div className="post">
      <div className="post__container">
        <div className="post__header">
          <img src={avatarURL} alt="avatar" />
          <h2 className="post__title">{title}</h2>
          <span className="post__tags">{tags}</span>
          <span className="publish__date">{publishDate}</span>
        </div>

        <p
          className={`post__description ${descriptionClass}`}
          onClick={toggleDescription}
          //className="post__description"
        >
          {description}
        </p>

        {/* <p className="post__text">{articleText}</p> */}

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
        <section className="post__attributes">
          <div className="functional__btns">
            <button className="edit__btn" onClick={showEditForm}>
              <EditIcon />
            </button>

            <button className="delete__btn" onClick={handleDeleteArticle}>
              <DeleteIcon />
            </button>
          </div>
        </section>
      )}
    </div>
  );
};
