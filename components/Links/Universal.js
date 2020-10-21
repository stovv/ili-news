import React from 'react';
import Link from 'next/link';

import PostLink from "./Post";
import SocialLink from "./Social";
import RubricLink from './Rubric';
import CategoryLink from './Category';


export default function UniversalLink ({ item, Component = React.Fragment, route, componentParams, ...props }){
    if (item.category != null) {
        return <CategoryLink categorySlug={item.category.slug} {...props}>
            <Component active={route === `/category/${item.category.slug}`} {...componentParams}>
                {item.category.title}
            </Component>
        </CategoryLink>;
    }else if (item.rubric != null) {
        return <RubricLink rubricSlug={item.rubric.slug} {...props}>
            <Component active={route === `/rubric/${item.rubric.slug}`} {...componentParams}>
                {item.rubric.title}
            </Component>
        </RubricLink>;
    }else if (item.post != null){
        return <PostLink postId={item.post.id} {...props}>
            <Component active={route === `/post/${item.post.id}`} {...componentParams}>
                {item.post.title}
            </Component>
        </PostLink>
    } else if ( item.socialUrl != null && item.icon != null){
        return <SocialLink item={item} {...props}/>
    } else if (item.url != null){
        return <Link href={`/${item.url.link}`} passHref scroll={true} {...props}>
            <Component active={route === `/${item.url.link}`} {...componentParams}>
                {item.url.title}
            </Component>
        </Link>
    }
    return null
}