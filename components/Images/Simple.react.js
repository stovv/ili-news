import React from "react";
import PropTypes from 'prop-types';
import styles from './styles/simple.module.css';



const Simple = ({children, withLoading, withParent, blur, bgSize,
                    url, error, errorSrc, loading, loadingSrc, hover,
                    actualSrc, maxWidth, maxHeight, height, width}) => (
    <div className={`${styles.simple}${blur ? ` ${styles.blurred}` : ''}`} style={{
        backgroundImage: withLoading
            ? `url(${error ? errorSrc : (loading ? loadingSrc : actualSrc)})`
            : `url(${url})`,
        cursor: hover ? "pointer" : "auto",
        position: withParent ? "absolute" : "relative",
        backgroundSize: bgSize !== undefined ? bgSize : 'cover',
        width, height, maxHeight, maxWidth
    }}>{children}</div>
);


const OverlayContainer = ({children, transform, hover, margin, overflow,
                              zIndex, float, maxWidth, maxHeight, height, width}) => (
    <div className={`${styles.overlayContainer}${hover ? ` ${styles.hoverable}` : ''}`} style={{
        margin, overflow, width, height,
        maxHeight, maxWidth, transform, zIndex, float,
    }}>{children}</div>
);

const ChildrenContainer = ({children, blackout}) => (
    <div className={styles.childrenContainer} style={{
        backgroundColor: blackout ? "rgba(0, 0, 0, 0.30)" : undefined
    }}>{children}</div>
);

class SimpleImage extends React.Component {

    render() {
        const {children, wrapper, wrapperParams, ...props} = this.props;

        if (children === undefined){
            if (wrapper !== undefined){
                let Wrapper = wrapper;
                return (
                    <Wrapper {...wrapperParams}>
                        <Simple {...props} />
                    </Wrapper>
                )
            }
            return(
                <Simple {...props} />
            );
        }
        else{
            if (wrapper !== undefined){
                let Wrapper = wrapper;
                return (
                    <OverlayContainer {...props}>
                        <Wrapper {...wrapperParams}>
                            <Simple {...props} withParent />
                            <ChildrenContainer {...props}>
                                {children}
                            </ChildrenContainer>
                        </Wrapper>
                    </OverlayContainer>
                )
            }
            return(
                <OverlayContainer {...props}>
                    <Simple {...props} withParent />
                    <ChildrenContainer {...props}>
                        {children}
                    </ChildrenContainer>
                </OverlayContainer>
            )
        }
    }
}

SimpleImage.propTypes = {
    blur: PropTypes.bool,
    hover: PropTypes.bool,
    withLoading: PropTypes.bool,
    url: PropTypes.string,
    transform: PropTypes.string,
    overflow: PropTypes.string,
    bgSize: PropTypes.string,
    blackout: PropTypes.bool,
    zIndex: PropTypes.number,
    float: PropTypes.string,
    margin: PropTypes.string,
    wrapper: PropTypes.node,
    width: PropTypes.string,
    height: PropTypes.string,
    maxWidth: PropTypes.string,
    maxHeight: PropTypes.string,
}

export default SimpleImage;
