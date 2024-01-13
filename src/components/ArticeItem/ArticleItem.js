import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ArticleItem.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useParams } from "react-router-dom";
import { customAPI } from "../../mocks/articlesData";

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

  // динамически отлавливаем id отдельного поста
  const { postId } = useParams();
  const [singlePost, setSinglePost] = useState({});

  // console.log(isOwner);

  // отрисовываем соответствующий пост по запрошенному в пути id
  useEffect(() => {
    if (postId) {
      axios
        .get(customAPI + postId)
        .then((response) => {
          console.log(response.data);
          setSinglePost(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [postId, setSinglePost]);

  // меняем цвет иконки в зависимости от состояния - лайкнута статья или нет
  const isLiked = liked ? "brown" : "lightgrey";

  return (
    <div className="post">
      <div className="post__container">
        <div className="post__header">
          <img src={postId ? singlePost?.avatarURL : avatarURL} alt="avatar" />
          <h2 className="post__title">{postId ? singlePost?.title : title}</h2>
        </div>

        <p className="post__despription">
          {postId ? singlePost?.description : description}
        </p>
        <div>
          <button className="like-post__btn" onClick={likePost}>
            <FavoriteIcon style={{ fill: isLiked }} />
            {postId ? singlePost?.likeCount : likeCount}
          </button>
          {postId ? singlePost?.liked : liked}
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
