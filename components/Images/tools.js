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
    switch (type) {
        case 'small':
            return {
                url: `${BACKEND_URL}${cover.formats.small.url}`,
                width: cover.formats.small.width,
                height: cover.formats.small.height,
                mime: cover.formats.small.mime
            };
        case 'medium':
            return {
                url: `${BACKEND_URL}${cover.formats.medium.url}`,
                width: cover.formats.medium.width,
                height: cover.formats.medium.height,
                mime: cover.formats.medium.mime
            };
        case 'thumbnail':
            return {
                url: `${BACKEND_URL}${cover.formats.thumbnail.url}`,
                width: cover.formats.thumbnail.width,
                height: cover.formats.thumbnail.height,
                mime: cover.formats.thumbnail.mime
            };
        default:
            return {
                url: `${BACKEND_URL}${cover.url}`,
                width: cover.width,
                height: cover.height,
                mime: cover.mime
            };
    }
}