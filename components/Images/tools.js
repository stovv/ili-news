import {BACKEND_URL} from "../../constants";

export function geImageLink(cover, type){
    switch (type) {
        case 'small':
            return `${BACKEND_URL}/uploads/small_${cover.hash}${cover.ext}`;
        case 'medium':
            return `${BACKEND_URL}/uploads/medium_${cover.hash}${cover.ext}`;
        default:
            return `${BACKEND_URL}/uploads/${cover.hash}${cover.ext}`;
    }
}