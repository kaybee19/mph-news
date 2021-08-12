import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import userReducer from './src/redux/reducers/userReducer';
import dataReducer from './src/redux/reducers/dataReducer';
import uiReducer from './src/redux/reducers/uiReducer';
import axios from 'axios'

axios.defaults.baseURL = 'https://us-central1-poli-news-77c19.cloudfunctions.net/api';

const initializeState = {};

const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
  UI: uiReducer
});

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(reducers, initializeState, composeEnhancers(
    applyMiddleware(...middleware)
  ));

export default ({ element }) => (
  <Provider store={store}>{element}</Provider>
);

// import React from "react"
// import { Provider } from "react-redux"

// import createStore from "./src/redux/createStore"

// // eslint-disable-next-line react/display-name,react/prop-types
// export default ({ element }) => {
//   // Instantiating store in `wrapRootElement` handler ensures:
//   //  - there is fresh store for each SSR page
//   //  - it will be called only once in browser, when React mounts
//   const store = createStore()
//   return <Provider store={store}>{element}</Provider>
// }