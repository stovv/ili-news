import {BACKEND_URL} from "../../constants";

export function getImageLink(cover, type){
    if ( cover.formats == null ){
        return {
            url: `${BACKEND_URL}${cover.url}`,
            width: cover.width,
            height: cover.height,
            mime: cover.mime
        };
    }

    let types;
    switch (type){
        case('min'):{
            types = ['thumbnail', 'small', 'medium'];
            break;
        }
        case('medium'):{
            types = ['medium'];
            break;
        }
        default:{
            types = [];
            break;
        }
    }

    for (const typeName of types){
        if ( cover.formats[typeName] !== undefined ){
            return {
                url: `${BACKEND_URL}${cover.formats[typeName].url}`,
                width: cover.formats[typeName].width,
                height: cover.formats[typeName].height,
                mime: cover.formats[typeName].mime
            };
        }
    }

    return {
        url: `${BACKEND_URL}${cover.url}`,
        width: cover.width,
        height: cover.height,
        mime: cover.mime
    };

}