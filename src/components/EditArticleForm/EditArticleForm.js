import { useEffect, useState } from "react";
import { CustomButton } from "../../UI/CustomButton/CustomButton";
import CloseIcon from "@mui/icons-material/Close";
import "../AddArticleForm/AddArticleFormStyles.scss";

export const EditArticleForm = (props) => {
  // в зависимости от того, какой пост редактируем, получаем
  // начальные данные этого поста и отображаем на форме
  const [articleTitle, setArticleTitle] = useState(props.selectedArticle.title);
  const [articleTags, setArticleTags] = useState(props.selectedArticle.tags);
  const [articleDescription, setArticleDescription] = useState(
    props.selectedArticle.description
  );
  const [articleText, setArticleText] = useState(
    props.selectedArticle.articleText
  );

  const onChangeTitle = (e) => {
    setArticleTitle(e.target.value);
  };

  const onChangeTags = (e) => {
    setArticleTags(e.target.value);
  };

  const onChangeDescription = (e) => {
    setArticleDescription(e.target.value);
  };

  const onChangeText = (e) => {
    setArticleText(e.target.value);
  };

  const handleEditArticle = (e) => {
    // отмена события по умолчанию (отправки формы и перезагрузки страницы)
    e.preventDefault();
    const article = {
      id: props.selectedArticle.id,
      title: articleTitle,
      description: articleDescription,
      articleText: articleText,
      tags: articleTags,
      liked: props.selectedArticle.liked,
    };

    console.log(article);
    props.handleEditArticle(article);
    props.handleHideEditForm();
  };

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
            minlength="3"
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
            placeholder="Краткое описание"
            rows={3}
            value={articleDescription}
            onChange={onChangeDescription}
            required
          />
        </div>
        <div>
          <textarea
            name="articleText"
            placeholder="Ваш текст"
            rows={7}
            value={articleText}
            onChange={onChangeText}
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
