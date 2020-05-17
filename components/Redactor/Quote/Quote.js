import ReactDOM from "react-dom";
import React from "react";
import { ThemeProvider } from 'styled-components';

import { QuoteInput } from "./Quote.react";
import { lightTheme } from "../../../theme/theme.react";

// Class for EditorJS
class QuoteEditor {
    static get toolbox() {
        return {
            title: 'Quote',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7.17 17c.51 0 .98-.29 1.2-.74l1.42-2.84c.14-.28.21-.58.21-.89V8c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h2l-1.03 2.06c-.45.89.2 1.94 1.2 1.94zm10 0c.51 0 .98-.29 1.2-.74l1.42-2.84c.14-.28.21-.58.21-.89V8c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h2l-1.03 2.06c-.45.89.2 1.94 1.2 1.94z"/></svg>'
        };
    }

    constructor({data, api}){
        console.log("DATA", data);
        this.data = {
            text: data.text || '',
            type: data.type || "1"
        }
        this.tunes = [];
        this.api = api;
    }

    renderSettings(){
        const settings = [
            {
                name: '1',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 11H4c-.55 0-1 .45-1 1s.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1zM4 18h10c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM20 6H4c-.55 0-1 .45-1 1v.01c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1z"/></svg>`
            },
            {
                name: '2',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M4 21h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-4h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-4h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-4h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 4c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z"/></svg>`
            },
            {
                name: '3',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M5 9h14c.55 0 1 .45 1 1s-.45 1-1 1H5c-.55 0-1-.45-1-1s.45-1 1-1zm0 4h8c.55 0 1 .45 1 1s-.45 1-1 1H5c-.55 0-1-.45-1-1s.45-1 1-1z"/></svg>`
            }
        ];
        const wrapper = document.createElement('div');

        settings.forEach( tune => {
            let button = document.createElement('div');

            button.classList.add('cdx-settings-button');
            button.innerHTML = tune.icon;
            button.addEventListener('click', () => {
                this._toggleTune(tune.name);
            });
            button.classList.toggle('cdx-settings-button--active', tune.name === this.data.type);
            button.dataset.name = tune.name;
            this.tunes.push(button);
            wrapper.appendChild(button);
        });
        return wrapper;
    }

    _toggleTune(tune) {
        this.data.type = tune;
        this.tunes.forEach(button => {
            button.classList.toggle('cdx-settings-button--active', button.dataset.name === tune);
        });
        const pos = this.api.blocks.getCurrentBlockIndex();
        this.api.blocks.delete(pos);
        this.api.blocks.insert("quote", this.data, {}, pos, true);
    }

    /**
     * Empty Quote is not empty Block
     * @public
     * @returns {boolean}
     */
    static get contentless() {
        return true;
    }

    /**
     * Allow to press Enter inside the Quote
     * @public
     * @returns {boolean}
     */
    static get enableLineBreaks() {
        return true;
    }

    render(){
        const component = (
            <ThemeProvider theme={lightTheme}>
                <QuoteInput input data={this.data}/>
            </ThemeProvider>
        );
        const el = document.createElement("div");
        ReactDOM.render(component, el);
        return el;
    }

    save(blockContent){
        return{
            text: blockContent.querySelector('textarea').value || "",
            type: this.data.type,
        }
    }
}

export default QuoteEditor;
