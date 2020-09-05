import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import toaster from "toasted-notes";
import withRedux from "next-redux-wrapper";
import { Provider as StoreProvider } from "react-redux";
import { YMInitializer } from 'react-yandex-metrika';

import { Public } from '../api';
import { store } from "../store";
import IliThemeProvider from '../theme';
import {YANDEX_METRIKA} from "../constants";
import { Containers, Menus, Form, Toasts, Typography } from '../components';
import { Common } from '../actions';

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
            store.dispatch(Common.setPageSize(window.innerWidth, window.innerHeight));
            document.documentElement.lang="ru";
        }
        this.handleWindowResize = this.handleWindowResize.bind(this);
        this.handleNotification = this.handleNotification.bind(this);
    }

    handleWindowResize = () => {
        this.props.store.dispatch(Common.setPageSize(window.innerWidth, window.innerHeight));
    }

    handleNotification (){
      setTimeout(function (){
          const { toNotify } = this.props.store.getState().common;
          if ( toNotify.length > 0){
              toNotify.forEach(item => {
                  toaster.notify(({ onClose }) => (
                      <StoreProvider store={this.props.store}>
                          <IliThemeProvider>
                              <Toasts.Emoji color={item.color} textColor={item.textColor}>
                                  {item.text}
                              </Toasts.Emoji>
                          </IliThemeProvider>
                      </StoreProvider>
                      ), { position: "top-right", duration: 2000 }
                  );
              })
              this.props.store.dispatch(Common.clearNotify());
          }

          this.handleNotification();
      }.bind(this), 3000);
    }

    componentDidMount() {
        if (typeof window !== 'undefined'){
            this.handleWindowResize();
            this.handleNotification();
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
                { !["/login", "/register", "/register/success"].includes(router.route) && <Menus.HeaderMain menus={header} route={this.props.router.asPath}/>}
                <Form.HeaderPreloader/>
                <Containers.AppContainer>
                    <Component {...pageProps} />
                </Containers.AppContainer>
                { !["/login", "/register", "/register/success"].includes(router.route)  && <Menus.FooterMain menus={footer} route={this.props.router.asPath}/>}
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
