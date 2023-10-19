import React, { Component } from "react";
import "./ArticlesPageStyles.scss";
import { CustomButton } from "../../UI/CustomButton/CustomButton";
import { posts } from "../../utils/articlesData";
import { ArticleItem } from "../ArticeItem/ArticleItem";

export class ArticlesPage extends Component {
  // объявляем состояние булевой переменной, в зависимости от которого
  // будет меняться отрисовка контента
  state = {
    showArticles: true,
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

  // меняем булево состояние по клику на кнопку
  toggleShowArticles = () => {
    //console.log("1");
    this.setState(({ showArticles }) => {
      return {
        showArticles: !showArticles,
      };
    });
    //console.log("2");
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
        <CustomButton
          onClick={this.toggleShowArticles}
          className={"showArticlesButton"}
          name={
            this.state.showArticles
              ? "Скрыть комментарии"
              : "Показать комментарии"
          }
        />

        {this.state.showArticles ? (
          <>
            <h1>Simple Blog</h1>

            {/* выводим все полученные ранее посты в блок */}
            <div className="posts">{articlesArray}</div>
          </>
        ) : null}
      </>
    );
  }
}
