import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    // отмена повторной отправки fetch-запроса при переключении вкладок
    queries: {
      refetchOnWindowFocus: false,
      // данные считаются "свежими" в течение 5 сек, не перезапрашиваются (isLoading)
      staleTime: 5000,
      // кеширование данных в теч 5 мин по умолчанию
      // удаление из кеша после 10 сек = перезапрос на фоне (isFetching)
      cacheTime: 10000,
      // 3 перезапроса после получения ошибки от сервера
      retry: 3,
      // интервал между перезапросами - 3 сек
      retryDelay: 2000,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
