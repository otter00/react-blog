import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import "./SingleArticleItemStyles.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useParams } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { CustomButton } from "../../UI/CustomButton/CustomButton";
import { EditArticleForm } from "../EditArticleForm/EditArticleForm";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import {
  useDeleteArticle,
  useEditArticle,
  useFetchSingleArticle,
  useLikeArticle,
} from "../../utils/getQueries";

export const SingleArticleItem = ({ isOwner }) => {
  // динамически отлавливаем id отдельного поста
  const { postId } = useParams();
  const [selectedArticle, setSelectedArticle] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);

  const {
    data: singlePost,
    isLoading,
    isError,
    error,
    isFetching,
  } = useFetchSingleArticle(postId);

  const navigate = useNavigate();

  const likeArticleMutation = useLikeArticle();
  const deleteArticleMutation = useDeleteArticle();
  const editArticleMutation = useEditArticle();

  // в случае ошибки получения данных сообщаем о ней пользователю
  if (isError) return <h1>{error.message}</h1>;
  // сообщаем о загрузке данных, пока они не пришли с сервера
  if (isLoading)
    return (
      <h1 style={{ textShadow: `-2px 0px 6px #ffffff` }}>
        <MenuBookIcon style={{ color: `#ffffff`, opacity: 0.5 }} />
        Loading...
      </h1>
    );

  const backToBlog = () => {
    navigate("/blog");
  };

  // получаем имя авторизованного пользователя
  const getCurrentUser = () => {
    return localStorage.getItem("userName");
  };
  const currentUser = getCurrentUser();

  // отображение количества лайков
  // связано с не/закрашенной иконкой
  const handleLikeCount = (tmp) => {
    // if (tmp.liked === true && tmp.likeCount > 0) {
    //   tmp.likeCount--;
    // }
    // if (tmp.liked === true && tmp.likeCount === 0) {
    //   tmp.likeCount = 0;
    // } else {
    //   tmp.likeCount++;
    // }

    if (
      tmp.likeCount === 0 &&
      !localStorage.getItem(`${currentUser + tmp.id}`)
    ) {
      localStorage.setItem(`${currentUser + tmp.id}`, currentUser + tmp.id);
      tmp.likeCount++;
    } else if (
      tmp.likeCount > 0 &&
      !localStorage.getItem(`${currentUser + tmp.id}`)
    ) {
      localStorage.setItem(`${currentUser + tmp.id}`, currentUser + tmp.id);
      tmp.likeCount++;
    } else if (
      tmp.likeCount > 0 &&
      localStorage.getItem(`${currentUser + tmp.id}`)
    ) {
      localStorage.removeItem(`${currentUser + tmp.id}`, currentUser + tmp.id);
      tmp.likeCount--;
    }
  };

  const likePost = (singlePost) => {
    const tmp = { ...singlePost };
    handleLikeCount(tmp);
    //tmp.liked = !tmp.liked;

    if (tmp.likeCount > 0) {
      tmp.liked = true;
    } else tmp.liked = false;

    likeArticleMutation.mutate(tmp);
  };

  if (localStorage.getItem(`${currentUser + singlePost.id}`)) {
    console.log("молодец, везде успел");
    singlePost.liked = true;
  } else {
    console.log("фиг вам");
    singlePost.liked = false;
  }

  const handleDeleteArticle = (singlePost) => {
    // вызываем пользовательское модальное окно перед удалением
    if (window.confirm(`Удалить ${singlePost.title}?`)) {
      deleteArticleMutation.mutate(singlePost);
    }
  };

  const handleEditArticle = (editedArticle) => {
    editArticleMutation.mutate(editedArticle);
  };

  const handleShowEditForm = (article) => {
    setShowEditForm(true);
    setSelectedArticle(article);
  };

  const handleHideEditForm = () => {
    setShowEditForm(false);
  };

  // меняем цвет иконки в зависимости от состояния - лайкнута статья или нет
  const isLiked = singlePost.liked ? "brown" : "lightgrey";

  console.log(singlePost.id);

  if (!singlePost.title) {
    return (
      <>
        <LinearProgress style={{ zIndex: 2 }} className="posts__loader" />
      </>
    );
  }

  const articlesOpacity = isFetching ? 0.5 : 1;

  return (
    <div className="single-post__section">
      <div className="single__post">
        {showEditForm && (
          <EditArticleForm
            selectedArticle={selectedArticle}
            handleEditArticle={handleEditArticle}
            handleHideEditForm={handleHideEditForm}
          />
        )}
        <div
          className="single-post__container"
          style={{ opacity: articlesOpacity }}
        >
          <div className="single-post__header">
            <img src={singlePost.avatarURL} alt="avatar" />
            <h2 className="single-post__title">{singlePost.title}</h2>
            <span className="single-post__tags">{singlePost.tags}</span>
            <span className="publish__date">{singlePost.publishDate}</span>
          </div>

          <p className="single-post__description">{singlePost.description}</p>

          <ReactMarkdown className="single-post__text">
            {singlePost.articleText}
          </ReactMarkdown>

          <div>
            <button
              className="like-post__btn"
              onClick={() => likePost(singlePost)}
            >
              <FavoriteIcon style={{ fill: isLiked }} />
              {singlePost.likeCount}
            </button>
            {singlePost.liked}
          </div>
        </div>

        {isOwner && (
          <section className="post__attributes">
            <div className="functional__btns">
              <button
                className="edit__btn"
                onClick={() => handleShowEditForm(singlePost)}
              >
                <EditIcon />
              </button>

              <button
                className="delete__btn"
                onClick={() => handleDeleteArticle(singlePost)}
              >
                <DeleteIcon />
              </button>
            </div>
          </section>
        )}
      </div>

      <CustomButton
        className={"CustomButtonStyle"}
        onClick={backToBlog}
        name={"Back to blog"}
      />

      {isFetching && (
        <LinearProgress style={{ zIndex: 2 }} className="posts__loader" />
      )}
    </div>
  );
};
