import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { customAPI } from "../mocks/articlesData";
import { useLocation, useNavigate } from "react-router-dom";

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

export const useFetchSingleArticle = (articleId) => {
  return useQuery(
    ["article", articleId],
    () => {
      return axios
        .get(customAPI + articleId)
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
  const queryClient = useQueryClient();
  return useMutation(
    (editedArticle) => {
      return axios
        .put(`${customAPI}${editedArticle.id}`, editedArticle)
        .then((response) => response.data)
        .catch((err) => {
          throw new Error(err);
        });
    },
    {
      onSuccess: (data) => {
        console.log("success", data);
        // подать запрос на refetch измененных данных
        queryClient.invalidateQueries("articles");
        queryClient.invalidateQueries(["article", data.id]);
      },
      onError: (error) => {
        console.log("error", error);
      },
    }
  );
};

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  return useMutation(
    (article) => {
      return axios
        .delete(`${customAPI}${article.id}`)
        .then((response) => response.data)
        .catch((err) => {
          throw new Error(err);
        });
    },
    {
      onSuccess: (data) => {
        console.log("success", data);
        // подать запрос на refetch измененных данных
        queryClient.invalidateQueries("articles", { exact: true });
        if (location !== "/blog") {
          navigate("/blog");
        }
      },
      onError: (error) => {
        console.log("error", error);
      },
    }
  );
};

export const useEditArticle = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (updatedArticle) => {
      return axios
        .put(`${customAPI}${updatedArticle.id}`, updatedArticle)
        .then((response) => response.data)
        .catch((err) => {
          throw new Error(err);
        });
    },
    {
      onSuccess: (data) => {
        console.log("success", data);
        // подать запрос на refetch измененных данных
        queryClient.invalidateQueries("articles");
        queryClient.invalidateQueries(["article", data.id]);
      },
      onError: (error) => {
        console.log("error", error);
      },
    }
  );
};

export const useAddArticle = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (article) => {
      return axios
        .post(customAPI, article)
        .then((response) => response.data)
        .catch((err) => {
          throw new Error(err);
        });
    },
    {
      onSuccess: (data) => {
        console.log("success", data);
        // подать запрос на refetch измененных данных
        queryClient.invalidateQueries("articles");
      },
      onError: (error) => {
        console.log("error", error);
      },
    }
  );
};
