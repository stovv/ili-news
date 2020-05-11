import { PAGE } from './types.react';


export function setPageSize(width, height){
    return {
        type: PAGE.SET_SIZE,
        payload: {width, height}
    }
}