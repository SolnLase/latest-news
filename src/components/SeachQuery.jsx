import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSearchQuery } from "../actionCreators";
import $ from "jquery";

const SearchQuery = () => {
  // Query parameters
  const [value, setValue] = useState("");
  const [qInTitle, setQInTitle] = useState(false);

  const dispatch = useDispatch();

  // Dispatch query parameters to Redux store and close the sidebar
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addSearchQuery(value, qInTitle));
    setValue("");
    $('body').removeClass("sidebar-open");
  };

  return (
    <form className="header__q" onSubmit={handleSubmit}>
      {/* Input field for search query */}
      <input
        className="header__text-field"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {/* Checkbox to search only in titles */}
      <label className="header__checkbox-label" htmlFor="onlyInTitles">
        Only in titles
        <input
          className="header__checkbox"
          id="onlyInTitles"
          type="checkbox"
          value={qInTitle}
          onClick={() => setQInTitle(!qInTitle)}
        />
      </label>
    </form>
  );
};

export default SearchQuery;
