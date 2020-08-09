import { PAGE } from './types.react';


export function setPageSize(width, height){
    return {
        type: PAGE.SET_SIZE,
        payload: {width, height}
    }
}

export function changeInfinityState(state){
    return {
        type: PAGE.INFINITY_PAGE,
        payload: state
    }
}