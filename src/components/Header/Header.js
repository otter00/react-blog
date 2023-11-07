import React from "react";
import "./HeaderStyles.scss";
import { Link, NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <nav className="header__nav">
        {/* Принцип SPA - переход по ссылкам без обновления страницы */}
        <NavLink activeClassName="link__active" exact to="/">
          Diploma Blog
        </NavLink>
        <NavLink activeClassName="link__active" exact to="/login">
          Sign in
        </NavLink>
      </nav>
    </header>
  );
};
