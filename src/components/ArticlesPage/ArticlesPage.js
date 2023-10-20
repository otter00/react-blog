import React, { Component } from "react";
import "./ArticlesPageStyles.scss";
import { CustomButton } from "../../UI/CustomButton/CustomButton";
import { posts } from "../../utils/articlesData";
import { ArticleItem } from "../ArticeItem/ArticleItem";
import { AddArticleForm } from "../AddArticleForm/AddArticleForm";

export class ArticlesPage extends Component {
  state = {
    showAddForm: false,
    // если в локальном хранилище есть данные, берем их
    // если данных нет, берем "чистый" массив
    blogArray: JSON.parse(localStorage.getItem("blogArticles")) || posts,
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

  handleDeleteArticle = (position) => {
    // вызываем пользовательское модальное окно перед удалением
    if (window.confirm(`Удалить ${this.state.blogArray[position].title}?`)) {
      // копируем массив
      const beforeDeleteBlog = [...this.state.blogArray];
      beforeDeleteBlog.splice(position, 1);
      console.log(beforeDeleteBlog);

      this.setState({
        blogArray: beforeDeleteBlog,
      });

      // сохраняем изменения в локальное хранилище
      localStorage.setItem("blogArticles", JSON.stringify(beforeDeleteBlog));
    }
  };

  handleShowAddForm = () => {
    this.setState({ showAddForm: true });
  };

  handleHideAddForm = () => {
    this.setState({ showAddForm: false });
  };

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
          handleDeleteArticle={() => this.handleDeleteArticle(position)}
        />
      );
    });

    return (
      <>
        {this.state.showAddForm ? (
          <AddArticleForm handleHideAddForm={this.handleHideAddForm} />
        ) : null}

        <>
          <h1>Simple Blog</h1>

          <CustomButton
            onClick={this.handleShowAddForm}
            className={"showArticlesButton"}
            name={"Добавить пост"}
          />

          {/* выводим все полученные ранее посты в блок */}
          <div className="posts">{articlesArray}</div>
        </>
      </>
    );
  }
}
