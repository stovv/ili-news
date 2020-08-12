import React from 'react';
import PropTypes from 'prop-types';
import {Flex, Box} from 'rebass';
import styled from 'styled-components';
import nextId from "react-id-generator";


export const SearchInput = styled.input`
  font-size: 30px;
  font-weight: 500;
  width: ${props => props.screenWidth >= 677 ? "624px" : (props.screenWidth >= 450 ? "400px" : "250px") };
  line-height: 1.27;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: center;
  padding: ${props => props.theme.spacing.s };
  font-family: ${props => props.theme.fontFamily};
  color: ${props => props.theme.text.onPrimary};
  outline: 0;
  border: 0;
  background-color: transparent;
  border-bottom: 4px solid ${props => props.theme.text.disabled};

  ::placeholder {
    color: ${props => props.theme.text.disabled};
  }
`;


const BlankInput = styled.textarea`
    font-family: ${props => props.theme.fontFamily};
    margin: 0;
    min-height: 50px;
    resize: none;
    height: ${props=> props.idealHeight};
    font-size: ${props=> props.fontSizeIndex ? (props.theme.fontSizes[props.fontSizeIndex] ? props.theme.fontSizes[props.fontSizeIndex] : props.theme.fontSizes[9]) : props.theme.fontSizes[9]};
    color: ${props => props.inverted ? props.theme.text.onPrimary : props.theme.text.primary };
    background-color: ${props => props.inverted ? 'transparent' : props.theme.colors.secondary};
    font-weight: 500;
    width: 100%;
    word-break: break-word;
    ${({outline}) => outline 
        ? `
          border: 1px solid ${outline};
          border-radius: 5px;
          outline: ${outline};
        `
        : `
          border: none;
          outline: none;
        `
    };
    padding-left: 15px;
    ::placeholder{
        -webkit-text-fill-color: rgba(55, 53, 47, 0.2);
    }
    ${({label, theme}) => label && `
        :focus{
            border-left: 3px solid ${theme.text.secondary};
        }
    `}
`;

const Label = styled.span`
    font-family: ${props => props.theme.fontFamily};
    margin: 0 20px 0 0;
    font-size: ${props=> props.theme.fontSizes[1]};
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.32;
    letter-spacing: normal;
`;

export class TitleArea extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            idealHeight: 28,
            lastScrollHeight: 28,
            focused: false,
            first: true
        }
        this.inputId = nextId();
    }

    shouldComponentUpdate(nextProps, nextState) {
        /*console.log((nextProps.defaultValue !== this.props.defaultValue )||
            nextState.idealHeight !== this.state.idealHeight ||
            this.state.first || nextState.focused !== this.state.focused);*/
        return true;
    }

    changeHeight = ref => {
        this.TextAreaRef = ref;
        this.forceUpdate();
    }

    render(){

        const { withoutLabel,inverted, fontSizeIndex, outline} = this.props;
        if (this.TextAreaRef != null) {
            this.TextAreaRef.style.height = '0px'; // This creates an inline style
            let scrollHeight = this.TextAreaRef.scrollHeight;
            const style = window.getComputedStyle(this.TextAreaRef);
            this.TextAreaRef.removeAttribute('style'); // The inline style must be removed
            this.state.idealHeight = scrollHeight;
        }

        return(
            <Flex>
                {
                    ! withoutLabel &&
                    <Box my="auto" sx={{
                        visibility: this.state.focused ? 'visible' : 'hidden'
                    }}>
                        <Label>Заголовок</Label>
                    </Box>
                }
                <BlankInput
                    id={this.inputId}
                    placeholder={this.props.placeholder}
                    value={this.props.defaultValue}
                    onChange={this.props.onChange}
                    idealHeight={this.state.idealHeight + 'px'}
                    onFocus={()=>this.setState({focused: true})}
                    onBlur={()=>this.setState({focused: false})}
                    label={!withoutLabel}
                    inverted={inverted}
                    fontSizeIndex={fontSizeIndex}
                    outline={outline}
                    ref={this.changeHeight}
                />
            </Flex>
        );
    }

}

TitleArea.propTypes = {
    withoutLabel: PropTypes.bool,
    inverted: PropTypes.bool,
    fontSizeIndex: PropTypes.number,
}