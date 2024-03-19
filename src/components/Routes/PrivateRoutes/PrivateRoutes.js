import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/UseAuth";

export const PrivateRoute = ({ children }) => {
  const isAuth = useAuth();

  // проверка авторизации, если флаг false, перекидываем по маршруту
  // на страницу авторизации
  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  // если пользователь авторизован, возвращаем вложенные компоненты из App
  return children;
};
