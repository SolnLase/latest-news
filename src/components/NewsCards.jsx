import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import exNewsData from "../exampleNewsData.json";

const buildFetchURL = (query, filters, page = null) => {
  const urlElements = [
    "https://newsdata.io/api/1/news?apikey=pub_8378131dce1e8c3ab8930d2129d88c1b49c7",
  ];

  query &&
    query.value &&
    urlElements.push(
      (query.qInTitle ? "qInTitle=" : "q=") + query.value
    );

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
  const [nextPage, setNextPage] = useState(0);
  const didMount = useRef(true);
  const query = useSelector((store) => store.query);
  const filters = useSelector((store) => {console.log('useselector:',store.filters); return store.filters});

  // const fetchData = async () => {
  //   // const response = await fetch(buildFetchURL(query, filters, nextPage));
  //   // const data = await response.json();
  //   const data = exNewsData;
  //   console.log(data);
  //   setNewsData(newsData.concat(data.results));
  //   setNextPage(data.nextPage);
  // };

  // const fetchDataMemoized = useCallback(() => {
  //   fetchData(query, filters, nextPage);
  // }, [fetchData, query, filters, nextPage]);

  // useEffect(() => {
  //   if (didMount) {
  //     didMount.current = false;
  //   }
  //   setNewsData([]);
  //   fetchDataMemoized();
  //   console.log("fetched");
  // }, [didMount, fetchDataMemoized]);

  console.log(buildFetchURL(query, filters, nextPage));
  return <></>;
  //   <InfiniteScroll
  //     dataLength={newsData.length}
  //     next={fetchDataMemoized}
  //     hasMore={true}
  //     loader={<h4>Loading...</h4>}
  //     style={{ width: "100%" }}
  //     className="row row-cols-1 row-cols-sm-2 row-cols-lg-2 row-cols-xxl-3 gy-5"
  //   >
  //     {newsData.map((element, index) => (
  //       <NewsCard key={index} newsDataObj={element} />
  //     ))}
  //   </InfiniteScroll>
  // );
};
//
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
