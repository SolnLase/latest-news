const objectFilter = (object, propName) =>
  // Returns a copy of a specified object, without a specified property
  Object.keys(object)
    .filter((key) => key !== propName)
    .reduce(
      (newObject, key) => Object.assign(newObject, { [key]: object[key] }),
      {}
    );

const filtersReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_FILTER_PARAM": {
      const filterName = action.payload.filterName;
      const parameter = action.payload.param;
      const filterParamsArr = state[filterName];
      return Object.assign({}, state, {
        [filterName]: filterParamsArr
          ? filterParamsArr.concat(parameter)
          : [parameter],
      });
    }
    case "REMOVE_FILTER_PARAM": {
      const filterName = action.payload.filterName;
      const parameter = action.payload.param;
      const filterParamsArr = state[filterName];
      // Remove specified parameter or remove the whole filter
      return filterParamsArr.length > 1
        ? Object.assign({}, state, {
            [filterName]: filterParamsArr.filter(
              (filterParam) => filterParam !== parameter
            ),
          })
        : objectFilter(state, filterName);
    }
    default:
      return state;
  }
};

export default filtersReducer;
