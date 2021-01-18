import { CACHE } from "../store/reducers/cache/types";

export function setCache(key, value){
    return async dispatch => {
        dispatch({
            type: CACHE.SET,
            payload: { key, value }
        })
    }
}

export function updateCache(key, value){
    return async dispatch => {
        dispatch({
            type: CACHE.UPDATE,
            payload: { key, value }
        })
    }
}

export function removeCache(key){
    return async dispatch => {
        dispatch({
            type: CACHE.REMOVE,
            payload: { key }
        })
    }
}

export function cleanCache(){
    return async dispatch => {
        dispatch({
            type: CACHE.CLEAR
        })
    }
}