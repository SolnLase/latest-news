export const addSearchQuery = (value, qInTitle) => ({
  type: "ADD_QUERY",
  payload: { value, qInTitle },
});

export const modifyFilters = (filterName, params) => ({
  type: "MODIFY_FILTERS",
  payload: { filterName, params },
});
