import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

const buildFetchURL = (query, filters, page = null) => {
  // Build url to fetch data from newsdata.io
  const urlPath = [
    "https://newsdata.io/api/1/news?apikey=pub_8378131dce1e8c3ab8930d2129d88c1b49c7",
  ];

  // Get the text query with boolean value whether it should search only in titles and start building the url
  query &&
    query.value &&
    urlPath.push((query.qInTitle ? "qInTitle=" : "q=") + query.value);

  // Push filters to the url from the state
  filters &&
    Object.keys(filters).length &&
    urlPath.push(
      Object.entries(filters)
        .map((filter) => {
          const filterName = filter[0];
          const parameters = filter[1];
          return `${filterName}=${parameters.join()}`;
        })
        .join("&")
    );
  page && urlPath.push(`page=${page}`);

  return urlPath.join("&");
};

const NewsCards = () => {
  const [newsData, setNewsData] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const [hasMore, setHasMore] = useState("");
  const query = useSelector((store) => store.query);
  const filters = useSelector((store) => store.filters);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(buildFetchURL(query, filters));
      const data = await response.json();
      setNewsData(data.results);
      setNextPage(data.nextPage);
      setHasMore(data.totalResults - data.results.length > 0);
    }
    fetchData();
  }, [query, filters, setNewsData, setNextPage]);

  const fetchMoreData = async () => {
    const response = await fetch(buildFetchURL(query, filters, nextPage));
    const data = await response.json();
    setNewsData(newsData.concat(data.results));
    setNextPage(data.nextPage);
    setHasMore(data.totalResults - data.results.length > 0);
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
          alt="Image could not be loaded"
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
          ></a>
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
