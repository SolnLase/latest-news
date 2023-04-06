// Returns object without specified object parameter
const removeObjProp = (object, propName) =>
  Object.keys(object)
    .filter((key) => key !== propName)
    .reduce((newObject, key) => ({ ...newObject, [key]: object[key] }), {});

const reducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_QUERY":
      return { ...state, query: action.payload };
    case "MODIFY_FILTERS":
      const filterName = action.payload.filterName;
      const parameters = action.payload.params;
      if (parameters.length) {
        // Return state with the parameters in action payload
        return {
          ...state,
          filters: { ...state.filters, [filterName]: parameters },
        };
      } else {
        // Remove the filter
        return {
          ...state,
          filters: removeObjProp(state.filters, filterName),
        };
      }
    default:
      return state;
  }
};

export default reducer;
