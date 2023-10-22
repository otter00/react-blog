import { Component } from "react";
import { CustomButton } from "../../UI/CustomButton/CustomButton";
import "./AddArticleFormStyles.scss";
import CloseIcon from "@mui/icons-material/Close";

export class AddArticleForm extends Component {
  state = {
    articleTitle: "",
    articleDescription: "",
  };

  onChangeTitle = (event) => {
    this.setState({
      articleTitle: event.target.value,
    });
    // console.log(event.target.value);
  };

  onChangeDescription = (event) => {
    this.setState({
      articleDescription: event.target.value,
    });
    // console.log(event.target.value);
  };

  /* ЭТАПЫ ЖИЗНЕННОГО ЦИКЛА КОМПОНЕНТА */

  // // отрисовка компонента в разметке - только 1 раз
  // componentDidMount() {
  //   console.log('Component Form was born!')
  // }
  // // регистрация всех изменений состояний
  // // даже при вводе символов в инпут
  // componentDidUpdate() {
  //   console.log('Form was updated')
  // }
  // // размонтирование компонента из разметки
  // componentWillUnmount() {
  //   console.log('Form is gone away...')
  // }

  render() {
    // отрисовка, и только после - методы ЖЦ компонента формы
    // срабатывает при каждом обновлении
    console.log("render");
    return (
      <>
        <form action="" className="addArticleForm">
          <button
            className="closeAddFormBtn"
            onClick={this.props.handleHideAddForm}
          >
            <CloseIcon />
          </button>
          <h2>Создание поста</h2>
          <div>
            <input
              type="text"
              name="articleTitle"
              placeholder="Заголовок поста"
              value={this.state.articleTitle}
              onChange={this.onChangeTitle}
            />
          </div>
          <div>
            <textarea
              name="articleDescription"
              placeholder="Ваш текст"
              value={this.state.articleDescription}
              onChange={this.onChangeDescription}
            />
          </div>
          <div>
            <CustomButton
              onClick={this.props.handleHideAddForm}
              className={"addArticlesButton"}
              name={"Опубликовать пост"}
            />
          </div>
        </form>
        <div
          className="formOverlay"
          onClick={this.props.handleHideAddForm}
        ></div>
      </>
    );
  }
}
