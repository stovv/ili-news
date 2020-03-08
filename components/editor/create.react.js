import React from 'react';

import EditorJs from "react-editor-js";
import EDITOR_JS_TOOLS from './tools.react';

class Create extends React.Component{
    componentDidMount() {
        this.editorInstance; // access editor-js
    }

    async handleSave() {
        const savedData = await this.editorInstance.save();
    }

    
    render(){
        return (
            <>
            <h1>ILI EDITOR</h1> 
            <EditorJs
                instanceRef={instance => this.editorInstance = instance}
                tools={EDITOR_JS_TOOLS}
                data={{
                    time: 1556098174501,
                    version: "2.12.4",
                    blocks: [
                        {
                            type: 'header',
                            data: {
                                text: 'Здесь должно быть имя ...',
                                level: 1
                            }
                        },
                        {
                            type: 'paragraph',
                            data: {
                                text: 'Напишите что- прекрасное!'
                            }
                        }
                    ]
                }}
            />
        </>);
    }

}


export default Create;
