import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import { createStore, applyMiddleware, combineReducers } from 'redux';

import common from "./reducers/common";


const bindMiddleware = (middleware = []) => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension')
        middleware = [/*logger,*/ ...middleware];
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
}

const combinedReducer = combineReducers({ common })

const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        }
        return nextState
    } else {
        return combinedReducer(state, action)
    }
}

const initStore = () => createStore(reducer, bindMiddleware([ thunkMiddleware ]));
export default createWrapper(initStore);