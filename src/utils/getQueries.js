import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { customAPI } from "../mocks/articlesData";

export const useFetchArticles = () => {
  return useQuery(
    "articles",
    () => {
      return axios
        .get(customAPI)
        .then((response) => response.data)
        .catch((err) => {
          throw new Error(err);
        });
    },
    {
      // отмена повторной отправки fetch-запроса при переключении вкладок
      refetchOnWindowFocus: false,
    }
  );
};

export const useLikeArticle = () => {
  return useMutation((editedArticle) => {
    return axios
      .put(`${customAPI}${editedArticle.id}`, editedArticle)
      .then((response) => response.data)
      .catch((err) => {
        throw new Error(err);
      });
  });
};

export const useDeleteArticle = () => {
  return useMutation((article) => {
    return axios
      .delete(`${customAPI}${article.id}`)
      .then((response) => response.data)
      .catch((err) => {
        throw new Error(err);
      });
  });
};

export const useEditArticle = () => {
  return useMutation((updatedArticle) => {
    return axios
      .put(`${customAPI}${updatedArticle.id}`, updatedArticle)
      .then((response) => response.data)
      .catch((err) => {
        throw new Error(err);
      });
  });
};

export const useAddArticle = () => {
  return useMutation((article) => {
    return axios
      .post(customAPI, article)
      .then((response) => response.data)
      .catch((err) => {
        throw new Error(err);
      });
  });
};
