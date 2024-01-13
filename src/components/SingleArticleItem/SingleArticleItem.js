import React, { useEffect, useState } from "react";
import axios from "axios";
import "../ArticeItem/ArticleItem.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useParams } from "react-router-dom";
import { customAPI } from "../../mocks/articlesData";

export const SingleArticleItem = ({
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

  // динамически отлавливаем id отдельного поста
  const { postId } = useParams();
  const [singlePost, setSinglePost] = useState({});

  // отрисовываем соответствующий пост по запрошенному в пути id
  useEffect(() => {
    axios
      .get(customAPI + postId)
      .then((response) => {
        console.log(response.data);
        setSinglePost(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [postId, setSinglePost]);

  // меняем цвет иконки в зависимости от состояния - лайкнута статья или нет
  const isLiked = singlePost.liked ? "brown" : "lightgrey";

  console.log(singlePost.id);

  return (
    <div className="post">
      <div className="post__container">
        <div className="post__header">
          <img src={singlePost.avatarURL} alt="avatar" />
          <h2 className="post__title">{singlePost.title}</h2>
        </div>

        <p className="post__despription">{singlePost.description}</p>
        <div>
          <button className="like-post__btn" onClick={likePost}>
            <FavoriteIcon style={{ fill: isLiked }} />
            {singlePost.likeCount}
          </button>
          {singlePost.liked}
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
