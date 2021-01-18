import dynamic from "next/dynamic";
//import { NextSeo, SocialProfileJsonLd } from "next-seo";

import wrapper from "../store";
import { randomChoice } from "../tools";
import { CategoryPosts, Ad, KudaGo } from "../infinityBlocks";
import { changeInfinityState } from "../actions/common";

const Seo = dynamic(() => import("../components/Seo/Index"));
const TopPosts = dynamic(() => import("../compilations/TopPosts"));
const CategoryLine = dynamic(() => import("../compilations/CategoryLine"));
const OffScreen = dynamic(() => import("../components/Containers/OffScreen"));
const NewsPostsComps = dynamic(() => import("../compilations/NewsPostsComps"));
const CompsBannerAd = dynamic(() => import("../compilations/CompsBannerAd"));
const InfinityPosts = dynamic(() => import("../compilations/InfinityPosts"));

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  let topPosts = [];
  let ignoreRubrics = [];
  let ignoreCategories = [];
  let catLine = { posts: [], category: null };
  let lastTheme = { title: null, posts: [] };
  let nextTheme = { title: null, posts: [] };

  const {
    fetchFrontPageCategories,
    fetchSimplePosts,
    fetchCatPosts,
    fetchIndexPage,
    fetchNews,
    fetchTheme,
    fetchPostsCount,
    countPostsByCategory,
  } = require("../api/methods/public");

  const {
    setAvailableCategories,
    setCategoryOffset,
    setExistsPosts,
    setPrevCategories,
  } = require("../actions/common");

  await fetchIndexPage()
    .then(async (response) => {
      if (!response.data.topPosts || response.data.topPosts.length === 0) {
        topPosts = await fetchSimplePosts([], [2], [], 3)
          .then((response) => response.data.posts)
          .catch((reason) => {
            console.log("Something wrong with getting topPosts -> ", reason);
            return [];
          });
      } else {
        topPosts = response.data.topPosts;
      }

      if (response.data.themes && response.data.themes.length > 1) {
        lastTheme = await fetchTheme(response.data.themes[0].id)
          .then((resp) => ({
            ...resp.data.theme,
            posts: resp.data.theme.posts,
          }))
          .catch((reason) => {
            console.log("Something wrong with getting lastTheme -> ", reason);
            return { title: null, posts: [] };
          });
        nextTheme = await fetchTheme(response.data.themes[1].id)
          .then((resp) => ({
            ...resp.data.theme,
            posts: resp.data.theme.posts,
          }))
          .catch((reason) => {
            console.log("Something wrong with getting nextTheme -> ", reason);
            return { title: null, posts: [] };
          });
      }
      if (response.data.ignoreRubrics) {
        ignoreRubrics = response.data.ignoreRubrics.map((rubric) => rubric.id);
      }
      if (response.data.ignoreCategories) {
        ignoreCategories = response.data.ignoreCategories.map(
          (category) => category.id
        );
      }
    })
    .catch((reason) => {
      console.log(
        "Something wrong with getting index-page -> ",
        reason.response
      );
    });

  const postsCount = await fetchPostsCount(ignoreRubrics, ignoreCategories)
    .then((response) => response.data)
    .catch((reason) => {
      console.log(
        "Something wrong with getting index-page -> ",
        reason.response
      );
      return 0;
    });

  const newsFeed = await fetchNews()
    .then((response) => response.data.posts)
    .catch((reason) => {
      console.log("Something wrong with getting newsFeed -> ", reason.response);
      return [];
    });

  let categories = await Promise.all(
    await fetchFrontPageCategories(ignoreRubrics, ignoreCategories)
      .then((response) =>
        response.data.categories.map(async (category) => ({
          ...category,
          postCount: await countPostsByCategory(category.id).then(
            (response) => response.data
          ),
        }))
      )
      .catch((reason) => {
        console.log(
          "Something wrong with getting categories -> ",
          reason.response
        );
        return [[], []];
      })
  );
  categories = categories.filter((category) => category.postCount > 0);
  await store.dispatch(setAvailableCategories(categories));

  const category = randomChoice(categories);
  catLine = {
    category,
    posts: await fetchCatPosts(4, category.id, [
      ...topPosts.map((post) => post.id),
      ...lastTheme.posts.map((post) => post.id),
      ...nextTheme.posts.map((post) => post.id),
    ])
      .then((response) => {
        store.dispatch(setPrevCategories([category.id]));
        store.dispatch(setCategoryOffset(category.id, 4));

        return response.data.posts;
      })
      .catch((reason) => {
        console.log(
          "Something wrong with getting categories and categoryLine -> ",
          reason.response
        );
        return [[], []];
      }),
  };

  const posts = await fetchSimplePosts([
    ...catLine.posts.map((post) => post.id),
    ...topPosts.map((post) => post.id),
    ...lastTheme.posts.map((post) => post.id),
    ...nextTheme.posts.map((post) => post.id),
  ])
    .then((response) => response.data.posts)
    .catch((reason) => {
      console.log(
        "Something wrong with getting categories and categoryLine -> ",
        reason.response
      );
      return [];
    });

  await store.dispatch(
    setExistsPosts([
      ...posts.map((post) => post.id),
      ...catLine.posts.map((post) => post.id),
      ...topPosts.map((post) => post.id),
      ...lastTheme.posts.map((post) => post.id),
      ...nextTheme.posts.map((post) => post.id),
    ])
  );

  return {
    revalidate: 3600,
    props: {
      topPosts,
      lastTheme,
      nextTheme,
      newsFeed,
      posts,
      postsCount,
      catLine,
    },
  };
});

const InfinityComponents = {
  ...CategoryPosts("category", 3),
  ...Ad("ad"),
  ...KudaGo("kuda-go-weekend", 1, 1),
};

export default function FrontPage({
  topPosts,
  lastTheme,
  nextTheme,
  newsFeed,
  posts,
  postsCount,
  catLine,
}) {
  return (
    <>
      <Seo />
      <section>
        <TopPosts posts={topPosts} />
        <NewsPostsComps compilation={lastTheme} news={newsFeed} posts={posts} />
        <OffScreen>
          <CategoryLine {...catLine} />
          <CompsBannerAd compilation={nextTheme} />
          <InfinityPosts blocks={InfinityComponents} />
        </OffScreen>
      </section>
    </>
  );
}
