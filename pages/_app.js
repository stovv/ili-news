import App, {Container} from 'next/app';
import React from 'react';
import IliThemeProvider from '../theme';

import { makeStore } from "../store";
import withRedux from "next-redux-wrapper";
import {Provider as StoreProvider} from "react-redux";

import 'bootstrap/dist/css/bootstrap.min.css';


class IliApp extends App {

  static async getInitialProps({Component, ctx}) {
      // we can dispatch from here too
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
