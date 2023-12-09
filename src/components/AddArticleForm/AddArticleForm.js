import { useState, useEffect } from "react";
import { CustomButton } from "../../UI/CustomButton/CustomButton";
import "./AddArticleFormStyles.scss";
import CloseIcon from "@mui/icons-material/Close";

export const AddArticleForm = (props) => {
  // state = {
  //   articleTitle: "",
  //   articleDescription: "",
  // };

  const [articleTitle, setArticleTitle] = useState("");
  const [articleDescription, setArticleDescription] = useState("");

  const onChangeTitle = (e) => {
    // this.setState({
    //   articleTitle: event.target.value,
    // });
    // console.log(event.target.value);

    setArticleTitle(e.target.value);
  };

  const onChangeDescription = (e) => {
    // this.setState({
    //   articleDescription: event.target.value,
    // });
    // console.log(event.target.value);

    setArticleDescription(e.target.value);
  };

  const handleCreateArticle = (e) => {
    // отмена события по умолчанию (отправки формы и перезагрузки страницы)
    e.preventDefault();
    const article = {
      //id: this.props.blogArray.length + 1,
      title: articleTitle,
      description: articleDescription,
      liked: false,
    };

    console.log(article);
    props.handleAddArticle(article);
    props.handleHideAddForm();
  };

  /* ЭТАПЫ ЖИЗНЕННОГО ЦИКЛА КОМПОНЕНТА */
  // ДЗ : обработать добавление поста на нажатие на enter
  // // отрисовка компонента в разметке - только 1 раз
  // componentDidMount() {
  //   window.addEventListener("keyup", this.handleFormEscape);
  // }
  // // // регистрация всех изменений состояний
  // // // даже при вводе символов в инпут
  // // componentDidUpdate() {
  // //   console.log('Form was updated')
  // // }
  // // // размонтирование компонента из разметки
  // componentWillUnmount() {
  //   window.removeEventListener("keyup", this.handleFormEscape);
  // }

  useEffect(() => {
    const handleFormEscape = (event) => {
      // скрываем форму, только если форма активна - state true
      if (event.key === "Escape") {
        console.log("escape pressed");
        props.handleHideAddForm();
      }
    };
    window.addEventListener("keyup", handleFormEscape);

    return () => window.removeEventListener("keyup", handleFormEscape);
  }, [props]);

  // отрисовка, и только после - методы ЖЦ компонента формы
  // срабатывает при каждом обновлении
  return (
    <>
      <form onSubmit={handleCreateArticle} className="addArticleForm">
        <button className="closeFormBtn" onClick={props.handleHideAddForm}>
          <CloseIcon />
        </button>
        <h2>Создание поста</h2>
        <div>
          <input
            type="text"
            name="articleTitle"
            placeholder="Заголовок поста"
            value={articleTitle}
            onChange={onChangeTitle}
            required
          />
        </div>
        <div>
          <textarea
            name="articleDescription"
            placeholder="Ваш текст"
            rows={7}
            value={articleDescription}
            onChange={onChangeDescription}
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
      <div className="form__overlay" onClick={props.handleHideAddForm}></div>
    </>
  );
};
