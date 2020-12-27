import dynamic from "next/dynamic";
import { fetchCategoryLine, fetchKudaGo, fetchNewsDate, fetchPostLine } from './fetches';

const AdBanner = dynamic(() => import("../compilations/Ad"));
const NewsDate = dynamic(() => import("../compilations/NewsDate"));
const CategoryLine = dynamic(() => import("../compilations/CategoryLine"));
const PostsLineComponent = dynamic(() => import("../compilations/PostsLine"));
const KudaGoComponent = dynamic(() => import("../components/Forms/KudaGo"));


const RootBlock = (block = {}, id, count = 1, maxCount = null) => {
    let data = {};
    for (let i = 0; i < count; i++) {
        let identifier = `${id}_${i}`;
        data[identifier] = block;

        if (maxCount != null) {
            const fetch = data[identifier].fetchMore;
            data[identifier] = {
                ...data[identifier],
                fetchMore: async ({blockCounter, ...props}) => {
                    if (maxCount != null && maxCount > 0 &&
                        blockCounter[identifier] !== undefined &&
                        blockCounter[identifier] >= maxCount){
                        return {error: true};
                    }
                    return await fetch(props);
                }
            }
        }
    }
    return data;
};

export const CategoryPosts = (id, count = 1, additionalProps = {}) => {
    return RootBlock({
        required: true,
        fetchMore: fetchCategoryLine,
        Component: (props) => <CategoryLine {...props}/>,
        ...additionalProps
    }, id, count);
};

export const Ad = (id, count = 1, maxCount = null, additionalProps = {}) => {
    return RootBlock({
        fetchMore: async (props) => {
            return {}
        },
        Component: (props) => <div style={{width: "300px", height: "120px"}}><AdBanner/></div>,
        ...additionalProps
    }, id, count, maxCount);
};

export const KudaGo = (id, count = 1, maxCount = 1, additionalProps = {}) => {
    return RootBlock({
        fetchMore: fetchKudaGo,
        Component: ({posts}) => <KudaGoComponent posts={posts} dateName={"выходных"}/>,
        ...additionalProps
    }, id, count, maxCount);
};

export const PostsLine = (id, count = 1, postsCount = 4,
                          type = "simple", additionalProps = {}) =>{
    return RootBlock({
        required: true,
        fetchMore: (props) => fetchPostLine({count: postsCount, ...props}),
        Component: (props) => <PostsLineComponent type={type} {...props}/>,
        ...additionalProps
    }, id, count);
};

export const DoublePostsLine = (id, count = 1, additionalProps = {}) =>{
    return RootBlock({
        required: true,
        fetchMore: (props) => fetchPostLine({count: 8, ...props}),
        Component: ({ posts = [] }) => <>
                <PostsLineComponent posts={posts.slice(0, 4)}/>
                <PostsLineComponent posts={posts.slice(4)}/>
        </>,
        ...additionalProps
    }, id, count);
};

export const DateNews = (id, count = 1, additionalProps = {}) =>{
  return RootBlock({
      required: true,
      fetchMore: fetchNewsDate,
      Component: (props) => <NewsDate {...props}/>,
      ...additionalProps
  }, id, count);
};