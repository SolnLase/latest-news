import React, { useEffect } from "react";
import Filters from "./Filters";
import NewsCards from "./NewsCards";
import SearchForm from "./SeachQuery";

export default function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/script.js";
    script.defer = true;
    document.head.appendChild(script);
  }, []);
  
  return (
    <>
      <header className="header">
        <div className="header__container">
          <a href="/" className="header__logo">
            Latest News
          </a>
          <div className="header__menu" id="headerMenu">
            <Filters />
            <SearchForm />
            <i
              className="header__closesidebar-btn btn fa-solid fa-xmark"
              id="closeSidebarBtn"
            ></i>
          </div>
          <i
            className="header__opensidebar-btn btn fa-solid fa-bars"
            id="openSidebarBtn"
          ></i>
        </div>
      </header>
      <main className="container">
        <NewsCards />
        <div className="dimmed-bg"></div>
      </main>
    </>
  );
}
