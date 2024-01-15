import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SingleArticleItemStyles.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useParams } from "react-router-dom";
import { customAPI } from "../../mocks/articlesData";
import LinearProgress from "@mui/material/LinearProgress";
import { CustomButton } from "../../UI/CustomButton/CustomButton";
import { EditArticleForm } from "../EditArticleForm/EditArticleForm";

export const SingleArticleItem = ({ isOwner }) => {
  let navigate = useNavigate();

  const backToBlog = () => {
    navigate("/blog");
  };

  // динамически отлавливаем id отдельного поста
  const { postId } = useParams();
  const [singlePost, setSinglePost] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);

  // получаем данные с сервера
  const fetchSingleArticle = (id) => {
    // получаем данные с API
    axios
      .get(customAPI + id)
      .then((response) => {
        console.log(response.data);
        // вносим данные в массив
        // переключаем индикатор загрузки в false, так как загрузка завершена
        setSinglePost(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // side effect - помещаются в данном этапе ЖЦ на первичной отрисовке
  useEffect(() => {
    fetchSingleArticle(postId);
  }, [postId]);

  // отображение количества лайков
  // связано с не/закрашенной иконкой
  const handleLikeCount = (tmp) => {
    if (tmp.liked === true && tmp.likeCount > 0) {
      tmp.likeCount--;
    }
    if (tmp.liked === true && tmp.likeCount === 0) {
      tmp.likeCount = 0;
    } else {
      tmp.likeCount++;
    }
  };

  const likePost = () => {
    const tmp = { ...singlePost };

    handleLikeCount(tmp);

    tmp.liked = !tmp.liked;

    axios
      .put(`${customAPI}${postId}`, tmp)
      .then((response) => {
        console.log("edited ", response.data);
        fetchSingleArticle(postId);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteArticle = () => {
    // вызываем пользовательское модальное окно перед удалением
    if (window.confirm(`Удалить ${singlePost.title}?`)) {
      setIsLoading(true);
      axios
        // удаляем определённый пост по его id
        .delete(`${customAPI}${postId}`)
        .then((response) => {
          // вызываем отрисовку массива после обновления данных на сервере
          console.log(`delete `, response.data);
          setIsLoading(false);
          navigate("/blog");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleEditArticle = (editedArticle) => {
    setIsLoading(true);

    axios
      .put(`${customAPI}${postId}`, editedArticle)
      .then((response) => {
        console.log("article edited ", response.data);
        // вызываем отрисовку массива после обновления данных на сервере
        fetchSingleArticle(postId);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleShowEditForm = (article) => {
    setShowEditForm(true);
    setSelectedArticle(article);
  };

  const handleHideEditForm = () => {
    setShowEditForm(false);
  };

  // отрисовываем соответствующий пост по запрошенному в пути id
  useEffect(() => {
    axios
      .get(customAPI + postId)
      .then((response) => {
        console.log(response.data);
        setSinglePost(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [postId, setSinglePost]);

  // меняем цвет иконки в зависимости от состояния - лайкнута статья или нет
  const isLiked = singlePost.liked ? "brown" : "lightgrey";

  console.log(singlePost.id);

  function isEmpty(obj) {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }
    return true;
  }

  console.log(isEmpty(singlePost));

  if (isEmpty(singlePost)) {
    return (
      <>
        <LinearProgress style={{ zIndex: 2 }} className="posts__loader" />
      </>
    );
  }

  const articlesOpacity = isLoading ? 0.5 : 1;

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
            <button
              className="edit__btn"
              onClick={() => handleShowEditForm(singlePost)}
            >
              <EditIcon />
            </button>

            <button className="delete__btn" onClick={handleDeleteArticle}>
              <DeleteIcon />
            </button>
          </div>
        )}
      </div>

      <CustomButton
        className={"CustomButtonStyle"}
        onClick={backToBlog}
        name={"Back to blog"}
      />

      {isLoading && (
        <LinearProgress style={{ zIndex: 2 }} className="posts__loader" />
      )}
    </div>
  );
};
