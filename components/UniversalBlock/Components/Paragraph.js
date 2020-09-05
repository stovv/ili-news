import React from "react";
import ReactDOMServer from 'react-dom/server';
import styled from "styled-components";

import { ComposeFont } from "../../Typography";
import IliThemeProvider from "../../../theme";
import {Provider} from "react-redux";
import {store} from '../../../store'
import {HEX2RGB} from "../../../tools";

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


const CustomLink = styled.a`
  color: ${props=>props.theme.text.primary};
  text-decoration: none;
  background-size: 100% 200%;
  background-position: 0px 0px;
  transition: background-position 120ms ease-in-out 0s, padding 120ms ease-in-out 0s;
  ${({theme}) => {
    const rgb = HEX2RGB(theme.colors.primary.replace('#', ''));
    return `
       background-image: linear-gradient(transparent 0%, transparent calc(50% - 9px), rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.3) calc(50% - 9px), rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.3) 100%);
    `
  }};
  :hover{
    background-position: 0px 100%;
    ${({theme}) => {
    const rgb = HEX2RGB(theme.colors.primary.replace('#', ''));
    return `
       background-image: linear-gradient(transparent 0%, transparent calc(50% - 9px), rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.7) calc(50% - 9px), rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.7) 100%);
    `
}};
  }
  
`;


class Paragraph extends React.Component{

    prepareDOM(html){
        if (typeof window !== "undefined"){
            let doc = new DOMParser().parseFromString(html, 'text/html');
            // replace links to custom
            let all_a = doc.getElementsByTagName("a");

            for ( let a of all_a ){
                let temp = document.createElement('div');
                let str_html = ReactDOMServer.renderToString(
                    <Provider store={store}>
                        <IliThemeProvider>
                            <CustomLink href={a.attributes.href.value} dangerouslySetInnerHTML={{__html: a.innerHTML}}/>
                        </IliThemeProvider>
                    </Provider>
                );
                temp.innerHTML = str_html;
                a.replaceWith(temp.firstChild.firstChild);
            }

            return doc.body.innerHTML;
        }

        return html;
    }

    render(){
        const {data} = this.props;

        if (data == null){
            return null
        }

        return (
            <ParagraphComponent dangerouslySetInnerHTML={{__html: this.prepareDOM(data.text)}}/>
        )
    }

}

export default Paragraph;