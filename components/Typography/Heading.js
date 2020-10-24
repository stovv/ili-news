import React from 'react';
import styles from './styles/heading.module.css';


const headings = {
    1: styles.one,
    2: styles.two,
    3: styles.three,
    4: styles.four,
    5: styles.five,
    6: styles.six,
    7: styles.six
};

export default function Heading({level = 1, children, hover, margin = 0, textAlign = "left", color,
                                    maxWidth, maxHeight, textTransform, breakWord,
                                    width = "auto", height = "auto", userSelect, ...props}){

    const headingsKeys = Object.keys(headings);
    if (level > headingsKeys.length || level == null){
        level = headingsKeys[headingsKeys.length];
    }
    const headingClass = headings[level];
    const HeadingTag = `h${level}`;
    return (
        <HeadingTag className={hover ? `${headingClass} ${styles.hoverable}` : headingClass} style={{
            color, textAlign, margin, width, height, textTransform, maxHeight, maxWidth, userSelect,
            overflowWrap: breakWord ? 'break-word' : undefined
        }}>
            {children}
        </HeadingTag>
    )
}