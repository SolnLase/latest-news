import React from "react";
import $ from "jquery";
import FILTERS_DATA from "../filtersData";
import { Collapse } from "bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export default function Filters() {
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
}

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleCollapse: false,
    };
    this.collapseContainerId = `collapseFilter${capitalize(props.filterName)}`;
  }

  componentDidUpdate() {
    const collapseContainer = $(`#${this.collapseContainerId}`);
    const bsCollapse = new Collapse(collapseContainer, { toggle: false });
    this.state.toggleCollapse ? bsCollapse.hide() : bsCollapse.show();
  }

  toggleCollapse = () => {
    this.setState({ toggleCollapse: !this.state.toggleCollapse });
  };

  render() {
    const filterName = this.props.filterName;
    const paramsObj = this.props.paramsObj;
    const containerIsCollapsed = $(`#${this.collapseContainerId}`).hasClass(
      "show"
    );
    return (
      <div className="filter" aria-label="filter" >
        <div
          onClick={this.toggleCollapse}
          className="filter__header d-flex justify-content-between"
          aria-expanded="false"
          aria-controls={this.collapseContainerId}
        >
          <p className="filter__title">{filterName}</p>
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
              const parameterId = filterName + capitalize(parameterName);
              return (
                <li key={parameterName} className="form-check">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id={parameterId}
                    />
                    <label className="form-check-label" htmlFor={parameterId}>
                      {parameterName}
                    </label>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
