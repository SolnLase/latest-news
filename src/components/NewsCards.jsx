import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import $ from "jquery";
import dummmyResults from "../dummyResults.json";

// Function to construct fetch URL
const buildFetchURL = (query, filters, page = null) => {
  // Start with an empty list of query parameters
  const urlQ = [];

  // If a query value exists, append it to the URL parameters
  query &&
    query.value &&
    urlQ.push((query.qInTitle ? "qInTitle=" : "q=") + query.value);

  // If filters exist, convert them to URL parameters and append
  filters &&
    Object.keys(filters).length &&
    urlQ.push(
      Object.entries(filters)
        .map((filter) => {
          const filterName = filter[0];
          const parameters = filter[1];
          return `${filterName}=${parameters.join()}`;
        })
        .join("&")
    );

  // If page exists, append it as a URL parameter
  page && urlQ.push(`page=${page}`);

  // If we're running on a server, use a relative URL, otherwise use an absolute URL
  if (window.location.port === "") {
    // Construct a relative URL
    const urlPath = urlQ.length ? "/fetch" : "/fetch/";
    const relUrl = `${urlPath}?${urlQ.join("&")}`;
    return relUrl;
  } else {
    // Add API key to the URL parameters
    urlQ.unshift(`apikey=${process.env.REACT_APP_API_KEY}`);
    const url = `https://newsdata.io/api/1/news?${urlQ.join("&")}`;
    return url;
  }
};

// Function component to display news cards
const NewsCards = () => {
  // State for storing the news data, next page, and whether there's more data
  const [newsData, setNewsData] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const [hasMore, setHasMore] = useState("");

  // Get current query and filters from Redux store
  const query = useSelector((store) => store.query);
  const filters = useSelector((store) => store.filters);

  // State for whether we can fetch and the current filters for querying
  const [filtersQ, setFiltersQ] = useState([]);
  const [canFetch, setCanFetch] = useState(true);

  useEffect(() => {
    // Listen for when the dropdown or sidebar closes, and set the filters accordingly
    const handleMustFetch = () => {
      setFiltersQ(filters);
    };

    if (!$("body").hasClass("sidebar-open")) {
      $(document).on("dropdownClosed", handleMustFetch);
      return () => {
        $(document).off("dropdownClosed", handleMustFetch);
      };
    }
    // Listen if any sidebar was closed and if so add them to filtersQ state
    $(document).on("sidebarClosed", handleMustFetch);
    return () => {
      $(document).off("sidebarClosed", handleMustFetch);
    };
  }, [setFiltersQ, filters]);

  useEffect(() => {
    const dropdownClosed = async () => {
      let data;
      try {
        // Fetch data
        const response = await fetch(buildFetchURL(query, filtersQ));
        data = await response.json();
        setNextPage(data.nextPage);
        setHasMore(data.totalResults - data.results.length > 0);
      } catch {
        // Use dummy data if fetch fails
        data = dummmyResults;
        setHasMore(true);
        setCanFetch(false);
      }
      setNewsData(data.results);
    };
    dropdownClosed();
  }, [query, filtersQ, setNewsData, setNextPage]);

  const fetchMoreData = async () => {
    // Fetch more data when scrolling
    let data;
    if (canFetch) {
      const response = await fetch(buildFetchURL(query, filters, nextPage));
      data = await response.json();
      setNextPage(data.nextPage);
      setHasMore(data.totalResults - data.results.length > 0);
    } else {
      data = dummmyResults;
    }
    setNewsData(newsData.concat(data.results));
  };

  return (
    <InfiniteScroll
      dataLength={newsData.length}
      next={fetchMoreData}
      hasMore={hasMore}
      className="container__grid"
      style={{ display: "hidden" }}
      loader={<h4 style={{ alignSelf: "end" }}>Loading...</h4>}
    >
      {newsData.map((element, index) => (
        <NewsCard key={index} newsDataObj={element} />
      ))}
    </InfiniteScroll>
  );
};

// Function component to display a single news card
const NewsCard = ({ newsDataObj }) => {
  return (
    <article className="card">
      {/* Display the image if one exists */}
      {newsDataObj.image_url && (
        <img
          className="card__img"
          id=""
          src={newsDataObj.image_url}
          alt=""
          onError={(e) => (e.target.style.display = "none")}
        ></img>
      )}
      <div className="card__text">
        <div className="card__header">
          <div className="card__header-info">
            {/* Display the category, author, language, and country of the news article */}
            <div className="card__row">
              <p className="card__category card__short-info">
                {newsDataObj.category && newsDataObj.category[0]}
              </p>
              <p className="card__author card__short-info">
                {newsDataObj.creator && newsDataObj.creator[0]}
              </p>
            </div>
            <div className="card__row">
              <p className="card__language card__short-info">
                {newsDataObj.language}
              </p>
              <p className="card__country card__short-info">
                {newsDataObj.country && newsDataObj.country[0]}
              </p>
            </div>
          </div>
          {/* External link to the news article */}
          <a
            className="card__external-link fa-solid fa-arrow-up-right-from-square"
            href={newsDataObj.link}
            target="_blank"
            rel="noreferrer"
          >
            {" "}
          </a>
        </div>
        {/* Title and description of the news article */}
        <h4 className="card__title">{newsDataObj.title}</h4>
        <p className="card__description">{newsDataObj.description}</p>
        {/* Date the news article was created */}
        <time className="card__time-created card__short-info">
          Date created: {newsDataObj.pubDate}
        </time>
        {/* Keywords for the news article */}
        <p className="card__keywords card__short-info">
          Keywords: {newsDataObj.keywords && newsDataObj.keywords.join(", ")}
        </p>
      </div>
    </article>
  );
};

export default NewsCards;
