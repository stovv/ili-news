import { SITE } from './types';

let initialState = {
    toNotify: [],
    existsPostIds: [],
    activeSearch: false,
    infinityActive: false,
    prevCategoryIds: [],
    categoryOffsets: {},
    postsOffset: 0,
    availableCategories: []
}

const CommonReducer = (state = initialState, action) => {
    switch (action.type) {
        case SITE.INFINITY.SET_STATE:{
            return{
                ...state,
                infinityActive: action.payload
            }
        }
        case SITE.SEARCH:{
            return {
                ...state,
                activeSearch: !state.activeSearch
            }
        }
        case SITE.NOTIFY.PUSH:{
            return {
                ...state,
                toNotify: [...state.toNotify, action.payload]
            }
        }
        case SITE.NOTIFY.CLEAR:{
            return {
                ...state,
                toNotify: []
            }
        }
        case SITE.INFINITY.SET_EXISTS_POSTS:{
            return {
                ...state,
                existsPostIds: action.payload
            }
        }
        case SITE.INFINITY.SET_PREV_CATEGORIES:{
            return {
                ...state,
                prevCategoryIds: [
                    ...state.prevCategoryIds,
                    ...action.payload
                ]
            }
        }
        case SITE.INFINITY.SET_CATEGORY_OFFSET:{
            const { categoryId, offset } = action.payload;
            return {
                ...state,
                categoryOffsets: {
                    ...state.categoryOffsets,
                    [categoryId]: offset
                }
            }
        }
        case SITE.INFINITY.SET_AVAILABLE_CATEGORIES: {
            return {
                ...state,
                availableCategories: action.payload
            }
        }
        case SITE.INFINITY.SET_POSTS_OFFSET:{
            return {
                ...state,
                postsOffset: action.payload
            }
        }
        default:
            return state
    }
}

export default CommonReducer;