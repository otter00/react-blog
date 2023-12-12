import React, { useState } from "react";
import { Header } from "./components/Header/Header";
import "./styles/App.scss";
import { ArticlesPage } from "./components/ArticlesPage/ArticlesPage";
import { Footer } from "./components/Footer/Footer";
import { PageNotFound } from "./UI/404NotFound/PageNotFound";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LoginPage } from "./components/LoginPage/LoginPage";
import { PrivateRoute } from "./components/PrivateRoutes/PrivateRoutes";
import { PublicRoute } from "./components/PublicRoutes/PublicRoutes";
import { useAuth } from "./hooks/UseAuth";

export function App() {
  const isAuth = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (isAuth) return true;
    return false;

    // if (localStorage.getItem("isLoggedIn") === "true") return true;
    // return false;
  });
  const [userName, setUserName] = useState(localStorage.getItem("userName"));

  return (
    <Router>
      <div className="blog__container">
        <HeaderElement isLoggedIn={isLoggedIn} userName={userName} />

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
                <PublicRoute>
                  <LoginPageElement
                    //isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    setUserName={setUserName}
                  />
                </PublicRoute>
              }
            />

            {/* Привязка маршрута /blog к компоненту */}
            <Route
              exact
              path="/blog"
              element={
                <PrivateRoute>
                  <ArticlesPageElement />
                </PrivateRoute>
              }
            />

            {/* <Route
              exact
              path="/login"
              element={
                isLoggedIn ? (
                  <Navigate to="/blog" replace />
                ) : (
                  <LoginPageElement
                    setIsLoggedIn={setIsLoggedIn}
                    setUserName={setUserName}
                  />
                )
              }
            /> */}

            {/* Привязка маршрута /blog к компоненту */}
            {/* <Route
              exact
              path="/blog"
              element={
                isLoggedIn ? (
                  <ArticlesPageElement />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            /> */}

            <Route path="*" element={<PageNotFound />} />
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

function ArticlesPageElement() {
  return <ArticlesPage />;
}

{
  /* <PublicRoutes isLoggedIn={isLoggedIn} path="/login">
              <LoginPageElement
                setIsLoggedIn={setIsLoggedIn}
                setUserName={setUserName}
              />
            </PublicRoutes>

            <PrivateRoutes isLoggedIn={isLoggedIn} path="/blog">
              <ArticlesPageElement />
            </PrivateRoutes> */
}
