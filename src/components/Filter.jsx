import React from "react";

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

class Filter extends React.Component {
    constructor() {
        super();
        this.state = {
            expandParams: true,
        }
    }
    

    render() {
        console.log('dsa')
        const filterName = this.props.filterName;
        const paramsObj = this.props.paramsObj;
        const capitalizedFilterName = capitalize(filterName);
        return (
            <div className="filter">
                <p className="filter--title" data-bs-toggle="collapse"
                    data-bs-target={`#collapseFilter${capitalizedFilterName}`} aria-expanded="false"
                    aria-controls={`collapseFilter${capitalizedFilterName}`}>{filterName}</p>
                <div className="collapse show" id={`collapseFilter${capitalizedFilterName}`}>
                    <ul className="filter__params-container">
                        {Object.keys(paramsObj).map(parameterName => {
                            const parameterId = filterName + capitalize(parameterName);
                            return (
                                <li key={parameterName} className="form-check">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value=""
                                            id={parameterId} />
                                        <label className="form-check-label" htmlFor={parameterId}>
                                            {parameterName}
                                        </label>
                                    </div>
                                </li>)
                        })}
                    </ul>
                </div>
            </div>)
    }
}

export default Filter;