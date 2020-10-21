import { SITE } from '../store/reducers/common/types';


export function changeInfinityState(state){
    return {
        type: SITE.INFINITY.SET_STATE,
        payload: state
    }
}

export function clickOnSearch(){
    return { type: SITE.SEARCH }
}

export function notify(text, color, textColor){
    return {
        type: SITE.NOTIFY.PUSH,
        payload: {
            text, color, textColor
        }
    }
}

export function clearNotify(){
    return {
        type: SITE.NOTIFY.CLEAR
    }
}

export function setExistsPosts(postIds){
    return {
        type: SITE.INFINITY.SET_EXISTS_POSTS,
        payload: postIds
    }
}

export function setPrevCategories(categoryIds){
    return {
        type: SITE.INFINITY.SET_PREV_CATEGORIES,
        payload: categoryIds
    }
}

export function setCategoryOffset(categoryId, offset){
    return {
        type: SITE.INFINITY.SET_CATEGORY_OFFSET,
        payload: {
            categoryId, offset
        }
    }
}

export function setAvailableCategories(categories){
    return {
        type: SITE.INFINITY.SET_AVAILABLE_CATEGORIES,
        payload: categories
    }
}