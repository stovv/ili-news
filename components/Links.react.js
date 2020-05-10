import React from 'react';
import PropTypes from 'prop-types';
import Link from "next/link";
import Post from "../pages/post/[postId]";

const noDecoration = {
    textDecoration: 'none',
    decoration: 'none'
};


export const UniversalLink = ({ item, component, route }) => {
    const Component = component;
    if (item.category !== null) {
        return <CategoryLink categorySlug={item.category.slug}>
            <Component active={route === `/category/${item.category.slug}`}>
                {item.category.title}
            </Component>
        </CategoryLink>;
    }else if (item.rubric !== null) {
        return <RubricLink rubricSlug={item.rubric.slug}>
            <Component active={route === `/rubric/${item.rubric.slug}`}>
                {item.rubric.title}
            </Component>
        </RubricLink>;
    }else if (item.post !== null){
        return <PostLink postId={item.post.id}>
            <Component active={route === `/post/${item.post.id}`}>
                {item.post.title}
            </Component>
        </PostLink>
    }
}


export const PostLink = ({postId, children, ...props}) => (
    <Link href={"/post/[postId]"} as={`/post/${postId}`} passHref {...props}>
        <a style={noDecoration}>
            {children}
        </a>
    </Link>
);

export const RubricLink = ({ rubricSlug, children }) => (
    <Link href={"/rubric/[rubricSlug]"} as={`/rubric/${rubricSlug}`} passHref>
        <a style={noDecoration}>
            {children}
        </a>
    </Link>
);

export const CategoryLink = ({ categorySlug, children }) => (
    <Link href={"/category/[categorySlug]"} as={`/category/${categorySlug}`} passHref>
        {children}
    </Link>
);

CategoryLink.propTypes = {
    categorySlug: PropTypes.string.isRequired
}

RubricLink.propTypes = {
    rubricSlug: PropTypes.string.isRequired,
}

PostLink.propTypes = {
    postId: PropTypes.number.isRequired,
}