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
  useLocation,
} from "react-router-dom";
import { LoginPage } from "./components/LoginPage/LoginPage";
import { PrivateRoute } from "./components/PrivateRoutes/PrivateRoutes";
import { PublicRoute } from "./components/PublicRoutes/PublicRoutes";
import { useAuth } from "./hooks/UseAuth";
import { SingleArticleItem } from "./components/SingleArticleItem/SingleArticleItem";
import { SignUpPage } from "./components/SignUpPage/SignUpPage";

export function App() {
  const isAuth = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (isAuth) {
      return true;
    }
    return false;

    // if (localStorage.getItem("isLoggedIn") === "true") return true;
    // return false;
  });
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [isOwner, setIsOwner] = useState(
    localStorage.getItem("userName") === "Anastasia Ivleva"
  );

  return (
    <Router>
      <div className="blog__container">
        <HeaderElement
          setIsOwner={setIsOwner}
          isOwner={isOwner}
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
                <PublicRoute>
                  <LoginPageElement
                    //isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    setUserName={setUserName}
                    setIsOwner={setIsOwner}
                  />
                </PublicRoute>
              }
            />

            <Route
              exact
              path="/signup"
              element={
                <PublicRoute>
                  <SignUpPageElement />
                </PublicRoute>
              }
            />

            {/* Пост в отдельной странице;
            добавляем к пути динамический id, запрошенный пользователем */}
            <Route
              exact
              path="/blog/:postId"
              element={
                <PrivateRoute>
                  <SingleArticleItem isOwner={isOwner} />
                </PrivateRoute>
              }
            />

            {/* Привязка маршрута /blog к компоненту */}
            <Route
              exact
              path="/blog"
              element={
                <PrivateRoute>
                  <ArticlesPageElement isOwner={isOwner} />
                </PrivateRoute>
              }
            />

            <Route exact path="/404" element={<PageNotFound />} />

            {/* Привязка маршрута к элементу 404 - при непонятном запросе происходит
            редирект к компоненту страницы ошибки (реализация - выше)*/}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Футер пока закомментим, потому что по факту он нахрен не нужен
        и был чисто как заглушка для фен-шуя */}
        {/* <Footer year={new Date().getFullYear()} /> */}
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

function SignUpPageElement(props) {
  return <SignUpPage {...props} />;
}

function ArticlesPageElement(props) {
  return <ArticlesPage {...props} />;
}

function NotFound() {
  // may catch the current location using the useLocation hook
  const location = useLocation();
  return <Navigate to="/404" state={{ from: location }} />;
}

<>
  {/* <PublicRoutes isLoggedIn={isLoggedIn} path="/login">
              <LoginPageElement
                setIsLoggedIn={setIsLoggedIn}
                setUserName={setUserName}
              />
            </PublicRoutes>

            <PrivateRoutes isLoggedIn={isLoggedIn} path="/blog">
              <ArticlesPageElement />
            </PrivateRoutes> */}
</>;

// OLD BUT GOLD
//             {/* <Route
//               exact
//               path="/login"
//               element={
//                 isLoggedIn ? (
//                   <Navigate to="/blog" replace />
//                 ) : (
//                   <LoginPageElement
//                     setIsLoggedIn={setIsLoggedIn}
//                     setUserName={setUserName}
//                   />
//                 )
//               }
//             /> */}

//             {/* Привязка маршрута /blog к компоненту */}
//             {/* <Route
//               exact
//               path="/blog"
//               element={
//                 isLoggedIn ? (
//                   <ArticlesPageElement />
//                 ) : (
//                   <Navigate to="/login" replace />
//                 )
//               }
//             /> */}
