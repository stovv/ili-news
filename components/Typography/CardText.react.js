import React from 'react';
import PropTypes from "prop-types";
import styles from './styles/cardText.module.css';


class CardText extends React.Component {
    render(){
        const { type, children, maxLines, wrap, maxHeight, hover, ...props} = this.props;

        const textStyle = typeof styles[type] !== "undefined" ? styles[type] : styles.normal;
        return (
            <p className={`${textStyle}${maxLines !== undefined ? ` ${styles.hiddenOverflow}` : '' }${wrap !== undefined ? ` ${styles.wrapped}` : ''}${hover ? ` ${styles.hoverable}` : ''}`}
               style={{
                   ...props,
                   "-webkit-line-clamp": maxLines !== undefined ? `${maxLines}` : "unset",
                   maxHeight: maxLines !== undefined ? `${maxLines}.8em` : maxHeight,
               }}>
                {children}
            </p>
        );
    }
}

CardText.propTypes = {
    type: PropTypes.oneOf([
        "xsmall", "small", "normal",
        "large", "xlarge", "xxlarge"
    ]).isRequired,
    hover: PropTypes.bool,
    color: PropTypes.string,
    weight: PropTypes.string,
    margin: PropTypes.string,
    position: PropTypes.string,
    right: PropTypes.string,
    left: PropTypes.string,
    top: PropTypes.string,
    bottom: PropTypes.string,
    textTransform: PropTypes.string,
    textAlign: PropTypes.string,
    maxLines: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    wrap: PropTypes.bool,
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    height: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    maxWidth: PropTypes.string,
    maxHeight: PropTypes.string,

}

export default CardText;