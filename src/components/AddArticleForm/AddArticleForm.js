import { useState, useEffect } from "react";
import { CustomButton } from "../../UI/CustomButton/CustomButton";
import "./AddArticleFormStyles.scss";
import CloseIcon from "@mui/icons-material/Close";

export const AddArticleForm = (props) => {
  const [articleTitle, setArticleTitle] = useState("");
  const [articleDescription, setArticleDescription] = useState("");

  const onChangeTitle = (e) => {
    setArticleTitle(e.target.value);
  };

  const onChangeDescription = (e) => {
    setArticleDescription(e.target.value);
  };

  const handleCreateArticle = (e) => {
    // отмена события по умолчанию (отправки формы и перезагрузки страницы)
    e.preventDefault();
    const article = {
      title: articleTitle,
      description: articleDescription,
      liked: false,
      likeCount: 0,
      avatarURL: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${
        props.blogArray.length + 1
      }`,
    };

    console.log(article);
    props.handleAddArticle(article);
    props.handleHideAddForm();
  };

  /* ЭТАПЫ ЖИЗНЕННОГО ЦИКЛА КОМПОНЕНТА */
  // ДЗ : обработать добавление поста на нажатие на enter
  // регистрация всех изменений состояний
  // даже при вводе символов в инпут
  // componentDidUpdate() {
  //   console.log('Form was updated')
  // }

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
