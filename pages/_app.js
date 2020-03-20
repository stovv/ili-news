import React from 'react';
import App, {Container} from 'next/app';
import withRedux from "next-redux-wrapper";
import {Provider as StoreProvider} from "react-redux";

import IliThemeProvider from '../theme';
import { makeStore } from "../store";
import Head from 'next/head';
import {HeaderPreLoader} from '../components';

import 'toasted-notes/src/styles.css';


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
        <Head>
        <link href="https://fonts.googleapis.com/css?family=Marmelad&display=swap" rel="stylesheet"/>
        </Head>
        <IliThemeProvider>
          
          <HeaderPreLoader/>
          <Component {...pageProps} />
        </IliThemeProvider>
      </StoreProvider>
    );
  }
}

export default withRedux(makeStore)(IliApp);
