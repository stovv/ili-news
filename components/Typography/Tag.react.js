import React from 'react';
import PropTypes from "prop-types";
import styles from './styles/tag.module.css';


class TagLabel extends React.Component {

    render(){
        const { type, children, ...props} = this.props;
        let tagClass = typeof styles[type] === "undefined" ? styles.large : styles[type];
        return (
            <p className={tagClass} style={{...props}}>{children}</p>
        )
    }
}

TagLabel.propTypes = {
    type: PropTypes.oneOf([
        "large", "normal", "small"
    ]).isRequired,
    color: PropTypes.string,
    margin: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    textTransform: PropTypes.string,
    textAlign: PropTypes.string,
    weight: PropTypes.string,
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

export default TagLabel;