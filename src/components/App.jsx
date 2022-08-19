import React from "react";
import Filters from "./Filters";
import Cards from "./Cards";


class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="container-lg">
        <section className="header row border-bottom">
          <div className="col col-md-3 col-xl-2">
            <button className="btn btn-danger d-lg-none" type="button" data-bs-toggle="offcanvas"
              data-bs-target="#filtersSidebar" aria-controls="filtersSidebar">Show filters</button>
            <div className="form-floating select-lang d-none d-lg-inline">
              <select className="form-select" id="countrySelect" aria-label="Floating label select example">
                <option defaultValue>Polish</option>
                <option value="1">English</option>
              </select>
              <label htmlFor="countrySelect">Site Language</label>
            </div>
          </div>
          <div id="searchFormRoot" className="col col-md-9 col-xl-10 d-flex justify-content-end"></div>
        </section>
        <div className="content row">
          <div className="col col-lg-3 col-xxl-2 border-end pt-5">
            <div className="offcanvas-lg offcanvas-start p-2" data-bs-scroll="true" tabIndex="-1" id="filtersSidebar"
              aria-labelledby="offcanvasResponsiveLabel">
              <div className="offcanvas-header">
                <div></div>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#filtersSidebar"
                  aria-label="Close"></button>
              </div>
              <div className="offcanvas-body">
                <div className="form-floating select-lang mb-4 d-lg-none">
                  <select className="form-select" id="countrySelect" aria-label="Floating label select example">
                    <option defaultValue>Polish</option>
                    <option value="1">English</option>
                  </select>
                  <label htmlFor="countrySelect">Site Language</label>
                </div>
                <Filters />
              </div>
            </div>
          </div>
          <div className="col col-12 col-lg-9 col-xxl-10 x-5 pt-5 cards">
            <div className="row row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xxl-3 gy-5">
              <Cards />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;