import { useQuery } from "react-query";
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
