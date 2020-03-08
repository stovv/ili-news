import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import LinkTool from "@editorjs/link";
import Image, { ImageTool } from "@editorjs/image";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import Header from '@editorjs/header';


const EDITOR_JS_TOOLS = {
  embed: Embed,
  marker: Marker,
  header: Header,
  list: List,
  warning: Warning,
  linkTool: LinkTool,
  image: {
    class: ImageTool,
    config: {
      endpoints: {
        byFile: 'http://localhost:8008/uploadFile',
        byUrl: 'http://localhost:8008/fetchUrl',
      }
    }
  },
  header: Header,
  quote: Quote,
  checklist: CheckList,
  delimiter: Delimiter,
};

export default EDITOR_JS_TOOLS;