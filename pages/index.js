import React from 'react';
import { Box } from 'rebass';
import { NextSeo } from "next-seo";
import { connect } from 'react-redux';
import InfiniteScroll from "react-infinite-scroll-component";


import { Public } from '../api';
import { Containers, Form } from '../components';
import { TopPosts, NewsPostsComps, CategoryLine, CompsBannerAd } from '../compilations';
import { SITE_INFO, SITE_URL, YANDEX_VERIFICATION } from '../constants';



function randomChoice(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}


class FrontPage extends React.Component {
    static async getInitialProps() {
        let topPosts = [];
        await Public.fetchTopPosts()
            .then(response => {
                topPosts = response.data.tops ? response.data.tops : [];
            })
            .catch(reason => {
               // console.log("REASON", reason.response);
            });

        let lastTheme = {
            title: null,
            posts: []
        };
        let nextTheme = {
            title: null,
            posts: []
        };
        let newsFeed = [];
        let posts = [];
        let categories = null;
        let nonUsedCategories = null;
        let catLine = { posts: [], category: null };

        try {
            await Public.fetchTheme()
                .then(response => {
                    if (response.data.themes !== null && response.data.themes.length > 0){
                        lastTheme = response.data.themes[0]
                    }
                });
            await Public.fetchTheme(1)
                .then(response => {
                    if (response.data.themes !== null && response.data.themes.length > 0){
                        nextTheme = response.data.themes[0]
                    }
                });
            await Public.fetchNews()
                .then(response => newsFeed = response.data.posts);
            await Public.fetchSimplePosts()
                .then(response => posts = response.data.posts);
            await Public.fetchFrontPageCategories()
                .then(response => {
                    categories = response.data.categories;
                    nonUsedCategories = response.data.categories;
                });
            const category = randomChoice(nonUsedCategories);

            while (catLine === null && nonUsedCategories.length > 0){
                const index = nonUsedCategories.indexOf(category);
                if (index > -1) {
                    nonUsedCategories.splice(index, 1);
                }

                await Public.fetchCatPosts(4, category.id)
                    .then(response => {
                        if (response.data.posts.length > 0){
                            catLine = {
                                posts: response.data.posts,
                                category
                            }
                        }
                    });
            }

        }catch (e) {
            console.log("ERROR IN GETTING Initial data", e);
        }
        return {topPosts, lastTheme,nextTheme, newsFeed, posts, categories, nonUsedCategories, catLine};
    }

    constructor(props) {
        super(props);
        this.state = {
            existsPostIds: [
                ...props.posts.map(post => post.id),
                ...props.catLine.posts.map(post => post.id),
                ...props.topPosts.map(post => post.post.id)
            ],
            existsCategoryIds: props.nonUsedCategories,
            items: [],
            categories: [],
            offsets: {},
            prevBlocks: [],
            uid: 2
        }
        this.fetchMore = this.fetchMore.bind(this);
    }

    async fetchMore(){
        let items = [];
        let offsets = this.state.offsets;
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
                            await Public.fetchFrontPageCategories()
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

                        await Public.fetchCatPosts(4, category.id, this.state.existsPostIds, start)
                            .then(response => {
                                if (response.data.posts != null && response.data.posts.length > 0){
                                    catLine = response.data.posts;
                                    let nOffset = offsets[category.id] !== undefined ? offsets[category.id] + 4 : 4;

                                    offsets[category.id] = nOffset;
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
                            <Containers.Default>
                                <Box mx="auto" my="48px" height={["280px"]} width={["100%"]}>
                                    <Form.AdBlock id="R-A-351229-8" width="100%"
                                                  height="100%" infinity uid={this.state.uid}/>
                                </Box>
                            </Containers.Default>
                        )
                    }else{
                        items.push(
                            <Containers.Default>
                                <Box mx="auto" my="48px" height={["280px"]} width={["100%"]}>
                                    <Form.AdBlock id="R-A-351229-7" width="100%"
                                                  height="100%" infinity uid={this.state.uid}/>
                                </Box>
                            </Containers.Default>
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

        return (
            <>
                <NextSeo title={SITE_INFO.TITLE}
                         description={SITE_INFO.DESCRIPTION}
                         canonical={SITE_URL}
                         additionalMetaTags={[
                             {
                                 name: 'yandex-verification',
                                 content: YANDEX_VERIFICATION
                             }
                         ]}
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
                <TopPosts posts={topPosts}/>
                {
                    width > 1023
                        ? <NewsPostsComps compilation={lastTheme} news={newsFeed} posts={posts}/>
                        : <Containers.Offscreen>
                            <NewsPostsComps compilation={lastTheme} news={newsFeed} posts={posts}/>
                          </Containers.Offscreen>
                }

                <Containers.Offscreen>
                    <CategoryLine posts={catLine.posts} category={catLine.category}/>
                    <CompsBannerAd theme={nextTheme} bannerContent={{
                        text: "Стань членом клуба 'ИЛИ ПРЕМИУМ' и получай подарки за чтение новостей",
                        buttonText: "Присоеденится",
                        buttonLink: "/test"
                    }} bannerAdId="R-A-351229-6" mobileBannerAdId="R-A-351229-7"/>
                    <InfiniteScroll
                        dataLength={this.state.items.length} next={this.fetchMore}
                        hasMore={true} loader={<Form.Loader/>}>
                        {this.state.items}
                    </InfiniteScroll>
                </Containers.Offscreen>
            </>
        );
    }
}


function mapStateToProps(state){
    return {
        width: state.common.pageSize.width
    }
}

export default connect(mapStateToProps)(FrontPage);