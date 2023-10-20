import { CustomButton } from "../../UI/CustomButton/CustomButton";
import "./AddArticleFormStyles.scss";

export const AddArticleForm = () => {
  return (
    <>
      <form action="" className="addArticleForm">
        <h2>Создание поста</h2>
        <div>
          <input
            type="text"
            name="articleTitle"
            placeholder="Заголовок поста"
          />
        </div>
        <div>
          <textarea name="articleDescription"
          placeholder="Ваш текст" />
        </div>
        <div>
          <CustomButton
            className={"addArticlesButton"}
            name={"Добавить комментарий"}
          />
        </div>
      </form>
      <div className="formOverlay"></div>
    </>
  );
};
