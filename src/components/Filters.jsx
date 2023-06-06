import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import FILTERS_DATA from "../filtersData";
import { modifyFilters } from "../actionCreators"

// Function to capitalize first character of a string
const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

// Filters component, contains a list of Filter components
const Filters = () => {
  // For each key in FILTERS_DATA, create a Filter component
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

// Filter component, represents a single filter with multiple parameters
const Filter = (props) => {
  // State for tracking checked parameters in this filter
  const [checkedParams, setCheckedParams] = useState([]);
  const filterName = props.filterName;
  const paramsObj = props.paramsObj;
  
  // Use dispatch from react-redux for dispatching actions
  const dispatch = useDispatch();
  
  // useRef to track if the component has mounted
  const didMount = useRef(true);

  // Whenever checkedParams changes (after the initial mount), dispatch an action to modify filters
  useEffect(() => {
    if (didMount.current) {
      didMount.current = false;
      return;
    }
    dispatch(modifyFilters(filterName, checkedParams));
  }, [dispatch, filterName, checkedParams]);

  // Render the Filter component
  return (
    <li className="header__item">
      <div className="header__link btn">
        {filterName} <i className="header__icon fa-solid fa-chevron-down"></i>
      </div>
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

// FilterParameter component, represents a single parameter in a Filter
const FilterParameter = (props) => {
  // State for tracking if this parameter is checked
  const [checked, setChecked] = useState(false);

  // Function to handle input changes
  const handleInputChange = useCallback(() => {
    if (!checked) {
      if (props.canBeChecked) {
        // Check the checkbox, add parameter to the filter's checkedParams
        setChecked(true);
        props.setCheckedParams(props.checkedParams.concat(props.paramSlug));
      }
    } else {
      // Uncheck the checkbox, remove parameter from the filter's checkedParams
      setChecked(false);
      props.setCheckedParams(
        props.checkedParams.filter((el) => el !== props.paramSlug)
      );
    }
  }, [checked, props])

  // Render the FilterParameter component
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
