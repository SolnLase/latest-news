export const addSearchQuery = (value, qInTitle) => ({
  type: "ADD_QUERY",
  payload: { value, qInTitle },
});

export const addFilterParameter = (filterName, param) => ({
  type: "ADD_FILTER_PARAM",
  payload: { filterName, param },
});

export const removeFilterParameter = (filterName, param) => ({
  type: "REMOVE_FILTER_PARAM",
  payload: { filterName, param },
});
