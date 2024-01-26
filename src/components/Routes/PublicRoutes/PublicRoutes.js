import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuth";

export const PublicRoute = ({ children }) => {
  const isAuth = useAuth();

  // если авторизован, перекидываем маршрут на блог
  if (isAuth) {
    return <Navigate to="/blog" />;
  }

  // если не авторизован, возвращаем вложенный компонент (в App)
  return children;
};
