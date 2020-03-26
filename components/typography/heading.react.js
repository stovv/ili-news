import React from 'react';
import styled from 'styled-components';


const H2 = styled.h1``;
const H3 = styled.h2``;
const H4 = styled.h3``;


const headings = {
    2: H2,
    3: H3,
    4: H4
};

class Heading extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text: props.data.text,
            HeadindComponent: headings[props.data.level]
        };
    }

    render(){
        const {HeadindComponent, text} = this.state;
        return (
            <HeadindComponent>{text}</HeadindComponent>
        )
    }

}

export default Heading;