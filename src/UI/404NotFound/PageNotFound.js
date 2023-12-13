import React from "react";
import "./PageNotFound.scss";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { CustomButton } from "../CustomButton/CustomButton";

export const PageNotFound = () => {
  const location = useLocation();
  // адрес пути, на котором находимся
  console.log(location);

  let navigate = useNavigate();

  const backToBlog = () => {
    navigate("/blog");
  };

  // if (!location.pathname) return <Navigate to="/blog" />;

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
