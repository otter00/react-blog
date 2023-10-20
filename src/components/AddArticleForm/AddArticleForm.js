import { CustomButton } from "../../UI/CustomButton/CustomButton";
import "./AddArticleFormStyles.scss";
import CloseIcon from "@mui/icons-material/Close";

export const AddArticleForm = ({ handleHideAddForm }) => {
  return (
    <>
      <form action="" className="addArticleForm">
        <button className="closeAddFormBtn" onClick={handleHideAddForm}>
          <CloseIcon />
        </button>
        <h2>Создание поста</h2>
        <div>
          <input
            type="text"
            name="articleTitle"
            placeholder="Заголовок поста"
          />
        </div>
        <div>
          <textarea name="articleDescription" placeholder="Ваш текст" />
        </div>
        <div>
          <CustomButton
            onClick={handleHideAddForm}
            className={"addArticlesButton"}
            name={"Опубликовать пост"}
          />
        </div>
      </form>
      <div className="formOverlay" onClick={handleHideAddForm}></div>
    </>
  );
};
