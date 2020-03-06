import React from 'react';

import EditorJs from "react-editor-js";

import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import LinkTool from "@editorjs/link";
import Image, { ImageTool } from "@editorjs/image";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";


export const EDITOR_JS_TOOLS = {
  embed: Embed,
  marker: Marker,
  list: List,
  warning: Warning,
  linkTool: LinkTool,
  image: Image,
  imageTool: ImageTool,
  header: Header,
  quote: Quote,
  checklist: CheckList,
  delimiter: Delimiter,
};


class Create extends React.Component{
    render(){
        return (
            <>
            <h1>ILI EDITOR</h1> 
            <EditorJs
                tools={EDITOR_JS_TOOLS}
                data={{
                    time: 1556098174501,
                    version: "2.12.4"
                }}
            />
        </>);
    }

}


export default Create;
