import React, { useState } from "react";
import "./ArticlesPageStyles.scss";
import { CustomButton } from "../../../UI/CustomButton/CustomButton";
import { ArticleItem } from "../../ArticeItem/ArticleItem";
import { AddArticleForm } from "../../AddArticleForm/AddArticleForm";
import LinearProgress from "@mui/material/LinearProgress";
import { EditArticleForm } from "../../EditArticleForm/EditArticleForm";
import Pagination from "../../PaginationComponent/Pagination";
import IconButton from "@mui/material/IconButton";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FeaterIcon from "../../../icons/feather-icon.svg";
import { Link } from "react-router-dom";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import {
  useAddArticle,
  useDeleteArticle,
  useEditArticle,
  useFetchArticles,
  useLikeArticle,
} from "../../../utils/getQueries";

export const ArticlesPage = ({ isOwner }) => {
  const {
    data: articles,
    isLoading,
    isFetching,
    isError,
    error,
  } = useFetchArticles();

  const likeArticleMutation = useLikeArticle();
  const deleteArticleMutation = useDeleteArticle();
  const editArticleMutation = useEditArticle();
  const addArticleMutation = useAddArticle();

  console.log(useFetchArticles());

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  //const [blogArray, setBlogArray] = useState([]);
  //const [isLoading, setIsLoading] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(3);

  // получаем имя авторизованного пользователя
  const getCurrentUser = () => {
    return localStorage.getItem("userName");
  };
  const currentUser = getCurrentUser();

  // в случае ошибки получения данных сообщаем о ней пользователю
  if (isError) return <h1>{error.message}</h1>;
  // сообщаем о загрузке данных, пока они не пришли с сервера
  if (isLoading)
    return (
      <h1 style={{ textShadow: `-2px 0px 6px #ffffff` }}>
        <MenuBookIcon style={{ color: `#ffffff`, opacity: 0.5 }} /> Loading...
      </h1>
    );

  const lastArticleIndex = currentPage * articlesPerPage;
  const firstArticleIndex = lastArticleIndex - articlesPerPage;
  const currentArticle = articles.slice(firstArticleIndex, lastArticleIndex);
  console.log(articles.length);

  const nextPaginate = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prevPaginate = () => {
    setCurrentPage((prev) => prev - 1);
  };

  // отображение количества лайков
  // связано с не/закрашенной иконкой, НЕ устанавливает bool
  const handleLikeCount = (tmp) => {
    // после клика - при условии, что лайк уже стоит, и счетик не 0,
    // уменьшаем счетчик, то есть убираем лайк
    //   tmp.likeCount--;
    // }
    // // если лайк уже стоит, а счетчик 0, убираем лайк
    // // и не меняем счетчик (логично, что будет 0, ведь лайка нет)
    // if (tmp.liked === true && tmp.likeCount === 0) {
    //   tmp.likeCount = 0;
    // } // если ни одно из вышестоящих условий не отыграло, тогда лайк и не стоял
    // // увеличиваем счетчик и далее в функции меняем булеву переменную
    // else {
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

  // функция, СВЯЗАННАЯ с bool
  // вызывает функцию проверки счетчика
  const likePost = (article) => {
    const tmp = { ...article };
    handleLikeCount(tmp);
    //tmp.liked = !tmp.liked;

    if (tmp.likeCount > 0) {
      tmp.liked = true;
    } else tmp.liked = false;

    // если пост лайкнут, заносим в массив имя лайкнувшего пользователя и id поста
    // if (tmp.liked) {
    //   localStorage.setItem(`${currentUser + tmp.id}`, currentUser + tmp.id);
    // } else {
    //   localStorage.removeItem(`${currentUser + tmp.id}`, currentUser + tmp.id);
    // }

    likeArticleMutation.mutate(tmp);
  };

  // я правда не знаю, как этот костыль работает, но тем не менее
  /* 
  Проверяем, есть ли в локальном хранилище вообще какие-то записи о том, 
  что авторизованный юзер лайкал какой-то пост.
  Если хоть какая-то запись имеется, то у поста (лайкнутого) с этим записанным айдишником 
  иконка сердечка будет КРАСНОЙ.
  Если конкретно этот пользователь не лайкал пост с таким-то айдишником (записи нет), то
  нам глубоко фиолетово, сколько там стояло циферок до нас, иконка сердечка будет СЕРАЯ (мы не лайкали)
   */
  for (let i = 0; i < articles.length; i++) {
    if (localStorage.getItem(`${currentUser + articles[i].id}`)) {
      console.log("молодец, везде успел");
      articles[i].liked = true;
    } else {
      console.log("фиг вам");
      articles[i].liked = false;
    }
  }

  const handleDeleteArticle = (article) => {
    // вызываем пользовательское модальное окно перед удалением
    if (window.confirm(`Удалить ${article.title}?`)) {
      deleteArticleMutation.mutate(article);
    }
  };

  const handleAddArticle = (article) => {
    addArticleMutation.mutate(article);
  };

  const handleEditArticle = (editedArticle) => {
    editArticleMutation.mutate(editedArticle);
  };

  const handleSelectArticle = (article) => {
    setSelectedArticle(article);
  };

  console.log(selectedArticle);
  console.log(isOwner);

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

  // проходимся по массиву постов и "кладём" их в компонент,
  // складываем все полученные посты в массив
  // вносим под рендер, чтобы при каждом изменении состояния изменения визуализировались
  const articlesArray = currentArticle.map((item) => {
    return (
      <React.Fragment key={item.id}>
        <ArticleItem
          id={item.id} // id makes uniq avatar for each post
          title={item.title}
          tags={item.tags}
          description={item.description}
          // articleText={item.articleText}
          avatarURL={item.avatarURL}
          liked={item.liked}
          likeCount={item.likeCount}
          publishDate={item.publishDate}
          likePost={() => likePost(item)}
          handleDeleteArticle={() => handleDeleteArticle(item)}
          handleEditArticle={handleShowEditForm}
          handleSelectArticle={() => handleSelectArticle(item)}
          isOwner={isOwner}
        />
        {/* <Link to={`/blog/${item.id}`}>Подробнее...</Link> */}
      </React.Fragment>
    );
  });

  const articlesOpacity = isFetching ? 0.5 : 1;

  const handlePaginate = (newPaginate) => {
    setCurrentPage(newPaginate);
  };

  return (
    <div className="articles__container">
      {showAddForm && (
        <AddArticleForm
          blogArray={articles}
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
        <h1 className="articles-blog__title">
          <img src={FeaterIcon} alt="write-icon" className="feater-icon" />
          My own Books Review blog
        </h1>

        {isOwner && (
          <CustomButton
            onClick={handleShowAddForm}
            className={"showArticlesButton"}
            name={"Добавить пост"}
          />
        )}

        {isFetching && (
          <LinearProgress style={{ zIndex: 2 }} className="posts__loader" />
        )}

        {/* выводим все полученные ранее посты в блок */}
        <div className="posts" style={{ opacity: articlesOpacity }}>
          {articlesArray}
        </div>
      </>

      <section className="pagination__container">
        <IconButton>
          <NavigateBeforeIcon onClick={prevPaginate} />
        </IconButton>

        <Pagination
          articlesPerPage={articlesPerPage}
          totalArticles={articles.length}
          currentPage={currentPage}
          handlePaginate={handlePaginate}
        />

        <IconButton>
          <NavigateNextIcon onClick={nextPaginate} />
        </IconButton>
      </section>
    </div>
  );
};
