import React from 'react';
import dynamic from "next/dynamic";

import Error from './error__';
import { Public } from '../api';
import { OLD_SITE_URL } from '../constants';

const Seo = dynamic(import("../components/Seo/Post"));
const Infinity = dynamic(import("../compilations/Post/Infinity"));
const Regular = dynamic(import("../compilations/Post/Regular"));

class Post extends React.Component{
    render(){
        const { error, current_post, popularPosts, readMoreLinks } = this.props;

        if (error !== null){
            return <Error statusCode={error}/>;
        }

        // TODO AMP Checking
        // TODO Use this.props.user for head component

        try {
            return (
                <>
                    <Seo post={current_post}/>
                    {
                        current_post.rubric && current_post.rubric.infinityScroll
                            ? <Infinity post={current_post} popularPosts={popularPosts}/>
                            : <Regular post={current_post} popularPosts={popularPosts} readMore={readMoreLinks}/>
                    }
                </>
            );
        }catch (e) {
            console.log("Something is wrong with the display of the post ->", e)
            return <Error statusCode={404}/>
        }

    }
}

Post.getInitialProps = async ({ query: { postSlug, amp }, store, isServer, pathname, req, res }) => {
    let current_post = null;
    let readMoreLinks = [];
    let popularPosts = [];


    //TODO: Add some logged client Id
    await Public.getPost(postSlug)
        .then(response=>{
            if (response.data.length > 0){
                current_post = response.data[0];
            }
        }).catch(reason => {
            console.log(reason)
        });

    if ( current_post === null ){
        if (req) {
            res.writeHead(302, { Location: `${OLD_SITE_URL}/${postSlug}` });
            res.end();
        }
        return {
            error: 404
        }
    }
    const moment = (await import('moment')).default()
    moment.locale("ru");
    let publish_date = moment(current_post.publish_at);
    current_post.publish_at = publish_date.format("DD MMMM YYYY");

    let clientIp = null
    if (req != null ){
        clientIp = (req.headers['x-forwarded-for'] || '').split(',').pop() ||
            req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
        await Public.viewPost(current_post.rating.id, clientIp)
            //.then(response=> console.log("View ", clientIp, response.data.views))
            .catch(reason => console.log("View", reason));
    }
    await Public.getReadMore(current_post.rubric.id, current_post.id)
        .then(response=>{
            if ( response.data.posts !== null && response.data.posts.length > 0 ){
                readMoreLinks = response.data.posts;
            }
        })
        .catch(reason => {
            console.log(reason);
        })

    await Public.getPopularDuringWeek()
        .then(response=> {
            if ( response.data !== null && response.data.length > 0 ){
                popularPosts = response.data;
            }
        })
        .catch(reason=> {
            console.log(reason)
        });

    if ( current_post.eventDate != null ) {
        const eventDate = moment(current_post.eventDate);
        current_post.eventDate = {
            day: eventDate.format("DD"),
            mouth: eventDate.format("MMM"),
            full: eventDate.format("DD MMMM YYYY")
        }
    }


    return {
        error: current_post !== null ? null : 404,
        current_post,
        readMoreLinks,
        popularPosts,
        clientIp,
        postId: current_post.id,
        store,
        amp
    }
}


export default Post;