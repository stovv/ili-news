import React from "react";
import { NextSeo } from "next-seo";

import {BACKEND_URL, SITE_URL} from "../../constants";

const Seo = ({post}) => {

    return (
        <NextSeo title={post.title}
                 description={post.description}
                 canonical={`${SITE_URL}/${post.slug}`}
                 openGraph={{
                     url: `${SITE_URL}/${post.slug}`,
                     locale: 'ru_RU',
                     type: "article",
                     title: post.title,
                     description: post.description,
                     images: [
                         {
                             url: `${BACKEND_URL}${post.cover.url}`,
                             width: post.cover.width,
                             height: post.cover.height,
                         }
                     ],
                     site_name: 'Молодежный журнал ИЛИ',
                     article: {
                         section: post.rubric.slug,
                         publishedTime: post.publish_at,
                         modifiedTime: post.updated_at,
                         authors: post.authors.map(item=>`${SITE_URL}/user/${item.id}`),
                         // TODO Add meta tags
                         tags: []
                     }
                 }}
                 twitter={{
                     handle: '@handle',
                     site: '@site',
                     cardType: 'summary_large_image',
                 }}
                 additionalMetaTags={[{
                     property: 'vk:image',
                     content: `${BACKEND_URL}${post.cover.url}`
                 }]}
        />
    );
};

export default Seo;