// Import built-in types for API routes
import { Public } from '../api';
import {SITE_URL, SITE_INFO, BACKEND_URL} from '../constants';
import { TurboPostBlocks } from "../components/UniversalBlock";
import React from "react";

let turboRSS = require('turbo-rss');
let feed = new turboRSS({
    title: SITE_INFO.TITLE,
    description: SITE_INFO.DESCRIPTION,
    link: SITE_URL,
});

const Turbo = async (req, res) => {
    res.setHeader('content-type', 'application/xml');

    let menus = [];
    await Public.getMenu('header')
        .then(response => menus = response.data.menus[0].item.map((item, index)=>{
            if (item.category != null) {
                return {
                    link: `${SITE_URL}/category/${item.category.slug}`,
                    text: item.category.title
                }
            }else if (item.rubric != null) {
                return {
                    link: `${SITE_URL}/rubric/${item.rubric.slug}`,
                    text: item.rubric.title
                }
            }else if (item.post != null) {
                return {
                    link: `/post/${item.post.id}`,
                    text: item.post.title
                }
            }
        }))
        .catch(reason => console.log("TURBO MENU NOT LOADED", reason));


    try{
        let postsNotNull = true;
        let start = 0;
        let limit = 40;
        while(postsNotNull){
            console.log("Start ", start, limit);
            await Public.loadPosts(null, null, start, limit, null)
                .then(async response=>{
                    let posts = response.data.posts;
                    if ( posts.length === 0 ){
                        postsNotNull = false;
                    }
                    await posts.map(async post => {
                        let readMore = [];
                        await Public.getReadMore(post.rubric.id, post.id)
                            .then(response=>{
                                if ( response.data.posts !== null && response.data.posts.length > 0 ){
                                    readMore = response.data.posts;
                                }
                            })
                            .catch(reason => {});

                        const { title, slug, authors, cover, publish_at, blocks: { blocks } } = post;
                        const pdate = new Date(Date.parse(publish_at));

                        feed.item({
                            title:  title,
                            image_url: `${BACKEND_URL}${cover.url}`,
                            url: `${SITE_URL}/${slug}`,
                            author: authors.map(author=> `${author.name} ${author.secondName}`).join(', '),
                            date: pdate.toUTCString(),
                            content: TurboPostBlocks(blocks),
                            menu: menus,
                            related: readMore.map(post=>({
                                link: `${SITE_URL}/${post.slug}`,
                                text: post.title,
                                image_url: `${BACKEND_URL}${post.cover.url}`
                            }))
                        });
                    });
                })
                .catch(reason=>{
                    postsNotNull = false;
                });
            start += limit;
        }
        res.send(s);
    }catch (e) {
        res.statusCode = 521;
        console.log('Something wrong with generating Turbo RSS -> ', e);
        res.end();
    }
};

export default Turbo;