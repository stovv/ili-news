import React from 'react';
import PropTypes from 'prop-types';
import Link from "next/link";

const noDecoration = {textDecoration: 'none'};

export const PostLink = ({postId, children}) => (
    <Link href={"/post/[postId]"} as={`/post/${postId}`} passHref>
        <a style={noDecoration}>
            {children}
        </a>
    </Link>
);

PostLink.propTypes = {
    postId: PropTypes.number.isRequired,
}