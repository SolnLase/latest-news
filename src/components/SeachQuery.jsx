import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSearchQuery } from "../actionCreators";
import $ from "jquery";

const SearchQuery = () => {
  const [value, setValue] = useState("");
  const [qInTitle, setQInTitle] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addSearchQuery(value, qInTitle));
    setValue("");
    $('body').removeClass("sidebar-open");
  };

  return (
    <form className="header__q" onSubmit={handleSubmit}>
      <input
        className="header__text-field"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
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
