const reducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_QUERY":
      return { ...state, query: action.payload };
    case "ADD_FILTER":
      const filterName = action.payload.filterName;
      const parameters = action.payload.params;
      if (parameters.length) {
        return {
          ...state,
          filters: { ...state.filters, [filterName]: parameters },
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default reducer;
