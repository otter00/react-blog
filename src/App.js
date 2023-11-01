import React from "react";
import { Header } from "./components/Header/Header";
import "./styles/App.scss";
import { ArticlesPage } from "./components/ArticlesPage/ArticlesPage";
import { Footer } from "./components/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <main>
          <Routes>
            <Route path="/" Component={ArticlesPage} />
          </Routes>
        </main>

        <Footer year={new Date().getFullYear()} />
      </div>
    </Router>
  );
}
