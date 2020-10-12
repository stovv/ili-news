import React from 'react';
import Mini from './Mini';
import Default from './Default';
import Offscreen from "./Offscreen";
import styles from './styles/containers.module.css';


const LeftSidePost = ({children, ...props}) => <div className={styles.leftSidePost} {...props}>{children}</div>;

const RightSidePost = ({children, ...props}) => <div className={styles.rightSidePost} {...props}>{children}</div>;

const PostMarginContainer = ({children, ...props}) => (
    <div className={styles.postMarginContainer} {...props}>{children}</div>
);

const JournalHeadingContainer = ({children, ...props}) => (
    <div className={styles.journalHeadingContainer} {...props}>{children}</div>
);


export {
    Mini,
    Default,
    Offscreen,
    LeftSidePost,
    RightSidePost,
    PostMarginContainer,
    JournalHeadingContainer
}
