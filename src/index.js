import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import SearchInput from './components/SeachInput';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css';

import reducer from './reducer';

const store = createStore(reducer);

const searchFormRoot = ReactDOM.createRoot(document.getElementById('searchFormRoot'));
// searchFormRoot.render(<Provider store={store}><SearchInput /></Provider >)
searchFormRoot.render(<SearchInput />)