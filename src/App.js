import React from "react";
import { Header } from "./components/Header/Header";
import "./styles/App.scss";
import { ArticlesPage } from "./components/ArticlesPage/ArticlesPage";
import { Footer } from "./components/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./components/LoginPage/LoginPage";

export function App() {
  return (
    <Router>
      <div className="blog__container">
        <Header />

        <main>
          <Routes>
            <Route exact path="/" Component={ArticlesPage} />
            <Route path="/login" Component={LoginPage} />
          </Routes>
        </main>

        <Footer year={new Date().getFullYear()} />
      </div>
    </Router>
  );
}
