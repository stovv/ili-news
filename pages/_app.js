import React from 'react';
import App from 'next/app';
import withRedux from "next-redux-wrapper";
import {Provider as StoreProvider} from "react-redux";

import IliThemeProvider from '../theme';
import { makeStore } from "../store";
import Head from 'next/head';
import {
  Header,
  HeaderPreLoader
} from '../components';
import {fetchCategories} from '../api';
import 'toasted-notes/src/styles.css';

const header_ignore = ["/smisol/create", "/smisol/drafts", "/login"];

class IliApp extends App {

  static async getInitialProps({Component, ctx}) {
      // we can dispatch from here too
      const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
      var categories = null;
        await fetchCategories(["id", "title", "slug"])
            .then(response=>{
                categories = response.data.data.categories;
                categories.sort(function(a, b) {
                  if (a.id < b.id) return -1;
                  if (a.id > b.id) return 1;
                  return 0;
                });
            })
            .catch(reason=>{
            });
      return {pageProps, categories};

  }

  render() {
    const { Component, pageProps, store, categories} = this.props;
    return (
      <StoreProvider store={store}>
        <style jsx global>{`
          body { margin: 0 }
        `}</style>
        <Head>
          <link href="https://fonts.googleapis.com/css?family=Marmelad&display=swap" rel="stylesheet"/>
        </Head>
        <IliThemeProvider>
            { !header_ignore.includes(this.props.router.route) && <Header categories={categories} route={this.props.router.asPath}/>}
            <HeaderPreLoader/>
            <Component {...pageProps} />
        </IliThemeProvider>
      </StoreProvider>
    );
  }
}

export default withRedux(makeStore)(IliApp);
