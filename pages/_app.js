import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import withRedux from "next-redux-wrapper";
import { Provider as StoreProvider } from "react-redux";
import { YMInitializer } from 'react-yandex-metrika';

import IliThemeProvider from '../theme';
import { makeStore } from "../store";
import { Containers, Menus } from '../components';
import { Public } from '../api';

import 'nprogress/nprogress.css'; //styles of nprogress
import 'toasted-notes/src/styles.css';
import 'emoji-mart/css/emoji-mart.css';
import '../assets/fonts/lato/lato.css';
import './style.css';


const header_ignore = ["/smisol/create", "/smisol/drafts", "/login"];
const yParams = { accounts: [62554705], options: { webvisor: true }};

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

class IliApp extends App {
  static async getInitialProps({Component, ctx}) {
      const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
      let header = null;

      await Public.getMenu('header')
          .then(response => header = response.data.menus[0].item)
          .catch(reason => console.log("HEADER MENU NOT LOADED", reason.response.statusText));

      return {pageProps, header};
  }

  render() {
    const { Component, pageProps, store, header} = this.props;
    return (
      <>
          <StoreProvider store={store}>
            <IliThemeProvider>
                {header_ignore.includes(this.props.router.route) || <Menus.HeaderMain menus={header} route={this.props.router.asPath}/>}
                {/*<HeaderPreLoader/>*/}
                <Containers.AppContainer>
                    <Component {...pageProps} />
                </Containers.AppContainer>
            </IliThemeProvider>
          </StoreProvider>
          <div>
              <YMInitializer accounts={yParams.accounts} options={yParams.options} version="2" />
          </div>
      </>
    );
  }
}

export default withRedux(makeStore)(IliApp);
