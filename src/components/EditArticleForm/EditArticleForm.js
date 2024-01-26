import { useEffect, useState } from "react";
import { CustomButton } from "../../UI/CustomButton/CustomButton";
import CloseIcon from "@mui/icons-material/Close";
import "../AddArticleForm/AddArticleFormStyles.scss";

export const EditArticleForm = (props) => {
  // в зависимости от того, какой пост редактируем, получаем
  // начальные данные этого поста и отображаем на форме

  // CLASS COMPONENT
  // state = {
  //   articleTitle: this.props.selectedArticle.title,
  //   articleDescription: this.props.selectedArticle.description,
  // };

  // FUNCTIONAL COMPONENT
  const [articleTitle, setArticleTitle] = useState(props.selectedArticle.title);
  const [articleTags, setArticleTags] = useState(props.selectedArticle.tags);
  const [articleDescription, setArticleDescription] = useState(
    props.selectedArticle.description
  );

  const onChangeTitle = (e) => {
    // CLASS COMPONENT
    // this.setState({
    //   articleTitle: event.target.value,
    // });
    // console.log(event.target.value);

    // FUNCTIONAL COMPONENT
    setArticleTitle(e.target.value);
  };

  const onChangeTags = (e) => {
    // this.setState({
    //   articleDescription: event.target.value,
    // });
    // console.log(event.target.value);

    setArticleTags(e.target.value);
  };

  const onChangeDescription = (e) => {
    // this.setState({
    //   articleDescription: event.target.value,
    // });
    // console.log(event.target.value);

    setArticleDescription(e.target.value);
  };

  const handleEditArticle = (e) => {
    // отмена события по умолчанию (отправки формы и перезагрузки страницы)
    e.preventDefault();
    const article = {
      id: props.selectedArticle.id,
      title: articleTitle,
      description: articleDescription,
      tags: articleTags,
      liked: props.selectedArticle.liked,
    };

    console.log(article);
    props.handleEditArticle(article);
    props.handleHideEditForm();
  };

  // CLASS COMPONENT LIFECYCLE METHOD
  // componentDidMount() {
  //   window.addEventListener("keyup", this.handleFormEscape);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener("keyup", this.handleFormEscape);
  // }

  // FUNCTIONAL COMPONENT LIFECYCLE METHOD
  useEffect(() => {
    const handleFormEscape = (event) => {
      // скрываем форму, только если форма активна - state true
      if (event.key === "Escape") {
        console.log("escape pressed");
        props.handleHideEditForm();
      }
    };
    window.addEventListener("keyup", handleFormEscape);

    return () => window.removeEventListener("keyup", handleFormEscape);
  }, [props]);

  return (
    <>
      <form onSubmit={handleEditArticle} className="addArticleForm">
        <button className="closeFormBtn" onClick={props.handleHideEditForm}>
          <CloseIcon />
        </button>
        <h2>Изменение поста</h2>
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
          <input
            type="text"
            name="articleTags"
            placeholder="Теги поста"
            value={articleTags}
            onChange={onChangeTags}
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
            name={"Сохранить изменения"}
          />
        </div>
      </form>
      <div className="form__overlay" onClick={props.handleHideEditForm}></div>
    </>
  );
};
