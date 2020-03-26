import React from 'react';
import styled from 'styled-components';


const ParagraphComponent = styled.p``;


class Paragraph extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text: props.data.text,
        };
    }

    render(){
        const {text} = this.state;
        return (
            <ParagraphComponent>{text}</ParagraphComponent>
        )
    }

}

export default Paragraph;