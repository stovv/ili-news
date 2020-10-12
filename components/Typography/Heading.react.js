import React from 'react';
import PropTypes from 'prop-types';
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

const defaultStyle = {
    margin: 0,
    textAlign: "left",
    breakWord: "unset",
    width: "auto",
    height: "auto"
}


class Heading extends React.Component{
    render(){
        let { level, children, hover, breakWord,...props } = this.props;

        const headingsKeys = Object.keys(headings);
        if (level > headingsKeys.length || level == null){
            level = headingsKeys[headingsKeys.length];
        }
        const headingClass = headings[level];
        const HeadingTag = `h${level}`;
        return (
            <HeadingTag className={hover ? `${headingClass} ${styles.hoverable}` : headingClass} style={{
                ...defaultStyle,
                ...props,
                overflowWrap: breakWord ? 'break-word' : undefined
            }}>
                {children}
            </HeadingTag>
        )
    }
}

Heading.propTypes = {
    level: PropTypes.number,
    color: PropTypes.string,
    margin: PropTypes.string,
    textTransform: PropTypes.string,
    textAlign: PropTypes.string,
    breakWord: PropTypes.bool,
    hover: PropTypes.bool,
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    height: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    maxWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    maxHeight: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
}

export default Heading;