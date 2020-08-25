import logger from 'redux-logger';
import throttle from 'lodash.throttle';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';

import authReducer from "./auth";
import commonReducer from './common';
import { loadState, saveState } from './tools';


const reducers = combineReducers({auth: authReducer, common: commonReducer});
const persistedState = loadState();


export const store = createStore(
    reducers,
    persistedState,
    composeWithDevTools(process.env.NODE_ENV === 'development'
        ? applyMiddleware(thunkMiddleware, logger)
        : applyMiddleware(thunkMiddleware))
);

store.subscribe(
    throttle(() => {
        saveState({
            auth: store.getState().auth
        });
    }, 1000)
);