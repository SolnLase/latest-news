import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import exNewsData from "../exampleNewsData.json";

const buildFetchURL = (query, filters, page = null) => {
  // Build url to fetch data from an api with news

  const urlElements = [
    "https://newsdata.io/api/1/news?apikey=pub_8378131dce1e8c3ab8930d2129d88c1b49c7",
  ];

  // Get text query with boolean value whether it should search only in titles and start build the url
  query &&
    query.value &&
    urlElements.push((query.qInTitle ? "qInTitle=" : "q=") + query.value);

  // Push filters to the url from a state
  Object.keys(filters).length &&
    urlElements.push(
      Object.entries(filters)
        .map((filter) => {
          const filterName = filter[0];
          const parameters = filter[1];
          return `${filterName}=${parameters.join()}`;
        })
        .join("&")
    );

  page && urlElements.push(`page=${page}`);

  return urlElements.join("&");
};

const NewsCards = () => {
  const [newsData, setNewsData] = useState([]);
  const [serverApi, setServerApi] = useState(true);
  const query = useSelector((store) => store.query);
  const filters = useSelector((store) => store.filters);
  const [nextPage, setNextPage] = useState(0);

  useEffect(() => {
    async function fetchData() {
      let data = [];
      if (serverApi) {
        const response = await fetch(buildFetchURL(query, filters));
        data = await response.json();
      } else {
        data = exNewsData;
      }
      setNewsData(data.results);
    }
    fetchData();
    console.log("useeffect");
  }, [query, filters, setNewsData, serverApi]);

  const fetchMoreData = async () => {
    let data = [];
    if (serverApi) {
      const response = await fetch(buildFetchURL(query, filters, nextPage));
      data = await response.json();
    } else {
      data = exNewsData;
    }
    setNewsData(newsData.concat(data.results));
    setNextPage(data.nextPage);
  };

  console.log("newsData", newsData);

  return (
    <InfiniteScroll
      dataLength={newsData.length}
      next={fetchMoreData}
      hasMore={true}
      loader={<h4>Loading...</h4>}
      style={{ width: "100%" }}
      className="row row-cols-1 row-cols-sm-2 row-cols-lg-2 row-cols-xxl-3 gy-5"
    >
      {newsData.map((element, index) => (
        <NewsCard key={index} newsDataObj={element} />
      ))}
    </InfiniteScroll>
  );
};

const NewsCard = ({ newsDataObj }) => {
  return (
    <div className="col">
      <article
        onClick={() => window.open(newsDataObj.link, "_blank")}
        className="card mb-3"
      >
        {newsDataObj.image_url && (
          <img
            src={newsDataObj.image_url}
            className="card-img-top"
            alt="News"
          ></img>
        )}
        <div className="card-body">
          <div className="card__add-info pb-2">
            <p className="">{newsDataObj.category.join(", ")}</p>
            <p className="text-end">{newsDataObj.pubDate}</p>
          </div>
          <h5 className="card-title">{newsDataObj.title}</h5>
          <p className="card-text pt-2">{newsDataObj.description}</p>

          <div className="card-add-info pt-2">
            <div className="card-add-info__region">
              <p className="text-end">{newsDataObj.country.join(", ")}</p>
              <p className="">{newsDataObj.language}</p>
            </div>
            <p>{newsDataObj.creator}</p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default NewsCards;
