export const addSearchQuery = (value, qInTitle) => ({
  type: "ADD_QUERY",
  payload: { value, qInTitle },
});

export const addFilter = (filterName, params) => ({
  type: "ADD_FILTER",
  payload: { filterName, params },
});
