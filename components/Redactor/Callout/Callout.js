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
            icon: '<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12zM11 5h2v6h-2zm0 8h2v2h-2z"/></svg>'
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
            emoji: blockContent.querySelector('button').getAttribute('aria-label').split(', ')[1],
            text: blockContent.querySelector('textarea').value
        }
    }
}

export default CalloutEditor;