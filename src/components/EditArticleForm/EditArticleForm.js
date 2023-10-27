import { Component } from "react";
import { CustomButton } from "../../UI/CustomButton/CustomButton";
import CloseIcon from "@mui/icons-material/Close";
import "../AddArticleForm/AddArticleFormStyles.scss";

export class EditArticleForm extends Component {
  // в зависимости от того, какой пост редактируем, получаем
  // начальные данные этого поста и отображаем на форме
  state = {
    articleTitle: this.props.selectedArticle.title,
    articleDescription: this.props.selectedArticle.description,
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

  handleEditArticle = (e) => {
    // отмена события по умолчанию (отправки формы и перезагрузки страницы)
    e.preventDefault();
    const article = {
      id: this.props.selectedArticle.id,
      title: this.state.articleTitle,
      description: this.state.articleDescription,
      liked: this.props.selectedArticle.liked,
    };

    console.log(article);
    this.props.handleEditArticle(article);
    this.props.handleHideEditForm();
  };

  handleFormEscape = (event) => {
    // скрываем форму, только если форма активна - state true
    if (event.key === "Escape") {
      console.log("escape pressed");
      this.props.handleHideEditForm();
    }
  };

  componentDidMount() {
    window.addEventListener("keyup", this.handleFormEscape);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleFormEscape);
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleEditArticle} className="addArticleForm">
          <button
            className="closeFormBtn"
            onClick={this.props.handleHideEditForm}
          >
            <CloseIcon />
          </button>
          <h2>Изменение поста</h2>
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
              className={"addArticlesButton"}
              name={"Сохранить изменения"}
            />
          </div>
        </form>
        <div
          className="form__overlay"
          onClick={this.props.handleHideEditForm}
        ></div>
      </>
    );
  }
}
