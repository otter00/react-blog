import React, { useEffect } from "react";
import "./PageNotFound.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomButton } from "../CustomButton/CustomButton";

export const PageNotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // адрес пути, на котором находимся
  console.log(location);

  useEffect(() => {
    const checkNavigationType = () => {
      // Проверяем тип навигации
      if (performance && performance.getEntriesByType) {
        const entries = performance.getEntriesByType("navigation");
        console.log(entries);
        if (entries.length > 0) {
          const navigationType = entries[0].type;
          if (navigationType === "reload") {
            // Если тип навигации - reload, перенаправляем на /blog
            navigate("/blog");
          }
        }
      }
    };

    // Вызываем функцию проверки типа навигации
    checkNavigationType();
  }, [navigate]);

  const backToBlog = () => {
    navigate("/blog");
  };

  return (
    <>
      <h1 className="page_404">
        <span className="info__title">404 Not Found</span>
        <span className="info__subtitle">
          Location {location.state.from.pathname} is absent
        </span>

        <CustomButton
          className={"CustomButtonStyle"}
          onClick={backToBlog}
          name={"Back to blog"}
        />
      </h1>
    </>
  );
};

/* deprecated but works pretty correctly (???) */
// useEffect(() => {
//   // Проверяем, была ли страница перезагружена
//   if (window.performance) {
//     if (performance.navigation.type === 1) {
//       // Если страница была перезагружена, перенаправляем на /blog
//       navigate("/blog");
//     }
//   }
// }, [navigate]);
