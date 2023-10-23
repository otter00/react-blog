import React, { Component } from "react";
import "./ArticlesPageStyles.scss";
import { CustomButton } from "../../UI/CustomButton/CustomButton";
// import { posts } from "../../utils/articlesData";
import { ArticleItem } from "../ArticeItem/ArticleItem";
import { AddArticleForm } from "../AddArticleForm/AddArticleForm";
import axios from "axios";

export class ArticlesPage extends Component {
  state = {
    showAddForm: false,
    // задаём чистый массив для данных с сервера
    blogArray: [],
    // индикатор загрузчика
    isLoading: false,
  };

  // получаем данные с сервера
  fetchArticles = () => {
    // устанавливаем индикатор загрузки как true
    this.setState({
      isLoading: true,
    });

    // получаем данные с API
    axios
      .get(
        `https://6536ba1dbb226bb85dd28e56.mockapi.io/api/diploma_blog/articles/`
      )
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

  likePost = (position) => {
    // сохраняем копию на массив статей в отдельную переменную
    const tmp = [...this.state.blogArray];
    // изменяем состояние
    tmp[position].liked = !tmp[position].liked;
    //console.log(tmp);

    // передаем измененный временный массив в переменную для отрисовки
    this.setState({
      blogArray: tmp,
    });

    // сохраняем массив с изменениями в локальное хранилище
    localStorage.setItem("blogArticles", JSON.stringify(tmp));
  };

  handleDeleteArticle = (article) => {
    // вызываем пользовательское модальное окно перед удалением
    if (window.confirm(`Удалить ${article.title}?`)) {
      axios
        // удаляем определённый пост по его id
        .delete(
          `https://6536ba1dbb226bb85dd28e56.mockapi.io/api/diploma_blog/articles/${article.id}`
        )
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

  handleFormEscape = (event) => {
    // скрываем форму, только если форма активна - state true
    if (event.key === "Escape" && this.state.showAddForm) {
      console.log("escape pressed");
      this.handleHideAddForm();
    }
  };

  handleAddArticle = (article) => {
    axios
      .post(
        `https://6536ba1dbb226bb85dd28e56.mockapi.io/api/diploma_blog/articles/`,
        article
      )
      .then((response) => {
        console.log("article added ", response.data);
        // вызываем отрисовку массива после обновления данных на сервере
        this.fetchArticles();
      })
      .catch((err) => {
        console.log(err);
      });

    //this.handleHideAddForm();
  };

  // side effect - помещаются в данном этапе ЖЦ на первичной отрисовке
  // сокрытие формы по клику на ESC
  componentDidMount() {
    this.fetchArticles();
    window.addEventListener("keyup", this.handleFormEscape);
  }
  // очищаем обработчик события, использованный на шаге пнрвичной отрисовки
  // на данном этапе форма скрылась = размонтировалась из разметки DOM
  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleFormEscape);
  }

  render() {
    // проходимся по массиву постов и "кладём" их в компонент,
    // складываем все полученные посты в массив
    // вносим под рендер, чтобы при каждом изменении состояния изменения визуализировались
    const articlesArray = this.state.blogArray.map((item, position) => {
      return (
        <ArticleItem
          key={item.id}
          title={item.title}
          description={item.description}
          liked={item.liked}
          likePost={() => this.likePost(position)}
          handleDeleteArticle={() => this.handleDeleteArticle(item)}
        />
      );
    });

    // сообщаем о загрузке данных, пока они не пришли с сервера
    if (this.state.blogArray.length === 0) {
      return <h1>Loading...</h1>;
    }

    return (
      <div className="articles__container">
        {this.state.showAddForm && (
          <AddArticleForm
            blogArray={this.state.blogArray}
            handleAddArticle={this.handleAddArticle}
            handleHideAddForm={this.handleHideAddForm}
          />
        )}

        <>
          <h1>Custom Blog</h1>

          <CustomButton
            onClick={this.handleShowAddForm}
            className={"showArticlesButton"}
            name={"Добавить пост"}
          />

          {this.state.isLoading && <h2>Loading...</h2>}

          {/* выводим все полученные ранее посты в блок */}
          <div className="posts">{articlesArray}</div>
        </>
      </div>
    );
  }
}
