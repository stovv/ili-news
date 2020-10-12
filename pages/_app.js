import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import dynamic from "next/dynamic";
//import toaster from "toasted-notes";
import withRedux from "next-redux-wrapper";
import { Provider as StoreProvider } from "react-redux";

import { Public } from '../api';
import { store } from "../store";
import { YANDEX_METRIKA } from "../constants";
import { Common } from '../actions';

// import 'toasted-notes/src/styles.css';
import '../assets/fonts/lato/lato.css';
import containerStyles from '../components/Containers/styles/containers.module.css';
import '../styles/light.css';
import '../styles/global.css';

//const YMInitializer = dynamic(import("react-yandex-metrika").YMInitializer);
const Search = dynamic(import("../components/Menus/Search.react"));
const Footer = dynamic(import("../components/Menus/FooterMain.react"));
const Header = dynamic(import("../components/Menus/HeaderMain.react"));
const HeaderPreloader = dynamic(import("../components/Forms/HeaderPreloader.react"));


class IliApp extends App {
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
                  // toaster.notify(({ onClose }) => (
                  //     <StoreProvider store={this.props.store}>
                  //         {/*<IliThemeProvider>*/}
                  //             <Toasts.Emoji color={item.color} textColor={item.textColor}>
                  //                 {item.text}
                  //             </Toasts.Emoji>
                  //         {/*</IliThemeProvider>*/}
                  //     </StoreProvider>
                  //     ), { position: "top-right", duration: 2000 }
                  // );
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
                {/*<Search/>*/}
                { !["/login", "/register", "/register/success"].includes(router.route) && <Header menus={header} route={this.props.router.asPath}/>}
                <HeaderPreloader options={{ showSpinner: false }} />
                <div className={containerStyles.appContainer}>
                    <Component {...pageProps} />
                </div>
                { !["/login", "/register", "/register/success"].includes(router.route)  && <Footer menus={footer} route={this.props.router.asPath}/>}
          </StoreProvider>
          {/*<YMInitializer accounts={YANDEX_METRIKA.accounts} options={YANDEX_METRIKA.options} version="2" />*/}
      </>
    );
  }
}

IliApp.getInitialProps = async ({Component, ctx}) => {
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

export default withRedux(()=>store)(IliApp);
