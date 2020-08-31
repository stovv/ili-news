import React from "react";
import styled from "styled-components";

import { ComposeFont } from "../../Typography";

const ParagraphComponent = styled.p`   
    ${props => ComposeFont(props.theme.post.typo.paragraph, {
        fontFamily: props.theme.fontFamily,
        lineHeight: 1.02,
        fontWeight: "normal",
        fontSize: {
            s: "14px",
            m: "16px",
            l: "18px",
            tablet: "20px",
            laptop: "20px",
        },
        margin: {
            s: '0 12px 0 0',
            m: '0 14px 0 0',
            l: '0 20px 0 0',
            tablet: '0 24px 0 0',
            laptop: '0 24px 0 0'
        },
        color: props.theme.text.primary
    })};
    :first-child {
      margin-top: 0;
    }
`;

class Paragraph extends React.Component{
    render(){
        const {data} = this.props;

        if (data == null){
            return null
        }

        return (
            <ParagraphComponent dangerouslySetInnerHTML={{__html: data.text}}/>
        )
    }

}

export default Paragraph;