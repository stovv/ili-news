import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TrackVisibility from "react-on-screen";


const Common = styled.div`
    max-width: 1440px;
    margin: ${props=> props.mt ? props.mt : "0"} auto ${props=> props.mb ? props.mb : "0"} auto;
`

const Def = styled.div`
  margin: 0 80px;
  
  @media screen and  (max-width: 1405px) {
      margin: 0 10px;
  }
`;

const Min = styled.div`
  margin: 0 ${props => props.theme.spacing.m};
`;

export const Default = ({children, mt, mb})=>
<Common mt={mt} mb={mb}>
    <Def>
        {children}
    </Def>
</Common>

export const Mini = ({children, mt, mb})=>
    <Common mt={mt} mb={mb}>
        <Min>
            {children}
        </Min>
    </Common>

export const Offscreen = ({children}) => {
    return (
        <TrackVisibility partialVisibility once>
            {({ isVisible }) => isVisible && children}
        </TrackVisibility>
    );
}

export const LeftSidePost = styled.div`
    width: 100%;
    position: relative;
    @media screen and (min-width: 1024px){
        width: 75%;
        padding-right: 5%;
    }
`;

export const RightSidePost = styled.div`
    display: none;
    @media screen and (min-width: 1024px){
        width: 25%;
        display: block;
        position: relative;
    }
`;

export const PostMarginContainer = styled.div`
    display: flex;
    
    @media screen and (min-width: 1024px){
        margin-top: 54px;
    }
    
    @media screen and (max-width: 1023px){
        margin-top: 24px;
    }
`;

Default.propTypes = {
    mt: PropTypes.string,
    mb: PropTypes.string
}

Mini.propTypes = {
    mt: PropTypes.string,
    mb: PropTypes.string
}

export const AppContainer = styled.div`
    background-color: ${props=> props.theme.colors.backgroundPrimary};
`;