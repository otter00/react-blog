import React from "react";
import { Header } from "./components/Header/Header";
import "./styles/App.scss";
import { ArticlesPage } from "./components/ArticlesPage/ArticlesPage";
import { Footer } from "./components/Footer/Footer";

export function App() {
  return (
    <div className="App">
      <Header />

      <main>
        <ArticlesPage />
      </main>

      <Footer />
    </div>
  );
}
