import React, { Component } from "react";
import "./ArticlesPageStyles.scss";
import { CustomButton } from "../../UI/CustomButton/CustomButton";
import { posts } from "../../utils/articlesData";
//import { getAmountOfArticles } from "../../utils/getAmountOfArticles";
import { ArticleItem } from "../ArticeItem/ArticleItem";

export class ArticlesPage extends Component {
  // объявляем состояние булевой переменной, в зависимости от которого
  // будет меняться отрисовка контента
  state = {
    showArticles: true,
  };

  // проходимся по массиву постов и "кладём" их в компонент,
  // складываем все полученные посты в массив
  articlesArray = posts.map((item) => {
    return (
      <ArticleItem
        key={item.id}
        title={item.title}
        description={item.description}
      />
    );
  });

  // меняем булево состояние по клику на кнопку
  // асинхронный метод - может не успевать со сменой состояния => отрисовкой,
  // поэтому метод должен передавать коллбэк,
  // также передаем состояние с деструктуризацией, как объект,
  // чтобы обращаться напрямую, без state

  // toggleShowArticles = () => {
  //   this.setState({
  //     showArticles: !this.state.showArticles,
  //   });
  // };
  toggleShowArticles = () => {
    console.log("1");
    this.setState(({ showArticles }) => {
      return {
        showArticles: !showArticles,
      };
    });
    console.log("2");
  };

  render() {
    return (
      <>
        <CustomButton
          onClick={this.toggleShowArticles}
          className={'showArticlesButton'}
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
            <div className="posts">{this.articlesArray}</div>
          </>
        ) : null}
      </>
    );
  }
}

{
  /* <div className="count">
      <CustomButton onClick={() => getAmountOfArticles(posts)} />
    </div> */
}
