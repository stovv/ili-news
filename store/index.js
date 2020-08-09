import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import authReducer from "./authReducer.react";
import commonReducer from './commonReducer.react';
import logger from 'redux-logger';
import { loadState, saveState } from './tools';
import throttle from 'lodash.throttle';


const reducers = combineReducers({auth: authReducer, common: commonReducer});


const persistedState = loadState();


export const store = createStore(
    reducers,
    persistedState,
    composeWithDevTools(applyMiddleware(thunkMiddleware, /*axiosMiddleware(client),*/ /*logger*/))
);


store.subscribe(
    throttle(() => {
        saveState({
            auth: store.getState().auth
        });
    }, 1000)
);