import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import authReducer from "./authReducer.react";
import smisolReducer from "./smisolReducer.react";
import commonReducer from './commonReducer.react';
import logger from 'redux-logger'


const reducers = combineReducers({auth: authReducer, smisol: smisolReducer, common: commonReducer});


export const makeStore = (initialState = {}) => {
   return createStore(
       reducers,
       initialState,
       composeWithDevTools(applyMiddleware(thunkMiddleware, logger))
   )
};