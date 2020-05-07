import React from 'react';

import {TopPosts, NewsPostsComps, CategoryLine, CompsBannerAd} from '../compilations';
import {Containers} from '../components';
import {SITE_INFO, SITE_URL, YANDEX_VERIFICATION} from '../constants';
import {Public} from '../api';
import {Mocks} from '../assets';
import {NextSeo} from "next-seo";


class FrontPage extends React.Component {
    static async getInitialProps() {
        var topPosts = [];
        await Public.fetchTopPosts()
            .then(response => {
                topPosts = response.data.tops ? response.data.tops : [];
            })
            .catch(reason => {
                console.log("REASON", reason.response);
            });
        return {topPosts};
    }

    render() {
        const {topPosts} = this.props;

        return (
            <React.Fragment>
                <NextSeo title={SITE_INFO.TITLE}
                         description={SITE_INFO.DESCRIPTION}
                         canonical={SITE_URL}
                         openGraph={{
                             url: SITE_URL,
                             locale: 'ru_RU',
                             type: "website",
                             title: SITE_INFO.TITLE,
                             description: SITE_INFO.DESCRIPTION,
                             images: [SITE_INFO.IMAGE],
                             site_name: SITE_INFO.TITLE,
                         }}
                         twitter={{
                             handle: '@handle',
                             site: '@site',
                             cardType: 'summary_large_image',
                         }}/>
                <meta name="yandex-verification" content={YANDEX_VERIFICATION}/>
                <TopPosts posts={topPosts}/>

            </React.Fragment>
        );
    }
}

/*<NewsPostsComps compilation={Mocks.testPosts} news={Mocks.testPosts} posts={Mocks.testPosts}/>
                <CategoryLine posts={Mocks.testPosts}/>
                <CompsBannerAd posts={Mocks.testPosts} bannerContent={{
                    text: "Стань членом клуба 'ИЛИ ПРЕМИУМ' и получай подарки за чтение новостей",
                    buttonText: "Присоеденится",
                    buttonLink: "/test"
                }} bannerAdContent={{}}/>
*
* */

export default FrontPage;