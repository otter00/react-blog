import React, { Component } from "react";
import "./ArticlesPageStyles.scss";
import { CustomButton } from "../../UI/CustomButton/CustomButton";
// import { posts } from "../../utils/articlesData";
import { ArticleItem } from "../ArticeItem/ArticleItem";
import { AddArticleForm } from "../AddArticleForm/AddArticleForm";
import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios";
import { EditArticleForm } from "../EditArticleForm/EditArticleForm";
import { customAPI } from "../../utils/articlesData";

export class ArticlesPage extends Component {
  state = {
    showAddForm: false,
    showEditForm: false,
    // задаём чистый массив для данных с сервера
    blogArray: [],
    // индикатор загрузчика
    isLoading: false,
    selectedArticle: [],
  };

  // получаем данные с сервера
  fetchArticles = () => {
    // устанавливаем индикатор загрузки как true
    // this.setState({
    //   isLoading: true,
    // });

    // получаем данные с API
    axios
      .get(customAPI)
      .then((response) => {
        console.log(response.data);
        // вносим данные в массив
        // переключаем индикатор загрузки в false, так как загрузка завершена
        this.setState({
          blogArray: response.data,
          isLoading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  likePost = (article) => {
    const tmp = { ...article };
    tmp.liked = !tmp.liked;
    console.log(article.id);

    axios
      .put(`${customAPI}${article.id}`, tmp)
      .then((response) => {
        console.log("edited ", response.data);
        this.fetchArticles();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleDeleteArticle = (article) => {
    // вызываем пользовательское модальное окно перед удалением
    if (window.confirm(`Удалить ${article.title}?`)) {
      this.setState({
        isLoading: true,
      });

      axios
        // удаляем определённый пост по его id
        .delete(`${customAPI}${article.id}`)
        .then((response) => {
          // вызываем отрисовку массива после обновления данных на сервере
          console.log(`delete `, response.data);
          this.fetchArticles();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  handleShowAddForm = () => {
    this.setState({ showAddForm: true });
  };

  handleHideAddForm = () => {
    this.setState({ showAddForm: false });
  };

  handleShowEditForm = () => {
    this.setState({ showEditForm: true });
  };

  handleHideEditForm = () => {
    this.setState({ showEditForm: false });
  };

  handleAddArticle = (article) => {
    this.setState({
      isLoading: true,
    });
    axios
      .post(customAPI, article)
      .then((response) => {
        console.log("article added ", response.data);
        // вызываем отрисовку массива после обновления данных на сервере
        this.fetchArticles();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleEditArticle = (editedArticle) => {
    this.setState({
      isLoading: true,
    });

    axios
      .put(`${customAPI}${editedArticle.id}`, editedArticle)
      .then((response) => {
        console.log("article edited ", response.data);
        // вызываем отрисовку массива после обновления данных на сервере
        this.fetchArticles();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleSelectArticle = (article) => {
    this.setState({
      selectedArticle: article,
    });
  };

  // side effect - помещаются в данном этапе ЖЦ на первичной отрисовке
  componentDidMount() {
    this.fetchArticles();
  }

  render() {
    console.log(this.state.selectedArticle);
    // проходимся по массиву постов и "кладём" их в компонент,
    // складываем все полученные посты в массив
    // вносим под рендер, чтобы при каждом изменении состояния изменения визуализировались
    const articlesArray = this.state.blogArray.map((item) => {
      return (
        <ArticleItem
          key={item.id}
          title={item.title}
          description={item.description}
          liked={item.liked}
          likePost={() => this.likePost(item)}
          handleDeleteArticle={() => this.handleDeleteArticle(item)}
          handleEditArticle={this.handleShowEditForm}
          handleSelectArticle={() => this.handleSelectArticle(item)}
        />
      );
    });

    // сообщаем о загрузке данных, пока они не пришли с сервера
    if (this.state.blogArray.length === 0) {
      return (
        <>
          <h1>Loading...</h1>
        </>
      );
    }

    const articlesOpacity = this.state.isLoading ? 0.5 : 1;

    return (
      <div className="articles__container">
        {this.state.showAddForm && (
          <AddArticleForm
            blogArray={this.state.blogArray}
            handleAddArticle={this.handleAddArticle}
            handleHideAddForm={this.handleHideAddForm}
          />
        )}

        {this.state.showEditForm && (
          <EditArticleForm
            //blogArray={this.state.blogArray}
            selectedArticle={this.state.selectedArticle}
            handleEditArticle={this.handleEditArticle}
            handleHideEditForm={this.handleHideEditForm}
          />
        )}

        <>
          <h1>Custom Blog</h1>

          <CustomButton
            onClick={this.handleShowAddForm}
            className={"showArticlesButton"}
            name={"Добавить пост"}
          />

          {this.state.isLoading && (
            <LinearProgress style={{ zIndex: 2 }} className="posts__loader" />
          )}

          {/* выводим все полученные ранее посты в блок */}
          <div className="posts" style={{ opacity: articlesOpacity }}>
            {articlesArray}
          </div>
        </>
      </div>
    );
  }
}
