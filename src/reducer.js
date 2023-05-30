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
      // Add, remove or update filters
      const filterName = action.payload.filterName;
      const parameters = action.payload.params;
      if (parameters.length) {
        // If parameters related to the filter exist
        // return the state with parameters in action payload
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
