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
  color: ${props=>props.theme.text.hover};
  text-decoration: none;
  border-radius: 18px;
  padding: 6px 9px;
  display: inline-block;
  transition: all 120ms ease-in-out 0s, padding 120ms ease-in-out 0s;
  :hover{
    background-color: ${props=>props.theme.colors.primary};
    color: ${props=>props.theme.text.onPrimary};
    transform: translateY(-3px);
    box-shadow: 0px 100px 80px rgba(0, 0, 0, 0.07), 0px 22px 18px rgba(0, 0, 0, 0.04), 0px 6px 6px rgba(0, 0, 0, 0.03);
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