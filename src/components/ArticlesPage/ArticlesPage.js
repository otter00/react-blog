import React, { useEffect, useState } from "react";
import "./ArticlesPageStyles.scss";
import { CustomButton } from "../../UI/CustomButton/CustomButton";
import { ArticleItem } from "../ArticeItem/ArticleItem";
import { AddArticleForm } from "../AddArticleForm/AddArticleForm";
import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios";
import { EditArticleForm } from "../EditArticleForm/EditArticleForm";
import { customAPI } from "../../mocks/articlesData";
import Pagination from "../PaginationComponent/Pagination";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

let source;

export const ArticlesPage = ({ isOwner }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [blogArray, setBlogArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(3);

  const lastArticleIndex = currentPage * articlesPerPage;
  const firstArticleIndex = lastArticleIndex - articlesPerPage;
  const currentArticle = blogArray.slice(firstArticleIndex, lastArticleIndex);

  const nextPaginate = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prevPaginate = () => {
    setCurrentPage((prev) => prev - 1);
  };

  // получаем данные с сервера
  const fetchArticles = () => {
    // запрос ушел, в переменную записывается токен отмены
    source = axios.CancelToken.source();
    let config = { canselToken: source.token };
    // получаем данные с API
    axios
      .get(customAPI, config)
      .then((response) => {
        console.log(response.data);
        // вносим данные в массив
        // переключаем индикатор загрузки в false, так как загрузка завершена
        setBlogArray(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // side effect - помещаются в данном этапе ЖЦ на первичной отрисовке
  useEffect(() => {
    fetchArticles();
    return () => {
      // при быстром переключении страниц запрос получения данных не успеет
      // обработаться, => возникнет ошибка в консоли. Нужна отмена запроса
      if (source) {
        source.cancel("request cancelled");
      }
    };
  }, []);

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

  const likePost = (article) => {
    const tmp = { ...article };

    handleLikeCount(tmp);

    tmp.liked = !tmp.liked;
    console.log(article.id);

    axios
      .put(`${customAPI}${article.id}`, tmp)
      .then((response) => {
        console.log("edited ", response.data);
        fetchArticles();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteArticle = (article) => {
    // вызываем пользовательское модальное окно перед удалением
    if (window.confirm(`Удалить ${article.title}?`)) {
      setIsLoading(true);
    }

    axios
      // удаляем определённый пост по его id
      .delete(`${customAPI}${article.id}`)
      .then((response) => {
        // вызываем отрисовку массива после обновления данных на сервере
        console.log(`delete `, response.data);
        fetchArticles();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleShowAddForm = () => {
    setShowAddForm(true);
  };

  const handleHideAddForm = () => {
    setShowAddForm(false);
  };

  const handleShowEditForm = () => {
    setShowEditForm(true);
  };

  const handleHideEditForm = () => {
    setShowEditForm(false);
  };

  const handleAddArticle = (article) => {
    setIsLoading(true);

    axios
      .post(customAPI, article)
      .then((response) => {
        console.log("article added ", response.data);
        // вызываем отрисовку массива после обновления данных на сервере
        fetchArticles();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditArticle = (editedArticle) => {
    setIsLoading(true);

    axios
      .put(`${customAPI}${editedArticle.id}`, editedArticle)
      .then((response) => {
        console.log("article edited ", response.data);
        // вызываем отрисовку массива после обновления данных на сервере
        fetchArticles();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSelectArticle = (article) => {
    setSelectedArticle(article);
  };

  console.log(selectedArticle);
  console.log(isOwner);

  // проходимся по массиву постов и "кладём" их в компонент,
  // складываем все полученные посты в массив
  // вносим под рендер, чтобы при каждом изменении состояния изменения визуализировались
  const articlesArray = currentArticle.map((item) => {
    return (
      <>
        <ArticleItem
          key={item.id}
          id={item.id} // id makes uniq avatar for each post
          title={item.title}
          description={item.description}
          avatarURL={item.avatarURL}
          liked={item.liked}
          likeCount={item.likeCount}
          likePost={() => likePost(item)}
          handleDeleteArticle={() => handleDeleteArticle(item)}
          handleEditArticle={handleShowEditForm}
          handleSelectArticle={() => handleSelectArticle(item)}
          isOwner={isOwner}
        />
      </>
    );
  });

  // сообщаем о загрузке данных, пока они не пришли с сервера
  if (blogArray.length === 0) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }

  const articlesOpacity = isLoading ? 0.5 : 1;

  const handlePaginate = (newPaginate) => {
    setCurrentPage(newPaginate);
  };

  return (
    <div className="articles__container">
      {showAddForm && (
        <AddArticleForm
          blogArray={blogArray}
          handleAddArticle={handleAddArticle}
          handleHideAddForm={handleHideAddForm}
        />
      )}

      {showEditForm && (
        <EditArticleForm
          selectedArticle={selectedArticle}
          handleEditArticle={handleEditArticle}
          handleHideEditForm={handleHideEditForm}
        />
      )}

      <>
        <h1>Custom Blog</h1>

        {isOwner && (
          <CustomButton
            onClick={handleShowAddForm}
            className={"showArticlesButton"}
            name={"Добавить пост"}
          />
        )}

        {isLoading && (
          <LinearProgress style={{ zIndex: 2 }} className="posts__loader" />
        )}

        {/* выводим все полученные ранее посты в блок */}
        <div className="posts" style={{ opacity: articlesOpacity }}>
          {articlesArray}
        </div>
      </>

      <section className="pagination__container">
        <IconButton>
          <ArrowBackIosNewIcon onClick={prevPaginate} />
        </IconButton>

        <Pagination
          articlesPerPage={articlesPerPage}
          totalArticles={blogArray.length}
          currentPage={currentPage}
          handlePaginate={handlePaginate}
        />

        <IconButton>
          <ArrowForwardIosIcon onClick={nextPaginate} />
        </IconButton>
      </section>
    </div>
  );
};
