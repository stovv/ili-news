import dynamic from "next/dynamic";
import dayjs from "dayjs";
//import { NextSeo, SocialProfileJsonLd } from "next-seo";

import wrapper from "../store";
import { randomChoice } from '../tools';
import {
    fetchFrontPageCategories, fetchSimplePosts,
    fetchCatPosts, fetchIndexPage, loadEvents,
    fetchNews, fetchTheme, fetchPostsCount, countPostsByCategory, loadPosts
} from '../api/methods/public.react';
import { fetchMore as fetchMoreCatLines } from '../compilations/CategoryLine';
import { setAvailableCategories, setCategoryOffset, setExistsPosts, setPrevCategories } from "../actions/common";

const AdBanner = dynamic(() => import("../compilations/Ad"));
const KudaGo = dynamic(() => import("../components/Forms/KudaGo"));
const TopPosts = dynamic(() => import("../compilations/TopPosts"));
const CategoryLine = dynamic(() => import("../compilations/CategoryLine"));
const OffScreen = dynamic(() => import("../components/Containers/OffScreen"));
const NewsPostsComps = dynamic(() => import("../compilations/NewsPostsComps"));
const CompsBannerAd = dynamic(() => import("../compilations/CompsBannerAd"));
const InfinityPosts = dynamic(() => import("../compilations/InfinityPosts"));



export const getServerSideProps = wrapper.getServerSideProps(
    async ({store, ...props}) => {
        let topPosts = [];
        let catLine = { posts: [], category: null };
        let lastTheme= { title: null, posts: [] };
        let nextTheme = { title: null, posts: [] };

        await fetchIndexPage()
            .then(
                async response => {
                    if ( !response.data.topPosts || response.data.topPosts.length === 0 ){
                        topPosts = await fetchSimplePosts([], [2], [], 3)
                            .then(response => response.data.posts)
                            .catch(reason => {
                                console.log("Something wrong with getting topPosts -> ", reason)
                                return [];
                            });
                    }else{
                        topPosts = response.data.topPosts;
                    }

                    if ( response.data.themes && response.data.themes.length > 1 ){
                        lastTheme = await fetchTheme(response.data.themes[0].id)
                            .then(resp => ({
                                ...resp.data.theme,
                                posts: resp.data.theme.posts
                            }))
                            .catch(reason => {
                                console.log("Something wrong with getting lastTheme -> ", reason)
                                return { title: null, posts: [] };
                            });
                        nextTheme = await fetchTheme(response.data.themes[1].id)
                            .then(resp => ({
                                ...resp.data.theme,
                                posts: resp.data.theme.posts
                            }))
                            .catch(reason => {
                                console.log("Something wrong with getting nextTheme -> ", reason)
                                return { title: null, posts: [] };
                            });
                    }
                }
            )
            .catch(reason => {
                console.log("Something wrong with getting index-page -> ", reason.response);
            });

        const postsCount = await fetchPostsCount([2])
            .then(response => response.data)
            .catch(reason=> {
                console.log("Something wrong with getting index-page -> ", reason.response)
                return 0;
            });

        const newsFeed = await fetchNews()
            .then(response => response.data.posts)
            .catch(reason => {
                console.log("Something wrong with getting newsFeed -> ", reason.response);
                return [];
            });


        let categories = await Promise.all(await fetchFrontPageCategories()
            .then(response => response.data.categories.map(async (category) => ({
                    ...category,
                    postCount: await countPostsByCategory(category.id).then(response=>response.data)
                })
            ))
            .catch(reason => {
                console.log("Something wrong with getting categories -> ", reason.response);
                return [[], []];
            }));
        categories = categories.filter(category => category.postCount > 0)
        await store.dispatch(setAvailableCategories(categories));

        const category = randomChoice(categories);
        catLine = {
            category,
            posts: await fetchCatPosts(4, category.id, [
                ...topPosts.map(post => post.id),
                ...lastTheme.posts.map(post => post.id),
                ...nextTheme.posts.map(post => post.id)])
                .then(response => {
                    store.dispatch(setPrevCategories([category.id]));
                    store.dispatch(setCategoryOffset(category.id, 4));

                    return response.data.posts;
                })
                .catch(reason => {
                    console.log("Something wrong with getting categories and categoryLine -> ", reason.response);
                    return [[], []];
                })
        }

        const posts = await fetchSimplePosts([
            ...catLine.posts.map(post => post.id),
            ...topPosts.map(post => post.id),
            ...lastTheme.posts.map(post => post.id),
            ...nextTheme.posts.map(post => post.id)
        ])
            .then(response => response.data.posts)
            .catch(reason => {
                console.log("Something wrong with getting categories and categoryLine -> ", reason.response);
                return [];
            });

        await store.dispatch(setExistsPosts([
            ...posts.map(post => post.id),
            ...catLine.posts.map(post => post.id),
            ...topPosts.map(post => post.id),
            ...lastTheme.posts.map(post => post.id),
            ...nextTheme.posts.map(post => post.id)
        ]));

        return {
            props: { topPosts, lastTheme, nextTheme, newsFeed, posts, postsCount, catLine }
        };
    }
);


const InfinityComponents = [
    {
        id: "category",
        required: true,
        lambda: 2,
        fetchMore: fetchMoreCatLines,
        Component: (props) => <CategoryLine {...props}/>
    },
    {
        id: "ad",
        fetchMore: async ({}) => {
            //console.log("AD")
            return {}
        },
        Component: (props) => <div style={{width: "300px", height: "120px"}}><AdBanner/></div>
    },
    {
        id: "kuda-go-weekend",
        maxCount: 1,
        fetchMore: async (props) => {
            const posts = await loadEvents(null, null, null,
                dayjs().day(6).toISOString(), dayjs().day(7).toISOString(), 0, 20)
                .then(response => response.data.posts)
                .catch(reason => []);
            return {posts}
        },
        Component: ({posts}) => posts.length > 0 ? <KudaGo posts={posts} dateName={"выходных"}/> : null
    }
];


export function FrontPage({topPosts, lastTheme, nextTheme, newsFeed, posts, catLine}){
    return (
        <>
          <TopPosts posts={topPosts}/>
          <OffScreen>
              <NewsPostsComps compilation={lastTheme} news={newsFeed} posts={posts}/>
              <CategoryLine {...catLine}/>
              <CompsBannerAd compilation={nextTheme}/>
              <InfinityPosts components={InfinityComponents}/>
          </OffScreen>
        </>
    );
}

export default FrontPage;