import React, { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import $ from "jquery";
import FILTERS_DATA from "../filtersData";
import { addFilter } from "../actionCreators";

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const Filters = () => {
  return (
    <ul className="header__submenu">
      {Object.keys(FILTERS_DATA).map((filterName) => {
        const paramsObj = FILTERS_DATA[filterName];
        return (
          <Filter
            key={filterName}
            filterName={filterName}
            paramsObj={paramsObj}
          />
        );
      })}
    </ul>
  );
};

const Filter = (props) => {
  const [checkedParams, setCheckedParams] = useState([]);
  const filterName = props.filterName;
  const paramsObj = props.paramsObj;
  const dispatch = useDispatch();

  filterName === "countries" && console.log("rerender");

  useEffect(() => {
    $(document).on(filterName + "DropdownClosed", handleDropdownClosed);
    return () => {
      $(document).off(filterName + "DropdownClosed", handleDropdownClosed);
    };
  });
  const handleDropdownClosed = () => {
    dispatch(addFilter(filterName, checkedParams));
  };

  return (
    <li className="header__item">
      <a className="header__link">
        {filterName} <i className="header__icon fa-solid fa-chevron-down"></i>
      </a>
      <ul className="header__dropdown-menu" id={filterName}>
        {Object.keys(paramsObj).map((paramName) => {
          const paramSlug = paramsObj[paramName];
          const parameterId = filterName + capitalize(paramName);
          return (
            <FilterParameter
              filterName={filterName}
              paramName={paramName}
              paramSlug={paramSlug}
              parameterId={parameterId}
              checkedParams={checkedParams}
              setCheckedParams={setCheckedParams}
              canBeChecked={checkedParams.length < 4}
              key={parameterId}
            />
          );
        })}
      </ul>
    </li>
  );
};

const FilterParameter = (props) => {
  const [checked, setChecked] = useState(false);

  const handleInputChange = () => {
    if (!checked) {
      if (props.canBeChecked) {
        setChecked(true);
        props.setCheckedParams(props.checkedParams.concat(props.paramSlug));
      }
    } else {
      setChecked(false);
      props.setCheckedParams(
        props.checkedParams.filter((el) => el != props.paramSlug)
      );
    }
  };

  return (
    <li key={props.paramName}>
      <label className="header__checkbox-label" htmlFor={props.parameterId}>
        <input
          className="header__checkbox"
          id={props.parameterId}
          type="checkbox"
          checked={checked}
          onChange={handleInputChange}
        />{" "}
        {props.paramName}
      </label>
    </li>
  );
};

export default Filters;
