import React from "react";
import PropTypes from 'prop-types';
import { NextSeo } from "next-seo";

import { BACKEND_URL, SITE_URL, SITE_INFO } from "../../constants";


class PostSeo extends React.Component{

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false;
    }

    render(){
        const { post } = this.props;

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
                         site_name: SITE_INFO.TITLE,
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
    }
}

PostSeo.propTypes = {
    post: PropTypes.object.isRequired
}

export default PostSeo;