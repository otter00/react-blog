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

  handleCreateArticle = (e) => {
    // отмена события по умолчанию (отправки формы и перезагрузки страницы)
    e.preventDefault();
    const article = {
      //id: this.props.blogArray.length + 1,
      title: this.state.articleTitle,
      description: this.state.articleDescription,
      liked: false,
    };

    console.log(article);
    this.props.handleAddArticle(article);
    this.props.handleHideAddForm();
  };

  handleFormEscape = (event) => {
    // скрываем форму, только если форма активна - state true
    if (event.key === "Escape") {
      console.log("escape pressed");
      this.props.handleHideAddForm();
    }
  };

  /* ЭТАПЫ ЖИЗНЕННОГО ЦИКЛА КОМПОНЕНТА */

  // ДЗ : обработать добавление поста на нажатие на enter

  // // отрисовка компонента в разметке - только 1 раз
  componentDidMount() {
    window.addEventListener("keyup", this.handleFormEscape);
  }
  // // регистрация всех изменений состояний
  // // даже при вводе символов в инпут
  // componentDidUpdate() {
  //   console.log('Form was updated')
  // }
  // // размонтирование компонента из разметки
  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleFormEscape);
  }

  render() {
    // отрисовка, и только после - методы ЖЦ компонента формы
    // срабатывает при каждом обновлении
    // console.log("render");
    return (
      <>
        <form onSubmit={this.handleCreateArticle} className="addArticleForm">
          <button
            className="closeFormBtn"
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
              required
            />
          </div>
          <div>
            <textarea
              name="articleDescription"
              placeholder="Ваш текст"
              value={this.state.articleDescription}
              onChange={this.onChangeDescription}
              required
            />
          </div>
          <div>
            <CustomButton
              //onClick={this.handleCreateArticle}
              type={"submit"}
              className={"CustomButtonStyle"}
              name={"Опубликовать пост"}
            />
          </div>
        </form>
        <div
          className="form__overlay"
          onClick={this.props.handleHideAddForm}
        ></div>
      </>
    );
  }
}
