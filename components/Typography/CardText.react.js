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
  position: ${props=>props.position};
  width: ${props=>props.width};
  height: ${props=>props.height};
  right: ${props=>props.right};
  left: ${props=>props.left};
  top: ${props=>props.top};
  bottom: ${props=>props.bottom};
  user-select: none;
  font-size: 28px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.04;
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
  position: ${props=>props.position};
  width: ${props=>props.width};
  height: ${props=>props.height};
  right: ${props=>props.right};
  left: ${props=>props.left};
  top: ${props=>props.top};
  bottom: ${props=>props.bottom};
  user-select: none;
  font-size: 20px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.04;
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
  position: ${props=>props.position};
  width: ${props=>props.width};
  height: ${props=>props.height};
  right: ${props=>props.right};
  left: ${props=>props.left};
  top: ${props=>props.top};
  bottom: ${props=>props.bottom};
  user-select: none;
  font-size: 18px;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.04;
  letter-spacing: normal;
`;

const cardTexts = {
    small: Small,
    normal: Normal,
    large: Large
}

class CardText extends React.Component {

    render(){
        const { type, children, ...props} = this.props;
        console.log(props);
        var Text = cardTexts[type];
        if (typeof Text === 'undefined'){
            Text = Object.values(cardTexts)[0];
        }
        return (
            <Text {...props}>{children}</Text>
        )
    }
}

CardText.propTypes = {
    type: PropTypes.string.isRequired,
    color: PropTypes.string,
    margin: PropTypes.string,
    position: PropTypes.string,
    right: PropTypes.string,
    left: PropTypes.string,
    top: PropTypes.string,
    bottom: PropTypes.string,
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

export default CardText;