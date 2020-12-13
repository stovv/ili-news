import { Fragment } from 'react';
import { array, oneOf } from 'prop-types';
import dynamic from "next/dynamic";

import styles from './styles/PostsLine.module.css'
const AdBanner = dynamic(() => import("./Ad"));
const PostCard = dynamic(() => import("../components/Cards/Post"));

export default function PostsLine({posts = [{}, {}, {}, {}], type = "simple"}){
    if (typeof type === 'function'){
        type = type();
    }
    switch (type) {
        case "rightAd":{
            switch (posts.length){
                case 1:{
                    return(
                        <div className={styles.postsLine}>
                            <PostCard post={posts[0]} style={{margin: "0 auto"}}/>
                            <AdBanner maxWidth={`calc( ( 25% - 2px ) * 3`} horizontal/>
                        </div>
                    );
                }
                default:{
                    return (
                        <div className={styles.sixPosts}>
                            <div style={{
                                width: `calc( ( 25% - 2px ) * ${posts.slice(0, 3).length}`
                            }}>
                                <div className={styles.postsLine}>
                                    {
                                        posts.slice(0, 3).map((post, index) =>
                                            <Fragment key={index}>
                                                <PostCard post={post} style={{margin: "0 auto"}}/>
                                            </Fragment>
                                        )
                                    }
                                </div>
                                <div className={styles.postsLine}>
                                    {
                                        posts.slice(3).map((post, index) =>
                                            <Fragment key={index}>
                                                <PostCard post={post} style={{margin: "0 auto"}}/>
                                            </Fragment>
                                        )
                                    }
                                </div>
                            </div>
                            <AdBanner vertical/>
                        </div>
                    );
                }
            }
        }

        case "leftAd":{
            switch (posts.length){
                case 1:{
                    return(
                        <div className={styles.postsLine}>
                            <AdBanner maxWidth={`calc( ( 25% - 2px ) * 3`} horizontal/>
                            <PostCard post={posts[0]} style={{margin: "0 auto"}}/>
                        </div>
                    );
                }
                default:{
                    return (
                        <div className={styles.sixPosts}>
                            <AdBanner vertical/>
                            <div style={{
                                width: `calc( ( 25% - 2px ) * ${posts.slice(0, 3).length}`
                            }}>
                                <div className={styles.postsLine}>
                                    {
                                        posts.slice(0, 3).map((post, index) =>
                                            <Fragment key={index}>
                                                <PostCard post={post} style={{margin: "0 auto"}}/>
                                            </Fragment>
                                        )
                                    }
                                </div>
                                <div className={styles.postsLineMin}>
                                    {
                                        posts.slice(3).map((post, index) =>
                                            <Fragment key={index}>
                                                <PostCard post={post} style={{margin: "0 auto"}}/>
                                            </Fragment>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    );
                }
            }
        }

        default:{
            const postsCards = posts.map((post, index) =>
                <Fragment key={index}>
                    <PostCard post={post} style={{margin: "0 auto"}}/>
                </Fragment>
            );
            return (
                <div className={styles.postsLine}>
                    {
                        posts.length < 4
                            ? <div className={styles.postsLineMin} style={{
                                width: `calc( (25% - ${posts.length === 3 ? '2px' : '6px'} ) * ${posts.length})`
                            }}>
                                {postsCards}
                              </div>
                            : postsCards
                    }
                </div>
            );
        }
    }
}

PostsLine.propTypes = {
    posts: array,
    type: oneOf(["rightAd", "leftAd"]),
};