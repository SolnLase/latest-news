import React from "react";
import Filter from "./Filter";
import FILTERS_DATA from './filtersData';

class Filters extends React.Component {
    constructor() {
        super();
    };
    render() {
        return (
            <div id="filters">
                {Object.keys(FILTERS_DATA).map(filterName => {
                    const paramsObj = FILTERS_DATA[filterName];
                    return (
                        <Filter
                            key={filterName}
                            filterName={filterName}
                            paramsObj={paramsObj} />)
                })}
            </div>)
    };
};

export default Filters;