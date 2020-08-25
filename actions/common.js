import { PAGE, SITE } from '../store/common/types';


export function setPageSize(width, height){
    return {
        type: PAGE.SET_SIZE,
        payload: { width, height }
    }
}


export function changeInfinityState(state){
    return {
        type: PAGE.INFINITY,
        payload: state
    }
}

export function clickOnSearch(){
    return { type: SITE.SEARCH }
}

export function setDarkMod(){
    return {
        type: SITE.THEME.DARK
    }
}

export function setDefaultMod(){
    return {
        type: SITE.THEME.DEFAULT
    }
}