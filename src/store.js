import { createStore } from "redux";
import rootReducer from "./reducers";

export const store = createStore(rootReducer);
store.subscribe(() => console.log(store.getState()));

export default store;
