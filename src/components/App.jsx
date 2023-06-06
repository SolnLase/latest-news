import React, { useEffect } from "react";
import Filters from "./Filters";
import NewsCards from "./NewsCards";
import SearchForm from "./SeachQuery";

export default function App() {
  // Run the effect only once when the component mounts
  useEffect(() => {
    // Dynamically create a script element for "script.js" and append it to the head of the document
    const script = document.createElement("script");
    script.src = "/script.js";
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  // Function to handle sidebar closed event
  const handleSidebarClosed = () => {
    // Create a new "sidebarClosed" event and dispatch it
    const sidebarClosedEvent = new Event("sidebarClosed");
    document.dispatchEvent(sidebarClosedEvent);
  };

  return (
    <>
      <header className="header">
        <div className="header__container">
          <a href="/" className="header__logo">
            Latest News
          </a>
          <div className="header__menu" id="headerMenu">
            {/* Render the Filters component */}
            <Filters />
            {/* Render the SearchForm component */}
            <SearchForm />
            <i
              onClick={handleSidebarClosed}
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
        {/* Render the NewsCards component */}
        <NewsCards />
        <div className="dimmed-bg"></div>
      </main>
    </>
  );
}