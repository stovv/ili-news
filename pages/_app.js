import React from 'react';
import App from 'next/app';
import Head from 'next/head';

import withRedux from "next-redux-wrapper";

import IliThemeProvider from '../theme';
import { Provider as StoreProvider } from "react-redux";
import { makeStore } from "../store";
import { Containers } from '../components';


import 'toasted-notes/src/styles.css';
import 'emoji-mart/css/emoji-mart.css';
import '../assets/fonts/lato/lato.css';
import './style.css';

//const header_ignore = ["/smisol/create", "/smisol/drafts", "/login"];


class IliApp extends App {
  static async getInitialProps({Component, ctx}) {
      // we can dispatch from here too
      const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
      // var categories = null;
      //   await fetchCategories(["id", "title", "slug"])
      //       .then(response=>{
      //           categories = response.data.data.categories;
      //           categories.sort(function(a, b) {
      //             if (a.id < b.id) return -1;
      //             if (a.id > b.id) return 1;
      //             return 0;
      //           });
      //       })
      //       .catch(reason=>{
      //       });
      // return {pageProps, categories};
      return {pageProps};
  }

  render() {
    const { Component, pageProps, store, categories} = this.props;
    return (
      <>
          <Head>
            <meta charSet="utf-8" />
             <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=0"/>
              <title>ИЛИ</title>
          </Head>
          <StoreProvider store={store}>
            <IliThemeProvider>
                { /*!header_ignore.includes(this.props.router.route) && <HeaderNavBar categories={categories} route={this.props.router.asPath}/>*/}
                {/*<HeaderPreLoader/>*/}
                <Containers.AppContainer>
                    <Component {...pageProps} />
                </Containers.AppContainer>
            </IliThemeProvider>
          </StoreProvider>
      </>
    );
  }
}

export default withRedux(makeStore)(IliApp);
