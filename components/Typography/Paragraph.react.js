import React from 'react';
import styled from 'styled-components';


const ParagraphComponent = styled.p`
  font-family: ${props=>props.theme.fontFamily};
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: ${props => props.theme.text.primary};

`;


class Paragraph extends React.Component{
    render(){
        const {data} = this.props;

        if (data == null){
            return null
        }

        return (
            <ParagraphComponent>{data.text}</ParagraphComponent>
        )
    }

}

export default Paragraph;