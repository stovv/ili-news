import logger from "redux-logger";
import throttle from "lodash.throttle";
import thunkMiddleware from "redux-thunk";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { createStore, applyMiddleware, combineReducers } from "redux";

import { loadState, saveState } from "../tools";

import auth from "./reducers/auth";
import cache from "./reducers/cache";
import common from "./reducers/common";

const bindMiddleware = (middleware = []) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    middleware = [/*logger,*/ ...middleware];
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const persistedState = loadState();
const combinedReducer = combineReducers({ common, auth, cache });

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      common: action.payload.common,
    };
  } else {
    return combinedReducer(state, action);
  }
};

const store = createStore(reducer, persistedState, bindMiddleware([thunkMiddleware]));
store.subscribe(
  throttle(() => {
    const state = store.getState();
    console.log("STORE", state);
    saveState({
      auth: state.auth,
      cache: state.cache
    });
  }, 1000)
)

export default createWrapper(() => store);
