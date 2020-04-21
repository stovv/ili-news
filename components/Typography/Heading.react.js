import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const H1 = styled.h1`
    font-family: ${props=>props.theme.fontFamily};
    color: ${props=>props.color ? props.color : props.theme.colors.black};
    max-width: ${props=> props.maxWidth && props.maxWidth};
    max-height: ${props=> props.maxHeight && props.maxHeight};
    margin: ${props=>props.margin};
    text-transform: ${props=>props.textTransform};
    text-align: ${props=>props.textAlign};
    font-size: 56px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.12;
    letter-spacing: normal;
`;

const H2 = styled.h2`
    font-family: ${props=>props.theme.fontFamily};
    color: ${props=>props.color ? props.color : props.theme.colors.black};
    max-width: ${props=> props.maxWidth && props.maxWidth};
    max-height: ${props=> props.maxHeight && props.maxHeight};
    margin: ${props=>props.margin};
    text-transform: ${props=>props.textTransform};
    text-align: ${props=>props.textAlign};
    font-size: 40px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.12;
    letter-spacing: normal;
`;

const H3 = styled.h3`
    font-family: ${props=>props.theme.fontFamily};
    color: ${props=>props.color ? props.color : props.theme.colors.black};
    max-width: ${props=> props.maxWidth && props.maxWidth};
    max-height: ${props=> props.maxHeight && props.maxHeight};
    margin: ${props=>props.margin};
    text-transform: ${props=>props.textTransform};
    text-align: ${props=>props.textAlign};
    font-size: 30px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.12;
    letter-spacing: normal;
`;

const H4 = styled.h4`
    font-family: ${props=>props.theme.fontFamily};
    color: ${props=>props.color ? props.color : props.theme.colors.black};
    max-width: ${props=> props.maxWidth && props.maxWidth};
    max-height: ${props=> props.maxHeight && props.maxHeight};
    margin: ${props=>props.margin};
    text-transform: ${props=>props.textTransform};
    text-align: ${props=>props.textAlign};
    font-size: 24px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.12;
    letter-spacing: normal;
`;

const H5 = styled.h5`
    font-family: ${props=>props.theme.fontFamily};
    color: ${props=>props.color ? props.color : props.theme.colors.black};
    max-width: ${props=> props.maxWidth && props.maxWidth};
    max-height: ${props=> props.maxHeight && props.maxHeight};
    margin: ${props=>props.margin};
    text-transform: ${props=>props.textTransform};
    text-align: ${props=>props.textAlign};
    font-size: 20px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.12;
    letter-spacing: normal;
`;

const headings = {
    1: H1,
    2: H2,
    3: H3,
    4: H4,
    5: H5,
};

class Heading extends React.Component{
    render(){
        var {level, children, ...props} = this.props;
        const headingsKeys = Object.keys(headings);
        if (level > headingsKeys.length){
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