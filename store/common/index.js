import { PAGE, SITE } from './types';

let initialState = {
    pageSize:{
        width: 1440,
        height: 919
    },
    infinityActive: false,
    activeSearch: false,
    mod: "default",
    toNotify: []
}

const CommonReducer = (state = initialState, action) => {
    switch (action.type) {
        case PAGE.SET_SIZE:{
            return {
                ...state,
                pageSize: action.payload
            }
        }
        case PAGE.INFINITY:{
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
        case SITE.THEME.DARK:{
            return {
                ...state,
                mod: "dark"
            }
        }
        case SITE.THEME.DEFAULT:{
            return {
                ...state,
                mod: "default"
            }
        }
        case SITE.NOTIFY.ADD:{
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
        default:
            return state
    }
}

export default CommonReducer;