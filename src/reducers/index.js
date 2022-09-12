import { combineReducers } from "redux";
import queryReducer from "./queryReducer";
import filtersReducer from "./filtersReducer";

const rootReducer = combineReducers({
  query: queryReducer,
  filters: filtersReducer,
});

export default rootReducer;