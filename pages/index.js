import React from 'react';

import {TopPosts, NewsPostsComps, CategoryLine, CompsBannerAd} from '../compilations';
import {Containers} from '../components';
import {SITE_INFO, SITE_URL, YANDEX_VERIFICATION} from '../constants';
import {Public} from '../api';
import {Mocks} from '../assets';
import {NextSeo} from "next-seo";


class FrontPage extends React.Component {
    static async getInitialProps() {
        let topPosts = [];
        await Public.fetchTopPosts()
            .then(response => {
                topPosts = response.data.tops ? response.data.tops : [];
            })
            .catch(reason => {
                console.log("REASON", reason.response);
            });

        let lastTheme = null;
        let newsFeed = null;
        let posts = null;
        try {
            await Public.fetchTheme()
                .then(response => lastTheme = response.data.themes[0])
                .catch(reason => console.log(reason.response.statusText));
            await Public.fetchNews()
                .then(response => newsFeed = response.data.posts)
                .catch(reason => console.log(reason.response.statusText));
            await Public.fetchSimplePosts()
                .then(response => posts = response.data.posts)
                .catch (reason => console.log(reason));
        }catch (e) {
            console.log(e);
        }
        return {topPosts, lastTheme, newsFeed, posts};
    }

    render() {
        const {topPosts, lastTheme, newsFeed, posts} = this.props;

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
                <NewsPostsComps compilation={lastTheme} news={newsFeed} posts={posts}/>
            </React.Fragment>
        );
    }
}

/*
                <CategoryLine posts={Mocks.testPosts}/>
                <CompsBannerAd posts={Mocks.testPosts} bannerContent={{
                    text: "Стань членом клуба 'ИЛИ ПРЕМИУМ' и получай подарки за чтение новостей",
                    buttonText: "Присоеденится",
                    buttonLink: "/test"
                }} bannerAdContent={{}}/>
*
* */

export default FrontPage;