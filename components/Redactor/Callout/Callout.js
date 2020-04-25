import ReactDOM from "react-dom";
import React from "react";
import {ThemeProvider} from 'styled-components';

import Callout from "./Callout.react";
import {lightTheme} from "../../../theme/theme.react";

// Class for EditorJS
class CalloutEditor {
    static get toolbox() {
        return {
            title: 'Callout',
            icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
        };
    }

    constructor({data}){
        this.data = {
            emoji: data.emoji ? { id: data.emoji, skin: 3 } : undefined,
            text: data.text || ''
        }
    }

    render(){
        const component = (
            <ThemeProvider theme={lightTheme}>
                <Callout input data={this.data}/>
            </ThemeProvider>
        );
        const el = document.createElement("div");
        ReactDOM.render(component, el);
        return el;
    }

    save(blockContent){
        return{
            emoji: blockContent.querySelector('span').getAttribute('aria-label').split(', ')[1],
            text: blockContent.querySelector('textarea').value
        }
    }
}

export default CalloutEditor;