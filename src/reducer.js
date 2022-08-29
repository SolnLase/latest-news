const reducer = (state = { value: 0 }, action) => {
  switch (action.type) {
    case 'searchQuery': 
      return action.payload
    case 'filterQuery':
      return action.payload
    default:
      return state;
  }
};

export default reducer;
