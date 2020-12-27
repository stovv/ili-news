import dayjs from "dayjs";
import { Fragment } from 'react';
import dynamic from "next/dynamic";
import { array, oneOf } from 'prop-types';

import styles from './styles/NewsDate.module.css'
import { randomChoice } from "../tools";
const Skeleton = dynamic(() => import("react-loading-skeleton"));
const PostLink = dynamic(() => import("../components/Links/Post"));



export default function NewsDate({posts = [{}, {}, {}, {}]}, isFirst = false){
    let latest_date = posts[0] === undefined || posts[0].published_at === undefined
        ? dayjs()
        : dayjs(posts[0].published_at);
    return (
        <>
            {
                posts.map(news => {
                    const news_date = dayjs(news.published_at);
                    const isOtherDate = (latest_date.day() !== news_date.day() ||
                        latest_date.month() !== news_date.month() ||
                        latest_date.year() !== news_date.year()) || isFirst;
                    isFirst = false;
                    latest_date = news_date;
                    return (
                        <>
                            {
                                isOtherDate &&
                                 <p className={styles.newsDate}>
                                    {
                                        news.published_at === undefined
                                            ? <Skeleton width={"9rem"}/>
                                            : dayjs(news.published_at).format("D MMMM")
                                    }
                                </p>
                            }
                            <div className={styles.newsLine}>
                                <p className={styles.newsTime}>
                                    {
                                        news.published_at === undefined
                                            ? <Skeleton width={"5rem"}/>
                                            : dayjs(news.published_at).format("HH:mm")
                                    }
                                </p>
                                <PostLink className={styles.newTitle} postSlug={news.slug} covered>
                                    {
                                        news.title === undefined
                                            ? <Skeleton width={randomChoice(["45rem", "41rem","42rem", "40rem","35rem", "30rem"])}/>
                                            : news.title
                                    }
                                </PostLink>
                            </div>
                        </>
                    );
                })
            }
        </>
    );
}

NewsDate.propTypes = {
    posts: array
};