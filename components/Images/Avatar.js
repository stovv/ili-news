import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/avatar.module.css';
import Lazy from "./Lazy.react";

const Avatar = ({children, withLoading, error, errorSrc, loading, loadingSrc, actualSrc, url}) => (
    <div className={styles.avatar} style={{
        background: withLoading
            ? `background: url(${error ? errorSrc : (loading ? loadingSrc : actualSrc)}) center no-repeat`
            : `url(${url}) center no-repeat`}}>
        {children}
    </div>
);

class AvatarImage extends React.Component{

    render(){
        const { image } = this.props;

        if ( typeof image === "string"){
            return <Avatar url={image}/>
        }

        return <Lazy cover={image} component={Avatar}/>;
    }
}

AvatarImage.propTypes = {
  image:  PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
  ])
};

export default AvatarImage;