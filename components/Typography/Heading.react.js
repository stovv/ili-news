import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const H1 = styled.h1`
    font-family: ${props=>props.theme.fontFamily};
    color: ${props=>props.color ? props.color : props.theme.text.primary};
    max-width: ${props=> props.maxWidth && props.maxWidth};
    max-height: ${props=> props.maxHeight && props.maxHeight};
    margin: ${props=>props.margin};
    text-transform: ${props=>props.textTransform};
    text-align: ${props=>props.textAlign};
    overflow-wrap: ${props=> props.breakWord ? 'break-word' : 'unset'};
    font-size: 48px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.12;
    letter-spacing: normal;
    ${({hover, theme}) => hover && `
       transition: all 0.4s ease 0s;
       &:hover{
           color: ${theme.text.hover};
       }
    `}
`;

const H2 = styled.h2`
    font-family: ${props=>props.theme.fontFamily};
    color: ${props=>props.color ? props.color : props.theme.text.primary};
    max-width: ${props=> props.maxWidth && props.maxWidth};
    max-height: ${props=> props.maxHeight && props.maxHeight};
    margin: ${props=>props.margin};
    text-transform: ${props=>props.textTransform};
    text-align: ${props=>props.textAlign};
    overflow-wrap: ${props=> props.breakWord ? 'break-word' : 'unset'};
    font-size: 40px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    ${({hover, theme}) => hover && `
       transition: all 0.4s ease 0s;
       &:hover{
           color: ${theme.text.hover};
       }
    `}
`;

const H3 = styled.h3`
    font-family: ${props=>props.theme.fontFamily};
    color: ${props=>props.color ? props.color : props.theme.text.primary};
    max-width: ${props=> props.maxWidth && props.maxWidth};
    max-height: ${props=> props.maxHeight && props.maxHeight};
    margin: ${props=>props.margin};
    text-transform: ${props=>props.textTransform};
    text-align: ${props=>props.textAlign};
    overflow-wrap: ${props=> props.breakWord ? 'break-word' : 'unset'};
    font-size: 28px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.27;
    letter-spacing: normal;
    ${({hover, theme}) => hover && `
       transition: all 0.4s ease 0s;
       &:hover{
           color: ${theme.text.hover};
       }
    `}
`;

const H4 = styled.h4`
    font-family: ${props=>props.theme.fontFamily};
    color: ${props=>props.color ? props.color : props.theme.text.primary};
    max-width: ${props=> props.maxWidth && props.maxWidth};
    max-height: ${props=> props.maxHeight && props.maxHeight};
    margin: ${props=>props.margin};
    text-transform: ${props=>props.textTransform};
    text-align: ${props=>props.textAlign};
    overflow-wrap: ${props=> props.breakWord ? 'break-word' : 'unset'};
    font-size: 20px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    ${({hover, theme}) => hover && `
       transition: all 0.4s ease 0s;
       &:hover{
           color: ${theme.text.hover};
       }
    `}
`;

const H5 = styled.h5`
    font-family: ${props=>props.theme.fontFamily};
    color: ${props=>props.color ? props.color : props.theme.text.primary};
    max-width: ${props=> props.maxWidth && props.maxWidth};
    max-height: ${props=> props.maxHeight && props.maxHeight};
    margin: ${props=>props.margin};
    text-transform: ${props=>props.textTransform};
    text-align: ${props=>props.textAlign};
    overflow-wrap: ${props=> props.breakWord ? 'break-word' : 'unset'};
    font-size: 20px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    ${({hover, theme}) => hover && `
       transition: all 0.4s ease 0s;
       &:hover{
           color: ${theme.text.hover};
       }
    `}
`;

const H6 = styled.h6`
    font-family: ${props=>props.theme.fontFamily};
    color: ${props=>props.color ? props.color : props.theme.text.primary};
    max-width: ${props=> props.maxWidth && props.maxWidth};
    max-height: ${props=> props.maxHeight && props.maxHeight};
    margin: ${props=>props.margin};
    text-transform: ${props=>props.textTransform};
    text-align: ${props=>props.textAlign};
    overflow-wrap: ${props=> props.breakWord ? 'break-word' : 'unset'};
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    ${({hover, theme}) => hover && `
       transition: all 0.4s ease 0s;
       &:hover{
           color: ${theme.text.hover};
       }
    `}
`;


const headings = {
    1: H1,
    2: H2,
    3: H3,
    4: H4,
    5: H5,
    6: H6,
    7: H6
};

class Heading extends React.Component{
    render(){
        var {level, children, data, ...props} = this.props;

        if (typeof data !== 'undefined'){
            const HeadingComp = headings[data.level + 1];
            return(
                <HeadingComp><div dangerouslySetInnerHTML={{__html: data.text}}/></HeadingComp>
            );
        }

        const headingsKeys = Object.keys(headings);
        if (level > headingsKeys.length || level == null){
            level = headingsKeys[headingsKeys.length];
        }
        const HeadingComponent = headings[level];
        return (
            <HeadingComponent {...props}>{children}</HeadingComponent>
        )
    }

}

Heading.propTypes = {
    level: PropTypes.number.isRequired,
    color: PropTypes.string,
    margin: PropTypes.string,
    textTransform: PropTypes.string,
    textAlign: PropTypes.string,
    data: PropTypes.object,
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