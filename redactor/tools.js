import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import List from '@editorjs/list';
import Embed from "@editorjs/embed";
import Marker from "@editorjs/marker";
import Table from '@editorjs/table';
import Checklist from "@editorjs/checklist";
import LinkTool from "@editorjs/link";
import ImageTool from "@editorjs/image";
import RawHTML from '@editorjs/raw';

import createGenericInlineTool, {
    ItalicInlineTool,
    UnderlineInlineTool,
} from 'editorjs-inline-tool';

import { EditorComponents } from '../components';

import {File} from '../api'
import {BACKEND_URL} from '../constants';
import {lightTheme} from "../theme/theme.react";


export default {
    callout:{
        class: EditorComponents.CalloutEditor,
        shortcut: 'CMD+ALT+C'
    },
    quote: {
        class: EditorComponents.QuoteEditor,
        shortcut: 'CMD+ALT+Q'
    },
    header: {
        class: Header,
        config: {
          placeholder: 'Заголовок',
          levels: [1, 2, 3, 4, 5],
          defaultLevel: 2
        },
        shortcut: 'CMD+SHIFT+H',
        inlineToolbar: true
    },
    paragraph: {
        class: Paragraph,
        inlineToolbar: true,
        shortcut: 'CMD+SHIFT+P'
    },
    bold: {
        class: createGenericInlineTool({
            shortcut: 'CMD+B',
            tagName: 'B',
            toolboxIcon: '<svg class="icon icon--bold" width="12px" height="14px"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#bold"></use></svg>',
        }),
    },
    highlight:{
        class: createGenericInlineTool({
            tagName: 'SPAN',
            toolboxIcon: '<svg class="icon " height="24" viewBox="0 0 24 24" width="24"><circle cx="12" cy="19" r="2"/><path d="M10 3h4v12h-4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>',
        }),
        shortcut: 'CMD+SHIFT+E'
    },
    "cross out":{
        class: createGenericInlineTool({
            sanitize:{
                del:{}
            },
            tagName: 'DEL',
            toolboxIcon: '<svg class="icon "  height="24" viewBox="0 0 24 24" width="24"><g><rect fill="none" height="24" width="24"/></g><g><g><g><path d="M6.85,7.08C6.85,4.37,9.45,3,12.24,3c1.64,0,3,0.49,3.9,1.28c0.77,0.65,1.46,1.73,1.46,3.24h-3.01 c0-0.31-0.05-0.59-0.15-0.85c-0.29-0.86-1.2-1.28-2.25-1.28c-1.86,0-2.34,1.02-2.34,1.7c0,0.48,0.25,0.88,0.74,1.21 C10.97,8.55,11.36,8.78,12,9H7.39C7.18,8.66,6.85,8.11,6.85,7.08z M21,12v-2H3v2h9.62c1.15,0.45,1.96,0.75,1.96,1.97 c0,1-0.81,1.67-2.28,1.67c-1.54,0-2.93-0.54-2.93-2.51H6.4c0,0.55,0.08,1.13,0.24,1.58c0.81,2.29,3.29,3.3,5.67,3.3 c2.27,0,5.3-0.89,5.3-4.05c0-0.3-0.01-1.16-0.48-1.94H21V12z"/></g></g></g></svg>',
        })
    },
    // or use a pre-defined tool instead
    italic: ItalicInlineTool,
    underline: {
        class: UnderlineInlineTool,
        shortcut: 'CMD+U'
    },
    list: {
        class: List,
        inlineToolbar: true,
        shortcut: 'CMD+SHIFT+L'
    },
    embed: {
        class: Embed,
        inlineToolbar: true,
        config: {
            services: {
                youtube: true,
                coub: true,
                instagram: true,
                "yandex-music-playlist": true,
                "yandex-music-album": true,
                "yandex-music-track": true,
                twitter: true,
                vine: true,
                vimeo: true,
                "twitch-video": true,
                "twitch-channel": true,
                gfycat: true,
                imgur: true
            }
        }
    },
    checklist: {
        class: Checklist,
        inlineToolbar: true,
        shortcut: 'CMD+SHIFT+C'
    },
    marker: {
        class: Marker,
        inlineToolbar: true,
        shortcut: "CMD+M"
    },
    linkTool: {
        class: LinkTool,
        inlineToolbar: true,
        config: {
          endpoint: `${BACKEND_URL}/fetcher/fetchUrl`, // Your backend endpoint for url data fetching
        },
        shortcut: 'CMD+ALT+L'
    },
    table: {
      class: Table,
      inlineToolbar: true,
    },
    image: {
        class: ImageTool,
        config: {
          uploader: {
              uploadByFile(file){
                return File.uploadFile(file)
                  .then(response => {
                    return {
                      success: 1,
                      file: {
                        url: `${BACKEND_URL}${response.data[0].url}`,
                      }
                    };
                  })
                  .catch(reason=>{
                    console.log(reason);
                    return {
                      success: 0
                    }
                  });
              },
              async uploadByUrl(url){
                var imageFile = await File.getExternalImage(url);
                return File.uploadFile(imageFile)
                  .then(response=>{
                    return {
                      success: 1,
                      file: {
                        url: `${BACKEND_URL}${response.data[0].url}`,
                      }
                    };
                  })
              }
          }
        },
        shortcut: 'CMD+SHIFT+I'
    },
    raw: {
        class: RawHTML,
        config:{
            placeholder: 'Сюда можно вставить iframe 😊'
        },
        shortcut: 'CMD+SHIFT+F'
    }
}

