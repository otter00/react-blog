import React from "react";
import "./HeaderStyles.scss";
import { NavLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

export const Header = ({ isLoggedIn, setIsLoggedIn, userName }) => {
  //console.log(isLoggedIn);

  const handeLogOut = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
  };

  return (
    <header>
      {isLoggedIn ? (
        <nav className="header__nav">
          <span>
            Welcome, <strong>{userName}</strong>
          </span>
          {/* Принцип SPA - переход по ссылкам без обновления страницы */}
          {/* <NavLink activeClassName="link__active" exact to="/">
    Diploma Blog
  </NavLink> */}
          <NavLink
            onClick={handeLogOut}
            //activeClassName="link__active"
            exact
            to="/login"
          >
            LogOut
            <LogoutIcon />
          </NavLink>
        </nav>
      ) : (
        "Hello, stranger!"
      )}
    </header>
  );
};
