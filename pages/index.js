import React from 'react';
import dynamic from "next/dynamic";
import {connect} from 'react-redux';
//import { NextSeo, SocialProfileJsonLd } from "next-seo";

import {
    fetchFrontPageCategories, fetchSimplePosts, fetchCatPosts,
    fetchIndexPage, fetchNews, fetchTheme, fetchPostsCount
} from '../api/methods/public.react';
import { changeInfinityState } from "../actions/common";
import { Box } from 'reflexbox';
// import { SITE_INFO, SITE_URL, YANDEX_VERIFICATION } from '../constants';

const Loader = dynamic(import("../components/Forms/Loader.react"));
const TopPosts = dynamic(import("../compilations/TopPosts.react"));
const Default = dynamic(import("../components/Containers/Default"));
const AdBlock = dynamic(import("../components/Forms/AdBlock.react"));
const Offscreen = dynamic(import("../components/Containers/Offscreen"));
const InfiniteScroll = dynamic(import("react-infinite-scroll-component"));
const CategoryLine = dynamic(import("../compilations/CategoryLine.react"));
const CompsBannerAd = dynamic(import("../compilations/CompsBannerAd.react"));
const NewsPostsComps = dynamic(import("../compilations/NewsPostsComps.react"));

function randomChoice(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}


class FrontPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            existsPostIds: [
                ...props.posts.map(post => post.id),
                ...props.catLine.posts.map(post => post.id),
                ...props.topPosts.map(post => post.id),
                ...props.lastTheme.posts.map(post => post.id),
                ...props.nextTheme.posts.map(post => post.id)
            ],
            existsCategoryIds: props.nonUsedCategories,
            items: [],
            categories: [],
            offsets: {},
            prevBlocks: [],
            uid: 2,
            hasMore: true
        }

        this.fetchMore = this.fetchMore.bind(this);
        this.props.dispatch(changeInfinityState(true));
    }


    async fetchMore(){
        let alreadyCount = this.state.existsPostIds.length;
        let offsets = this.state.offsets;
        Object.values(offsets).forEach(count => alreadyCount += count);

        if (this.props.postsCount <= alreadyCount){
            this.setState({hasMore: false})
            this.props.dispatch(changeInfinityState(false));
            return;
        }

        let items = [];
        let prevBlocks = this.state.prevBlocks;
        if ( prevBlocks.length > 5 ){
            prevBlocks = prevBlocks.slice(-3);
        }

        for (let i = 0; i < 4; i++){

            let type = randomChoice(['cat', 'ad']);

            while (['ad'].includes(type) && (prevBlocks[prevBlocks.length - 1] === type ||
                (prevBlocks.length > 1 && prevBlocks[prevBlocks.length - 2] === type))) {
                type = randomChoice(['cat', 'ad']);
            }
            prevBlocks.push(type);

            switch (type) {
                case 'cat':{
                    if (this.state.existsCategoryIds.length === 0){
                        if ( this.state.categories == null || this.state.categories.length === 0 ){
                            await fetchFrontPageCategories()
                                .then(response => {
                                    this.state.categories = response.data.categories;
                                })
                                .catch(reason => console.log(reason));
                        }
                        this.state.existsCategoryIds = this.state.categories;
                    }

                    let catLine = null;
                    while (catLine === null && this.state.existsCategoryIds.length > 0){
                        const category = randomChoice(this.state.existsCategoryIds);
                        const index = this.state.existsCategoryIds.indexOf(category);
                        if (index > -1) {
                            this.state.existsCategoryIds.splice(index, 1);
                        }

                        let start = (offsets[category.id] != null) ? offsets[category.id] : 0;

                        await fetchCatPosts(4, category.id, this.state.existsPostIds, start)
                            .then(response => {
                                if (response.data.posts != null && response.data.posts.length > 0){
                                    catLine = response.data.posts;
                                    offsets[category.id] = offsets[category.id] !== undefined ? offsets[category.id] + 4 : 4;
                                    items.push(
                                        <CategoryLine posts={response.data.posts} category={category}/>
                                    );
                                }
                            })
                            .catch(reason => console.log(reason));
                    }
                    break;
                }

                case 'ad':{
                    if (this.props.width > 1023){
                        items.push(
                            <Default>
                                <Box mx="auto" my="48px" height={"280px"} width={"100%"}>
                                    <AdBlock id="R-A-351229-8" width="100%" height="100%" infinity
                                             uid={this.state.uid}/>
                                </Box>
                            </Default>
                        )
                    }else{
                        items.push(
                            <Default>
                                <Box mx="auto" my="48px" height={"280px"} width={"100%"}>
                                    <AdBlock id="R-A-351229-7" width="100%" height="100%" infinity
                                             uid={this.state.uid}/>
                                </Box>
                            </Default>
                        )
                    }

                    this.state.uid += 1;
                    break;
                }
            }
        }

        this.setState({
            items: this.state.items.concat([
                items
            ]),
            offsets: offsets,
            prevBlocks,
        })
    }

    render() {
        const { topPosts, lastTheme, nextTheme, newsFeed,
            posts, catLine = { posts: [], category: null }, width } = this.props;
        const { hasMore, items } = this.state;

        return (
            <>
                {/*<NextSeo title={SITE_INFO.TITLE}*/}
                {/*         description={SITE_INFO.DESCRIPTION}*/}
                {/*         canonical={SITE_URL}*/}
                {/*         additionalMetaTags={[*/}
                {/*             {*/}
                {/*                 name: 'yandex-verification',*/}
                {/*                 content: YANDEX_VERIFICATION*/}
                {/*             },*/}
                {/*             {*/}
                {/*                 name: 'language',*/}
                {/*                 content: 'Russian'*/}
                {/*             }*/}
                {/*         ]}*/}
                {/*         openGraph={{*/}
                {/*             url: SITE_URL,*/}
                {/*             locale: 'ru_RU',*/}
                {/*             type: "website",*/}
                {/*             title: SITE_INFO.TITLE,*/}
                {/*             description: SITE_INFO.DESCRIPTION,*/}
                {/*             images: [SITE_INFO.IMAGE],*/}
                {/*             site_name: SITE_INFO.TITLE,*/}
                {/*         }}*/}
                {/*         twitter={{*/}
                {/*             title: SITE_INFO.TITLE,*/}
                {/*             description: SITE_INFO.DESCRIPTION,*/}
                {/*             image: SITE_INFO.IMAGE.URL,*/}
                {/*             handle: '@handle',*/}
                {/*             site: '@site',*/}
                {/*             cardType: 'summary_large_image',*/}
                {/*         }}/>*/}
                {/*<SocialProfileJsonLd*/}
                {/*    type="Organization"*/}
                {/*    name={SITE_INFO.TITLE}*/}
                {/*    url={SITE_URL}*/}
                {/*    sameAs={[*/}
                {/*        "https://zen.yandex.ru/ilinnov",*/}
                {/*        "https://vk.com/ili_media",*/}
                {/*        "https://www.instagram.com/instannov"*/}
                {/*    ]}*/}
                {/*/>*/}
                <TopPosts posts={topPosts}/>
                {
                    width > 1023
                        ? <NewsPostsComps compilation={lastTheme} news={newsFeed} posts={posts}/>
                        : <Offscreen>
                            <NewsPostsComps compilation={lastTheme} news={newsFeed} posts={posts}/>
                          </Offscreen>
                }

                <Offscreen>
                    <CategoryLine posts={catLine.posts} category={catLine.category}/>
                    <CompsBannerAd theme={nextTheme} bannerContent={{
                        text: "Стань членом клуба 'ИЛИ ПРЕМИУМ' и получай подарки за чтение новостей",
                        buttonText: "Присоеденится",
                        buttonLink: "/test"
                    }} bannerAdId="R-A-351229-6" mobileBannerAdId="R-A-351229-7"/>
                    <InfiniteScroll
                        dataLength={items.length} next={this.fetchMore}
                        hasMore={hasMore} loader={<Loader/>}>
                        {
                            this.state.items.map((item, index)=>
                                <React.Fragment key={index}>{item}</React.Fragment>
                            )
                        }
                    </InfiniteScroll>
                </Offscreen>
            </>
        );
    }
}

FrontPage.getInitialProps = async () => {
    let posts = [];
    let topPosts = [];
    let newsFeed = [];
    let postsCount = 0;
    let categories = null;
    let nonUsedCategories = null;
    let catLine = { posts: [], category: null };
    let lastTheme= { title: null, posts: [] };
    let nextTheme = { title: null, posts: [] };

    try {

        await fetchIndexPage()
            .then(
                async response => {
                    if ( !response.data.topPosts || response.data.topPosts.length === 0 ){
                        await fetchSimplePosts([], [2], [], 3)
                            .then(response => topPosts = response.data.posts);
                    }else{
                        topPosts = response.data.topPosts;
                    }

                    if ( response.data.themes && response.data.themes.length > 1 ){
                        await fetchTheme(response.data.themes[0].id)
                            .then(resp => lastTheme = resp.data.theme);
                        await fetchTheme(response.data.themes[1].id)
                            .then(resp => nextTheme = resp.data.theme);

                    }
                }
            )
            .catch(reason => {
                console.log("Something wrong with getting index-page -> ", reason.response);
            });

        await fetchPostsCount([2])
            .then(response => {
                postsCount = response.data;
            });

        await fetchNews()
            .then(response => newsFeed = response.data.posts);

        await fetchFrontPageCategories()
            .then(response => {
                categories = response.data.categories;
                nonUsedCategories = response.data.categories;
            });

        const category = randomChoice(nonUsedCategories);
        while (catLine.posts.length === 0 && nonUsedCategories.length > 0){
            const index = nonUsedCategories.indexOf(category);
            if (index > -1) {
                nonUsedCategories.splice(index, 1);
            }

            await fetchCatPosts(4, category.id, [
                ...topPosts.map(post => post.id),
                ...lastTheme.posts.map(post => post.id),
                ...nextTheme.posts.map(post => post.id)])
                .then(response => {
                    if (response.data.posts.length > 0){
                        catLine = {
                            posts: response.data.posts,
                            category
                        }
                    }
                });
        }

        await fetchSimplePosts([
            ...catLine.posts.map(post => post.id),
            ...topPosts.map(post => post.id),
            ...lastTheme.posts.map(post => post.id),
            ...nextTheme.posts.map(post => post.id)
        ]).then(response => posts = response.data.posts);

    }catch (e) {
        console.log("Something wrong with getting initial data -> ", e);
    }

    return {topPosts, lastTheme, nextTheme, newsFeed, posts, postsCount, categories, nonUsedCategories, catLine};
}



function mapStateToProps(state){
    return {
        width: state.common.pageSize.width
    }
}

export default connect(mapStateToProps)(FrontPage);