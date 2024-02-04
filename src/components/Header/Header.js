import React from "react";
import "./HeaderStyles.scss";
import { NavLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

export const Header = ({
  isLoggedIn,
  setIsLoggedIn,
  userName,
  setIsOwner,
  isOwner,
}) => {
  console.log(`isOwner flag now: ${isOwner}`);

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
          <NavLink onClick={handeLogOut} exact to="/login">
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
