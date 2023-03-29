const reducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_QUERY":
      return { ...state, query: action.payload };
    case "ADD_FILTER":
      const filterName = action.payload.filterName;
      const parameters = action.payload.params;
      return {
        ...state,
        filters: { ...state.filters, [filterName]: parameters },
      };
  }
  return state;
};

export default reducer;
