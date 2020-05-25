import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import withRedux from "next-redux-wrapper";
import { Provider as StoreProvider } from "react-redux";
import { YMInitializer } from 'react-yandex-metrika';

import IliThemeProvider from '../theme';
import { store } from "../store";
import { Containers, Menus, Form } from '../components';
import { Public } from '../api';
import * as CommonActions from '../store/commonActions.react';

import 'nprogress/nprogress.css'; //styles of nprogress
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import "react-datepicker/dist/react-datepicker.css";
import 'toasted-notes/src/styles.css';
import 'emoji-mart/css/emoji-mart.css';
import '../assets/fonts/lato/lato.css';
import './style.css';


const header_ignore = ["/smisl/create", "/smisl/drafts", "/smisl/preview",  "/login"];
const yParams = { accounts: [62554705], options: { webvisor: true }};

class IliApp extends App {
  static async getInitialProps({Component, ctx}) {
      const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
      let header = null;

      await Public.getMenu('header')
          .then(response => header = response.data.menus[0].item)
          .catch(reason => console.log("HEADER MENU NOT LOADED", reason));

      return {pageProps, header};
  }

    constructor(props){
        super(props);
        const { store } = props;
        if (typeof window !== "undefined"){
            store.dispatch(CommonActions.setPageSize(window.innerWidth, window.innerHeight));
        }

        this.handleWindowResize = this.handleWindowResize.bind(this);
    }

    handleWindowResize = () => {
        this.props.store.dispatch(CommonActions.setPageSize(window.innerWidth, window.innerHeight));
    }

    componentDidMount() {
        if (typeof window !== 'undefined'){
            window.addEventListener('resize', this.handleWindowResize);
        }
    }

    componentWillUnmount() {
        if (typeof window !== 'undefined'){
            window.removeEventListener('resize', this.handleWindowResize);
        }
    }

  render() {
    const { Component, pageProps, store, header} = this.props;
    return (
      <>
          <Head>
              <title>ИЛИ Молодежный журнал</title>
              <link rel="manifest" href="manifest.json"/>
          </Head>
          <StoreProvider store={store}>
            <IliThemeProvider>
                {header_ignore.includes(this.props.router.route) || <Menus.HeaderMain menus={header} route={this.props.router.asPath}/>}
                <Form.HeaderPreloader/>
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

export default withRedux(()=>store)(IliApp);
