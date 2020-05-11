import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";

const Large = styled.p`
  font-family: ${props=>props.theme.fontFamily};
  color: ${props=>props.color ? props.color : props.theme.colors.black};
  max-width: ${props=> props.maxWidth && props.maxWidth};
  max-height: ${props=> props.maxHeight && props.maxHeight};
  margin: ${props=>props.margin};
  text-transform: ${props=>props.textTransform};
  text-align: ${props=>props.textAlign};
  user-select: none;
  font-size: 24px;
  font-weight: ${props=>props.weight ? props.weight : "bold"};
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
`;

const Normal = styled.p`
  font-family: ${props=>props.theme.fontFamily};
  color: ${props=>props.color ? props.color : props.theme.colors.black};
  max-width: ${props=> props.maxWidth && props.maxWidth};
  max-height: ${props=> props.maxHeight && props.maxHeight};
  margin: ${props=>props.margin};
  text-transform: ${props=>props.textTransform};
  text-align: ${props=>props.textAlign};
  font-weight: ${props=>props.weight ? props.weight : "bold"};
  user-select: none;
  font-size: 16px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
`;

const Small = styled.p`
  font-family: ${props=>props.theme.fontFamily};
  color: ${props=>props.color ? props.color : props.theme.colors.black};
  max-width: ${props=> props.maxWidth && props.maxWidth};
  max-height: ${props=> props.maxHeight && props.maxHeight};
  margin: ${props=>props.margin};
  text-transform: ${props=>props.textTransform};
  text-align: ${props=>props.textAlign};
  font-weight: ${props=>props.weight ? props.weight : "bold"};
  user-select: none;
  font-size: 14px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
`;

const tags = {
    small: Small,
    normal: Normal,
    large: Large
}

class TagLabel extends React.Component {

    render(){
        const { type, children, ...props} = this.props;
        var Tag = tags[type];
        if (typeof Tag === 'undefined'){
            Tag = Object.values(tags)[0];
        }
        return (
            <Tag {...props}>{children}</Tag>
        )
    }
}

TagLabel.propTypes = {
    type: PropTypes.string.isRequired,
    color: PropTypes.string,
    margin: PropTypes.string,
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