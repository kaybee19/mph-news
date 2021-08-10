import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';

const initializeState = {};

const middleware = [thunk];

const reducers = combineReducers({
	user: userReducer,
	data: dataReducer,
	UI: uiReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 
const store = createStore(reducers, initializeState, composeEnhancers(
    applyMiddleware(...middleware)
  ));

export default store;