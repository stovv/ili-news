import { Fragment } from 'react';
import dynamic from "next/dynamic";

import styles from './styles/CategoryLine.module.css'
import {shuffleChoice} from "../tools";
import {fetchCatPosts} from "../api/methods/public.react";
import {setAvailableCategories, setCategoryOffset, setPrevCategories} from "../actions/common";

const Skeleton = dynamic(() => import("react-loading-skeleton"));
const PostCard = dynamic(() => import("../components/Cards/Post"));
const CardText = dynamic(() => import("../components/Typography/Card"));


export async function fetchMore({ availableCategories: categories, existsPostIds, prevCategoryIds, categoryOffsets, dispatch }){
    let catLine = {
        posts: []
    };

    while (catLine.posts.length === 0 && categories.length > 0) {
        const category = shuffleChoice(categories, prevCategoryIds, categories.length);
        if (categoryOffsets[category.id] !== undefined && category.postCount <= categoryOffsets[category.id]) {
            categories = categories.filter(cat => cat.id !== category.id);
            continue;
        }

        let start = categoryOffsets[category.id] !== undefined ? categoryOffsets[category.id] : 0;
        await fetchCatPosts(4, category.id, existsPostIds, start)
            .then(response => {
                if (response.data.posts != null && response.data.posts.length > 0) {
                    catLine = {
                        category,
                        posts: response.data.posts
                    };
                    dispatch(setCategoryOffset(category.id, start + response.data.posts.length));
                    dispatch(setPrevCategories(category.id));
                }else{
                    categories = categories.filter(cat => cat.id !== category.id);
                }
            })
            .catch(reason => console.log("Something wrong with getting category posts in infinity -> ", reason));
    }

    dispatch(setAvailableCategories(categories));
    if (catLine.posts.length === 0){
        return { error: true }
    }
    return catLine;
}

export default function CategoryLine({posts = [{}, {}, {}, {}], category}){
    return (
        <div className={styles.categoryRoot}>
            <CardText type={"large"} margin={"0 0 24px 0"}>
                {category ? category.title : <Skeleton width={"8em"}/> }
            </CardText>
            <div className={`${styles.postsLine}${posts.length < 4 ? ` ${styles.postsLineMin}` : ''}` }>
                {
                    posts.map((post, index) =>
                        <Fragment key={index}>
                            <PostCard post={post}/>
                        </Fragment>
                    )
                }
            </div>
        </div>
    );
}