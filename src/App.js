import React, { useState } from "react";
import { Header } from "./components/Header/Header";
import "./styles/App.scss";
import { ArticlesPage } from "./components/ArticlesPage/ArticlesPage";
import { Footer } from "./components/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./components/LoginPage/LoginPage";

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (localStorage.getItem("isLoggedIn") === "true") return true;
    return false;
  });
  const [userName, setUserName] = useState(localStorage.getItem("userName"));

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
            <Route exact path="/" Component={ArticlesPage} />
            <Route
              exact
              path="/login"
              //Component={LoginPage}
              element={
                <LoginPageElement
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  setUserName={setUserName}
                />
              }
              //render={() => <LoginPage />}
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
