import { useState, useEffect } from "react";
import { CustomButton } from "../../UI/CustomButton/CustomButton";
import "./AddArticleFormStyles.scss";
import CloseIcon from "@mui/icons-material/Close";

export const AddArticleForm = (props) => {
  const [articleTitle, setArticleTitle] = useState("");
  const [articleTags, setArticleTags] = useState("");
  const [articleDescription, setArticleDescription] = useState("");
  const [articleText, setArticleText] = useState("");

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

  let currentDate = new Date();
  // Извлечение компонентов даты
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  // Формирование строки в нужном формате
  let publishDate = `${currentDate.toDateString()} ${hours}:${minutes}`;

  const handleCreateArticle = (e) => {
    // отмена события по умолчанию (отправки формы и перезагрузки страницы)
    e.preventDefault();
    const article = {
      title: articleTitle,
      description: articleDescription,
      tags: articleTags,
      articleText: articleText,
      liked: false,
      publishDate: publishDate,
      likeCount: 0,
      avatarURL: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${
        props.blogArray.length + 1
      }`,
    };

    console.log(article);
    props.handleAddArticle(article);
    props.handleHideAddForm();
  };

  useEffect(() => {
    const handleFormEscape = (event) => {
      // скрываем форму, только если форма активна - state true
      if (event.key === "Escape") {
        console.log("escape pressed");
        props.handleHideAddForm();
      }
    };
    // отрисовка компонента в разметке - только 1 раз
    window.addEventListener("keyup", handleFormEscape);

    // размонтирование компонента из разметки
    return () => window.removeEventListener("keyup", handleFormEscape);
  }, [props]);

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
