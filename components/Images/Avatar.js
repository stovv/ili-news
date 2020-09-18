import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Lazy from "./Lazy.react";


const Avatar = styled.div`
    width: 144px;
    height: 144px;
    border-radius: 50%;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);    
    ${ ({withLoading, error, errorSrc, loading, loadingSrc, actualSrc, url}) => withLoading
        ? `background: url(${error ? errorSrc : (loading ? loadingSrc : actualSrc)}) center no-repeat;`
        : `background: url(${url}) center no-repeat;`
    };
    border: solid 4px ${props=>props.theme.colors.backgroundPrimary};
    background-size: cover;

    @media screen and (min-width: 1024px){
        width: 144px;
        height: 144px;
    }
    
    @media screen and (max-width: 768px){
        width: 120px;
        height: 120px;
    }
    
    @media screen and (max-width: 425px){
        width: 80px;
        height: 80px;
    }
    
    @media screen and (max-width: 375px){
        width: 40px;
        height: 40px;
    }
`;

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