import PropTypes from 'prop-types';
import emojiParse from "react-easy-emoji";

const Emoji = ({emoji, size, style, ...props}) => {

    return emojiParse(emoji, {
        props: {
            style: {
                width: `${size}px`,
                height: "auto",
                margin: "auto 0",
                ...style
            },
            ...props
        }
    })
}

Emoji.propTypes = {
    size: PropTypes.oneOf([18, 24, 36, 72, 144]),
    style: PropTypes.object,
    props: PropTypes.object,
}

export default Emoji;