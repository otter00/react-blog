import React, { useState } from "react";
import { Header } from "./components/Header/Header";
import "./styles/App.scss";
import { ArticlesPage } from "./components/ArticlesPage/ArticlesPage";
import { Footer } from "./components/Footer/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LoginPage } from "./components/LoginPage/LoginPage";

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (localStorage.getItem("isLoggedIn") === "true") return true;
    return false;
  });
  const [userName, setUserName] = useState(localStorage.getItem("userName"));

  // 6:31

  return (
    <Router>
      <div className="blog__container">
        <HeaderElement
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          userName={userName}
        />

        <main>
          <Routes>
            {/* Условная маршрутизация */}
            <Route
              exact
              path="/"
              element={
                isLoggedIn ? (
                  <Navigate to="/blog" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route
              exact
              path="/login"
              element={
                isLoggedIn ? (
                  <Navigate to="/blog" replace />
                ) : (
                  <LoginPageElement
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    setUserName={setUserName}
                  />
                )
              }
            />

            {/* Привязка маршрута /blog к компоненту */}
            <Route
              exact
              path="/blog"
              element={
                isLoggedIn ? (
                  <ArticlesPageElement />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </main>

        <Footer year={new Date().getFullYear()} />
      </div>
    </Router>
  );
}

function HeaderElement(props) {
  return <Header {...props} />;
}

function LoginPageElement(props) {
  return <LoginPage {...props} />;
}

function ArticlesPageElement(props) {
  return <ArticlesPage />;
}
