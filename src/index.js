import React from "react";
import ReactDOM from "react-dom/client";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducer";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";

export const store = createStore(reducer);
store.subscribe(() => console.log(store.getState()))

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Provider store={store}><App /></ Provider>);
