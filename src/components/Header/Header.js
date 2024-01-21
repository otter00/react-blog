import React from "react";
import "./HeaderStyles.scss";
import { NavLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { Spa } from "@mui/icons-material";

export const Header = ({
  isLoggedIn,
  setIsLoggedIn,
  userName,
  setIsOwner,
  isOwner,
}) => {
  //console.log(isLoggedIn);
  console.log(isOwner);

  const handeLogOut = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setIsOwner(false);
  };

  return (
    <header>
      {isLoggedIn ? (
        <nav className="header__nav">
          <span className="header-nav__greeting">
            Welcome, <strong>{userName}</strong>
          </span>
          {/* Принцип SPA - переход по ссылкам без обновления страницы */}
          {/* <NavLink activeClassName="link__active" exact to="/">
    Diploma Blog
  </NavLink> */}
          <NavLink
            onClick={handeLogOut}
            //className={({ isActive }) => [isActive ? "link__active" : ""]}
            exact
            to="/login"
          >
            LogOut
            <LogoutIcon />
          </NavLink>
        </nav>
      ) : (
        <span className="greeting__unauthorized">Hello, stranger!</span>
      )}
    </header>
  );
};
