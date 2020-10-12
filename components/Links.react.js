import React from 'react';
import PropTypes from 'prop-types';
import Link from "next/link";
import {BACKEND_URL} from "../constants";

const noDecoration = {
    textDecoration: 'none',
    decoration: 'none',
};


export const UniversalLink = ({ item, component, route, componentParams, ...props }) => {
    const Component = component;
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
    } else if (item.url != null){
        return <Link  href={`/${item.url.link}`} scroll={true} prefetch={false} {...props}>
            <Component active={route === `/${item.url.link}`} {...componentParams}>
                {item.url.title}
            </Component>
        </Link>
    }
    return null
}


export const SocialLink = ({ item, component, route, ...props }) => {
    if (item.socialUrl != null && item.icon !== null){
        return <a href={item.socialUrl} {...props}>
            <img src={`${BACKEND_URL}${item.icon.url}`} alt={"social"} style={{
                width: "24px",
                height: "24px"
            }}/>
        </a>
    }
    return null
}


export const PostLink = ({postSlug, children,
                             prefetch = false, passHref = true, scroll = true, ...props}) => (
    <Link href={"/[postSlug]"} as={`/${postSlug}`}
          passHref={passHref} prefetch={prefetch} scroll={scroll}>
        <a style={noDecoration} {...props}>
            {children}
        </a>
    </Link>
);

export const RubricLink = ({ rubricSlug, children,
                               prefetch = false, passHref = true, scroll = true, ...props }) => (
    <Link href={"/rubric/[rubricSlug]"} as={`/rubric/${rubricSlug}`}
          passHref={passHref} prefetch={prefetch} scroll={scroll} >
        <a style={noDecoration} {...props}>
            {children}
        </a>
    </Link>
);

export const CategoryLink = ({ categorySlug, children,
                                 prefetch = false, passHref = true, scroll = true, ...props }) => (
    <div {...props}>
        <Link href={"/category/[categorySlug]"} as={`/category/${categorySlug}`}
              passHref={passHref} prefetch={prefetch} scroll={scroll} >
            {children}
        </Link>
    </div>
);

CategoryLink.propTypes = {
    categorySlug: PropTypes.string.isRequired
}

RubricLink.propTypes = {
    rubricSlug: PropTypes.string.isRequired,
}

PostLink.propTypes = {
    postSlug: PropTypes.string.isRequired,
}