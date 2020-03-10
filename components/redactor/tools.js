import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import List from '@editorjs/list';
import Embed from "@editorjs/embed";
import Marker from "@editorjs/marker";
import Checklist from "@editorjs/checklist";
import LinkTool from "@editorjs/link";
import ImageTool from "@editorjs/image";

import {getExternalImage, uploadFile} from "../../api";
import {SITE_URL} from '../../constants';


export default {
    header: {
        class: Header,
        config: {
          placeholder: 'Заголовок',
          levels: [2, 3, 4],
          defaultLevel: 2
        },
        inlineToolbar: true
    },
    paragraph: {
        class: Paragraph,
        inlineToolbar: true
    },
    list: {
        class: List,
        inlineToolbar: false
    },
    embed: {
        class: Embed,
        inlineToolbar: true,
        config: {
            services: {
              youtube: true,
              coub: true
            }
        }
    },
    checklist: {
        class: Checklist,
        inlineToolbar: true,
    },
    marker: {
        class: Marker,
        inlineToolbar: true,
    },
    linkTool: {
        class: LinkTool,
        inlineToolbar: true,
        config: {
          endpoint: 'http://localhost:8008/fetchUrl', // Your backend endpoint for url data fetching
        }
    },
    image: {
        class: ImageTool,
        config: {
          
          uploader: {
              uploadByFile(file){
                return uploadFile(file)
                  .then(response => {
                    return {
                      success: 1,
                      file: {
                        url: `${SITE_URL}\\${response.data[0].url}`,
                      }
                    };
                  });
              },
              async uploadByUrl(url){
                var imageFile = await getExternalImage(url);
                return uploadFile(imageFile)
                  .then(response=>{
                    return {
                      success: 1,
                      file: {
                        url: `${SITE_URL}\\${response.data[0].url}`,
                      }
                    };
                  })
              }
          }
        }
    }
}

