import dynamic from 'next/dynamic';
import '../styles/globals.css';
import '../styles/light.css';
import '../assets/lato/lato.css';

import wrapper from '../store';
import Header from "../components/Menus/Header";
import Footer from "../components/Menus/Footer";
import { HEADER_IGNORE, FOOTER_IGNORE } from "../constants";

const HeaderPreloader = dynamic(() => import("../components/Forms/HeaderPreloader"));


const IliApp = ({ Component, pageProps, router }) => {
    return (
        <>
            <HeaderPreloader/>
            { !HEADER_IGNORE.includes(router.route) && <Header route={router.asPath}/>}
            <div className={"AppContainer"}>
                <Component {...pageProps}/>
            </div>
            { !FOOTER_IGNORE.includes(router.route) && <Footer route={router.asPath}/>}
        </>
    );
}

export default wrapper.withRedux(IliApp);
