import { PAGE } from './types.react';

let initialState = {
    pageSize:{
        width: 1440,
        height: 919
    },
    infinityActive: false,
    activeSearch: false
}

const CommonReducer = (state = initialState, action) => {
    switch (action.type) {
        case PAGE.SET_SIZE:{
            return {
                ...state,
                pageSize: action.payload
            }
        }
        case PAGE.INFINITY_PAGE:{
            return{
                ...state,
                infinityActive: action.payload
            }
        }
        case PAGE.SEARCH:{
            return {
                ...state,
                activeSearch: !state.activeSearch
            }
        }
        default:
            return state
    }
}

export default CommonReducer;