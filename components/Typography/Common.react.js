import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const MegaText = styled.h1`
    max-width: ${props=> props.maxWidth && props.maxWidth};
    max-height: ${props=> props.maxHeight && props.maxHeight};
    margin: ${props=>props.margin};
    text-transform: ${props=>props.textTransform};
    text-align: ${props=>props.textAlign};
    overflow-wrap: ${props=> props.breakWord ? 'break-word' : 'unset'};
    font-family: ${props=>props.theme.fontFamily};
    font-size: 64px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.02;
    letter-spacing: normal;
    color: ${props=>props.color ? props.color : props.theme.text.primary};
`;

const RegularText = styled.h2`
    max-width: ${props=> props.maxWidth && props.maxWidth};
    max-height: ${props=> props.maxHeight && props.maxHeight};
    margin: ${props=>props.margin};
    text-transform: ${props=>props.textTransform};
    text-align: ${props=>props.textAlign};
    overflow-wrap: ${props=> props.breakWord ? 'break-word' : 'unset'};
    font-family: ${props=>props.theme.fontFamily};
    font-size: 28px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.02;
    letter-spacing: normal;
    color: ${props=>props.color ? props.color : props.theme.text.primary};

`;

const types = {
    mega: MegaText,
    regular: RegularText
};

class Common extends React.Component{
    render(){
        let {type, children, data, ...props} = this.props;

        const typesNames = Object.keys(types);
        if (!typesNames.includes(type)){
            return (<span>Такого шрифта "{type}" не существует. Common.react.js</span>)
        }
        const TypographyComponent = types[type];
        return (
            <TypographyComponent {...props}>{children}</TypographyComponent>
        )
    }

}

Common.propTypes = {
    type: PropTypes.string.isRequired,
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

export default Common;