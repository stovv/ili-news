import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    background-color: #000000;
    padding: 1rem;
    display: flex;
    -webkit-box-shadow: 0px 20px 24px -6px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 20px 24px -6px rgba(0,0,0,0.75);
    box-shadow: 0px 20px 24px -6px rgba(0,0,0,0.75);
    border-radius: 10px;
`;

const Text = styled.h3`
    font-family: ${props=>props.theme.fontFamily};
    text-align: center;
    font-size: 16px;
    color: #ffffff;
    margin: 0;
`;


class EmojiToast extends React.Component{
    constructor(props){
        super(props);
        this.onClose = props.onClose;
    }

    render(){
        return(
            <Container onClick={this.onClose}>
                <Text>
                    {this.props.children}
                </Text>
            </Container>
        );
    }
}

export default EmojiToast;