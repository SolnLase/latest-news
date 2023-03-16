import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import FILTERS_DATA from "../filtersData";
import { addFilterParameter, removeFilterParameter } from "../actionCreators";
import $ from "jquery";
import { Collapse } from "bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

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
            {Object.keys(paramsObj).map((paramName) => {
              const paramSlug = paramsObj[paramName];
              const parameterId = filterName + capitalize(paramName);
              return (
                <FilterParameter
                  filterName={filterName}
                  paramName={paramName}
                  paramSlug={paramSlug}
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

  useEffect(() => {
    if (didMount.current) {
      didMount.current = false;
      return;
    }
    if (checked) {
      dispatch(addFilterParameter(props.filterName, props.paramSlug));
    } else {
      dispatch(removeFilterParameter(props.filterName, props.paramSlug));
    }
  }, [checked, dispatch, props.filterName, props.paramSlug]);

  const handleInputChange = () => {
    if (!checked) {
      if (props.canBeChecked) {
        setChecked(true);
        props.incrementCheckedParams();
      }
    } else {
      setChecked(false);
      props.decrementCheckedParams();
    }
  };

  return (
    <li key={props.paramName} className="form-check">
      <div className="form-check">
        <input
          onChange={handleInputChange}
          id={props.parameterId}
          className="form-check-input"
          type="checkbox"
          checked={checked}
        />
        <label className="form-check-label" htmlFor={props.parameterId}>
          {props.paramName}
        </label>
      </div>
    </li>
  );
};

export default Filters;
