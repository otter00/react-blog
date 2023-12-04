import React from "react";
import "./HeaderStyles.scss";
import { Link, NavLink } from "react-router-dom";

export const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  console.log(isLoggedIn);

  const handeLogOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <header>
      {isLoggedIn ? (
        <nav className="header__nav">
          {/* Принцип SPA - переход по ссылкам без обновления страницы */}
          {/* <NavLink activeClassName="link__active" exact to="/">
    Diploma Blog
  </NavLink> */}
          <NavLink
            onClick={handeLogOut}
            activeClassName="link__active"
            exact
            to="/login"
          >
            LogOut
          </NavLink>
        </nav>
      ) : (
        "Hello, stranger!"
      )}
    </header>
  );
};
