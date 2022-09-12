const accessPropErrFree = (prop, key) => {
  return typeof prop === "undefined" || typeof prop[key] === "undefined"
    ? []
    : prop[key];
};
const removeObjProp = (object, propName) =>
  Object.keys(object)
    .filter((key) => key !== propName)
    .reduce((newObject, key) => ({ ...newObject, [key]: object[key] }), {});

const reducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_QUERY":
      return { ...state, searchQuery: action.payload };
    case "ADD_FILTER_PARAM": {
      const filterName = action.payload.filterName;
      return {
        ...state,
        filters: {
          ...state.filters,
          [filterName]: [
            ...accessPropErrFree(state.filters, filterName),
            action.payload.param,
          ],
        },
      };
    }
    case "REMOVE_FILTER_PARAM": {
      const filterName = action.payload.filterName;
      const parameter = action.payload.param;
      return state.filters[filterName].length > 1 ||
        Object.keys(state.filters).length > 1
        ? {
            ...state,
            filters:
              state.filters[filterName].length > 1
                ? {
                    ...state.filters,
                    [filterName]: state.filters[filterName].filter(
                      (filterParam) => filterParam !== parameter
                    ),
                  }
                : removeObjProp(state.filters, filterName),
          }
        : removeObjProp(state, "filters");
    }
    default:
      return state;
  }
};

export default reducer;
