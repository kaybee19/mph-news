import React from 'react';
import { Provider } from 'react-redux';
import { createStore as reduxCreateStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'

import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';
// import axios from 'axios'

// axios.defaults.baseURL = 'https://us-central1-poli-news-77c19.cloudfunctions.net/api';

const initializeState = {};

const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
  UI: uiReducer
});

const windowGlobal = typeof window !== 'undefined' && window;

const devtools = typeof window !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : f => f;

const createStore = () => reduxCreateStore(reducers, initializeState, compose(applyMiddleware(thunk), devtools));

export default createStore;