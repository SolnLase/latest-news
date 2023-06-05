import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import $ from "jquery";
import dummmyResults from "../dummyResults.json";

const buildFetchURL = (query, filters, page = null) => {
  // Build url to fetch data from newsdata.io
  const urlQ = [];

  // Transform search query object to query string
  query &&
    query.value &&
    urlQ.push((query.qInTitle ? "qInTitle=" : "q=") + query.value);

  // Transform filters object to query string seperated
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

  // Transform page object to query string
  page && urlQ.push(`page=${page}`);

  if (window.location.port === "") {
    // Use fetch relative url for fetching data if the page is on nginx server
    const urlPath = urlQ.length ? "/fetch" : "/fetch/";
    const relUrl = `${urlPath}?${urlQ.join("&")}`;
    return relUrl;
  } else {
    // Use absolute path if the page is on nodejs server
    urlQ.unshift(`apikey=${process.env.REACT_APP_API_KEY}`);
    const url = `https://newsdata.io/api/1/news?${urlQ.join("&")}`;
    return url;
  }
};

const NewsCards = () => {
  // Parameters for data fetching
  const [newsData, setNewsData] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const [hasMore, setHasMore] = useState("");

  // react-redux hooks
  const query = useSelector((store) => store.query);
  const filters = useSelector((store) => store.filters);

  // Key-value filters from redux store, and whether the instance of the app is able to fetch or not
  // If depleted the instance won't be able to fetch, unless the page is reloaded
  const [fetchFilters, setFetchFilters] = useState([]);
  const [canFetch, setCanFetch] = useState(true);

  useEffect(() => {
    // Add event listener for instruction to fetch data
    const handleDropdownsClosed = () => {
      setFetchFilters(filters);
    };
    $(document).on("fetchData", handleDropdownsClosed);
    return () => {
      $(document).off("fetchData", handleDropdownsClosed);
    };
  }, [setFetchFilters, filters]);

  useEffect(() => {
    const fetchData = async () => {
      let data;
      // If daily number of requests to newsdata is depleted or 400 response
      try {
        // Fetch data
        const response = await fetch(buildFetchURL(query, fetchFilters));
        data = await response.json();
        setNextPage(data.nextPage);
        setHasMore(data.totalResults - data.results.length > 0);
      } catch (error) {
        // Use dummy data instead
        console.error(error);
        data = dummmyResults;
        setHasMore(true);
        setCanFetch(false);
      }
      setNewsData(data.results);
    };
    fetchData();
  }, [query, fetchFilters, setNewsData, setNextPage]);

  const fetchMoreData = async () => {
    // Fetch data when the client is scrolling down
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

const NewsCard = ({ newsDataObj }) => {
  return (
    <article className="card">
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
          <a
            className="card__external-link fa-solid fa-arrow-up-right-from-square"
            href={newsDataObj.link}
            target="_blank"
            rel="noreferrer"
          >
            {" "}
          </a>
        </div>
        <h4 className="card__title">{newsDataObj.title}</h4>
        <p className="card__description">{newsDataObj.description}</p>
        <time className="card__time-created card__short-info">
          Date created: {newsDataObj.pubDate}
        </time>
        <p className="card__keywords card__short-info">
          Keywords: {newsDataObj.keywords && newsDataObj.keywords.join(", ")}
        </p>
      </div>
    </article>
  );
};

export default NewsCards;
