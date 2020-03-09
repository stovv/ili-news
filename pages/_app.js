import * as React from 'react';
import App from 'next/app';
import withRedux from "next-redux-wrapper";
import IliThemeProvider from '../theme';
import {createStore} from "redux";
import {Provider as StoreProvider} from "react-redux";

import 'bootstrap/dist/css/bootstrap.min.css';

const reducer = (state = {foo: ''}, action) => {
  switch (action.type) {
      case 'FOO':
          return {...state, foo: action.payload};
      default:
          return state
  }
};

const makeStore = (initialState, options) => {
  return createStore(reducer, initialState);
};

class IliApp extends App {

  static async getInitialProps({Component, ctx}) {
      // we can dispatch from here too
      ctx.store.dispatch({type: 'FOO', payload: 'foo'});
      const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
      return {pageProps};

  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <StoreProvider store={store}>
        <IliThemeProvider>
          <Component {...pageProps} />
        </IliThemeProvider>
      </StoreProvider>
    );
  }
}

export default withRedux(makeStore)(IliApp);
