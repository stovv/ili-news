import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";


const XXLarge = styled.p`
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
  font-size: 36px;
  font-weight: ${props=> props.weight ? props.weight : "600" };
  font-stretch: normal;
  font-style: normal;
  line-height: 1.04;
  letter-spacing: normal;
  ${({hover, theme}) => hover && `
      :hover{
          transition: all 0.4s ease-in-out;
          color: ${theme.text.hover};
      }
  `}
  ${({wrap}) => wrap &&`
        white-space: pre-wrap;
        word-wrap: break-word;
        white-space: normal;
  `}
`;

const XLarge = styled.p`
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
  font-size: 30px;
  font-weight: ${props=> props.weight ? props.weight : "600" };
  font-stretch: normal;
  font-style: normal;
  line-height: 1.04;
  letter-spacing: normal;
  ${({hover, theme}) => hover && `
      :hover{
          transition: all 0.4s ease-in-out;
          color: ${theme.text.hover};
      }
  `}
  ${({wrap}) => wrap &&`
        white-space: pre-wrap;
        word-wrap: break-word;
        white-space: normal;
  `}
`;



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
  font-weight: ${props=> props.weight ? props.weight : "600" };
  font-stretch: normal;
  font-style: normal;
  line-height: 1.04;
  letter-spacing: normal;
  ${({hideOwerflow, maxLines}) => hideOwerflow && `
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: ${maxLines};
      -webkit-box-orient: vertical;
      overflow: hidden;
  `}
    
  ${({hover, theme}) => hover && `
      :hover{
          transition: all 0.4s ease-in-out;
          color: ${theme.text.hover};
      }
  `}
  ${({wrap}) => wrap &&`
        white-space: pre-wrap;
        word-wrap: break-word;
        white-space: normal;
  `}
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
  font-weight: ${props=> props.weight ? props.weight : "600" };
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  ${({hideOwerflow, maxLines}) => hideOwerflow && `
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: ${maxLines};
      -webkit-box-orient: vertical;
      overflow: hidden;
  `}
    
  ${({hover, theme}) => hover && `
      :hover{
          transition: all 0.4s ease-in-out;
          color: ${theme.text.hover};
      }
  `}
  ${({wrap}) => wrap &&`
        white-space: pre-wrap;
        word-wrap: break-word;
        white-space: normal;
  `}
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
  font-weight: ${props=> props.weight ? props.weight : "700" };
  font-stretch: normal;
  font-style: normal;
  line-height: 1.09;
  letter-spacing: normal;
  ${({hideOwerflow, maxLines}) => hideOwerflow && `
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: ${maxLines};
      -webkit-box-orient: vertical;
      overflow: hidden;
  `}
  
  ${({hover, theme}) => hover && `
      :hover{
          transition: all 0.4s ease-in-out;
          color: ${theme.text.hover};
      }
  `}
    ${({wrap}) => wrap &&`
        white-space: pre-wrap;
        word-wrap: break-word;
        white-space: normal;
  `}
`;

const XSmall = styled.p`
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
  font-size: 14px;
  font-weight: ${props=> props.weight ? props.weight : "700" };
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  ${({hideOwerflow, maxLines}) => hideOwerflow && `
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: ${maxLines};
      -webkit-box-orient: vertical;
      overflow: hidden;
  `}
  
  ${({hover, theme}) => hover && `
      :hover{
          transition: all 0.4s ease-in-out;
          color: ${theme.text.hover};
      }
  `}
  ${({wrap}) => wrap &&`
    white-space: pre-wrap;
    word-wrap: break-word;
    white-space: normal;
  `}
`;


const cardTexts = {
    xsmall: XSmall,
    small: Small,
    normal: Normal,
    large: Large,
    xlarge: XLarge,
    xxlarge: XXLarge
}

class CardText extends React.Component {

    render(){
        const { type, children, ...props} = this.props;

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
    weight: PropTypes.string,
    margin: PropTypes.string,
    position: PropTypes.string,
    right: PropTypes.string,
    left: PropTypes.string,
    top: PropTypes.string,
    bottom: PropTypes.string,
    textTransform: PropTypes.string,
    textAlign: PropTypes.string,
    hideOwerflow: PropTypes.bool,
    maxLines: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    wrap: PropTypes.bool,
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