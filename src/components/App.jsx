import React from "react";
import { useState, useEffect } from "react";
import useWindowDimensions from "./getWindowDemensions";
import Filters from "./Filters";
import NewsCards from "./NewsCards";
import SearchForm from "./SeachQuery";
import SelectSiteLanguage from "./SelectSiteLanguage";

export default function App() {
  const { height, width } = useWindowDimensions();

  return (
    <>
      <header className="border-bottom">
        <div className="">
          <button
            className="btn btn-danger d-lg-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasFilters"
            aria-controls="offcanvasFilters"
          >
            Show filters
          </button>
          {width >= 992 && <SelectSiteLanguage />}
        </div>
        <div className="search-form__container d-flex justify-content-end">
          <SearchForm />
        </div>
      </header>
      <main className="row">
        <section
          className="col col-lg-3 col-xxl-2 offcanvas-lg offcanvas-start p-2 border-end"
          data-bs-scroll="true"
          tabIndex="-1"
          id="offcanvasFilters"
          aria-labelledby="offcanvasFilters"
        >
          <div className="offcanvas-header">
            <div></div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              data-bs-target="#offcanvasFilters"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            {width < 992 && <SelectSiteLanguage />}
            <Filters />
          </div>
        </section>
        <section className="cards col col-12 col-lg-9 col-xxl-10 x-5 pt-5">
          <NewsCards />
        </section>
      </main>
    </>
  );
}
