import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import $ from "jquery";
import FILTERS_DATA from "../filtersData";
import { Collapse } from "bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { addFilterParameter, removeFilterParameter } from "../actionCreators";

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const Filters = () => {
  return (
    <div className="filters ps-2 pe-0" aria-label="filters">
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
    </div>
  );
};

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleCollapse: false,
      checkedParams: 0,
    };
    this.collapseContainerId = `collapseFilter${capitalize(props.filterName)}`;
  }

  componentDidMount() {
    const collapseContainer = $(`#${this.collapseContainerId}`);
    this.bsCollapse = new Collapse(collapseContainer, { toggle: false });
  }

  componentDidUpdate() {
    this.state.toggleCollapse ? this.bsCollapse.hide() : this.bsCollapse.show();
  }

  toggleCollapse = () => {
    this.setState({ toggleCollapse: !this.state.toggleCollapse });
  };

  incrementCheckedParams = () => {
    this.setState({ checkedParams: this.state.checkedParams + 1 });
  };

  decrementCheckedParams = () => {
    this.setState({ checkedParams: this.state.checkedParams - 1 });
  };

  render() {
    const filterName = this.props.filterName;
    const paramsObj = this.props.paramsObj;
    const containerIsCollapsed = $(`#${this.collapseContainerId}`).hasClass(
      "show"
    );
    return (
      <div className="filter" aria-label="filter">
        <div
          onClick={this.toggleCollapse}
          className="filter__header d-flex justify-content-between"
          aria-expanded="false"
          aria-controls={this.collapseContainerId}
        >
          <p className="filter__title">{filterName} (max 4)</p>
          <div className="filter__collapse-sign">
            {containerIsCollapsed ? (
              <FontAwesomeIcon icon={faPlus} />
            ) : (
              <FontAwesomeIcon icon={faMinus} />
            )}
          </div>
        </div>
        <div className="collapse show" id={this.collapseContainerId}>
          <ul className="filter__container">
            {Object.keys(paramsObj).map((parameterName) => {
              const parameterValue = paramsObj[parameterName];
              const parameterId = filterName + capitalize(parameterName);
              return (
                <FilterParameter
                  filterName={filterName}
                  parameterName={parameterName}
                  parameterValue={parameterValue}
                  parameterId={parameterId}
                  incrementCheckedParams={this.incrementCheckedParams}
                  decrementCheckedParams={this.decrementCheckedParams}
                  canBeChecked={this.state.checkedParams < 4}
                  key={parameterId}
                />
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

const FilterParameter = (props) => {
  const [checked, setChecked] = useState(false);
  const didMount = useRef(true);
  const dispatch = useDispatch();

  const url = new URL(window.location);

  const filterName = props.filterName;
  const parameterValue = props.parameterValue;
  const canBeChecked = props.canBeChecked;

  const incrementCheckedParams = props.incrementCheckedParams;
  const decrementCheckedParams = props.decrementCheckedParams;

  useEffect(() => {
    if (didMount.current) {
      didMount.current = false;
      return;
    }
    if (checked) {
      dispatch(addFilterParameter(filterName, parameterValue));
      url.searchParams.set(filterName, parameterValue);
    } else {
      dispatch(removeFilterParameter(filterName, parameterValue));
    }
  }, [checked, dispatch, filterName, parameterValue]);

  useEffect(() => {
    window.history.replaceState({}, "", url);
  }, [url]);

  const handleInputChange = () => {
    if (!checked) {
      if (canBeChecked) {
        setChecked(true);
        incrementCheckedParams();
      }
    } else {
      setChecked(false);
      decrementCheckedParams();
    }
  };

  return (
    <li key={props.parameterName} className="form-check">
      <div className="form-check">
        <input
          onChange={handleInputChange}
          id={props.parameterId}
          className="form-check-input"
          type="checkbox"
          checked={checked}
        />
        <label className="form-check-label" htmlFor={props.parameterId}>
          {props.parameterName}
        </label>
      </div>
    </li>
  );
};

export default Filters;
