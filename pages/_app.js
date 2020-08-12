import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import withRedux from "next-redux-wrapper";
import { Provider as StoreProvider } from "react-redux";
import { YMInitializer } from 'react-yandex-metrika';

import { Public } from '../api';
import { store } from "../store";
import IliThemeProvider from '../theme';
import {YANDEX_METRIKA} from "../constants";
import { Containers, Menus, Form } from '../components';
import * as CommonActions from '../store/commonActions.react';

import 'nprogress/nprogress.css'; //styles of nprogress
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import "react-datepicker/dist/react-datepicker.css";
import 'toasted-notes/src/styles.css';
import 'emoji-mart/css/emoji-mart.css';
import '../assets/fonts/lato/lato.css';
import './style.css';


class IliApp extends App {
  static async getInitialProps({Component, ctx}) {
      const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
      let header = null;
      let footer = null;

      await Public.getMenu('header')
          .then(response => header = response.data.menus[0].item)
          .catch(reason => console.log("HEADER MENU NOT LOADED", reason));

      await Public.getMenu('footer')
          .then(response => footer = response.data.menus[0].item)
          .catch(reason => console.log("FOOTER MENU NOT LOADED", reason));

      return {pageProps, header, footer};
  }

    constructor(props){
        super(props);
        const { store } = props;
        if (typeof window !== "undefined"){
            store.dispatch(CommonActions.setPageSize(window.innerWidth, window.innerHeight));
            document.documentElement.lang="ru";
        }

        this.handleWindowResize = this.handleWindowResize.bind(this);
    }

    handleWindowResize = () => {
        this.props.store.dispatch(CommonActions.setPageSize(window.innerWidth, window.innerHeight));
    }

    componentDidMount() {
        if (typeof window !== 'undefined'){
            this.handleWindowResize();
            window.addEventListener('resize', this.handleWindowResize);
        }
    }

    componentWillUnmount() {
        if (typeof window !== 'undefined'){
            window.removeEventListener('resize', this.handleWindowResize);
        }
    }

  render() {
    const { Component, pageProps, store, header, footer, router} = this.props;

    return (
      <>
          <Head>
              <title>ИЛИ Молодежный журнал</title>
              <link rel="manifest" href="manifest.json"/>
          </Head>
          <StoreProvider store={store}>
            <IliThemeProvider>
                <Menus.Search/>
                { router.route !== "/login" && <Menus.HeaderMain menus={header} route={this.props.router.asPath}/>}
                <Form.HeaderPreloader/>
                <Containers.AppContainer>
                    <Component {...pageProps} />
                </Containers.AppContainer>
                { router.route !== "/login" && <Menus.FooterMain menus={footer} route={this.props.router.asPath}/>}
            </IliThemeProvider>
          </StoreProvider>
          <div>
              <YMInitializer accounts={YANDEX_METRIKA.accounts} options={YANDEX_METRIKA.options} version="2" />
          </div>
      </>
    );
  }
}

export default withRedux(()=>store)(IliApp);
