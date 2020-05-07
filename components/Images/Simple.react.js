import React from "react";
import styled from 'styled-components';
import PropTypes from 'prop-types';

import blurImage from './blur.svg';
import {BACKEND_URL} from "../../constants";
import {Upper} from '../Animations';

const Simple = styled.div`
    position: ${props => props.withParent ? 'absolute' : 'relative'};
    ${ ({withLoading, error, errorSrc, loading, loadingSrc, actualSrc, url}) => withLoading 
        ? `background: url(${error ? errorSrc : (loading ? loadingSrc : actualSrc)}) center`
        : `
           background: url(${url}) center
        `
    };
    background-size: cover;
    cursor: ${props=> props.hover && 'pointer'};
    width: ${props=> props.width ? props.width : '100%'};
    height: ${props=> props.height ? props.height : '100%'};
    max-width: ${props=> props.maxWidth && props.maxWidth};
    max-height: ${props=> props.maxHeight && props.maxHeight};
    ${({blur}) => blur && `
       filter: blur(24px);
       background-color: rgba(0, 0, 0, 0.16);
       transform: scale(1.1);
    `}
    
`;


const OverlayContainer = styled.div`
  position: relative;
  overflow: ${props=> props.overflow ? props.overflow : 'hidden'};
  width: ${props=> props.width ? props.width : '100%'};
  height: ${props=> props.height ? props.height : '100%'};
  max-width: ${props=> props.maxWidth && props.maxWidth};
  max-height: ${props=> props.maxHeight && props.maxHeight};
  transform: ${props=>props.transform};
  z-index: ${props=> props.zIndex};
  float: ${props=>props.float};
  ${({transform, hover}) => hover && `
       cursor: pointer;
       transition: all .4s ease-in-out;
       &:hover{
           box-shadow: 0px 10px 100px -5px rgba(0, 0, 0, 0.7);
           transform: scale(1.00009) ${transform ? transform : ''};
       }
  `}
`;

const ChildrenContainer = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: ${props=>props.blackout && "rgba(0, 0, 0, 0.16)"};
    :first-child {
      box-shadow: 0px 5px 32px -5px rgba(0, 0, 0, 0.2);
    }
`;

class SimpleImage extends React.Component {

    render() {
        const {children, ...props} = this.props;

        if (children === undefined){
            return(
                <Simple {...props} />
            );
        }
        else{

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
    blackout: PropTypes.bool,
    zIndex: PropTypes.number,
    float: PropTypes.string,
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
    children: PropTypes.node,
}

export default SimpleImage;
