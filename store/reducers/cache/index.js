import { CACHE } from "./types";


function CacheReducer(state = {}, action){
    switch (action.type) {
        case CACHE.SET:{
            return {
                ...state,
                [action.payload.key]: action.payload.value
            }
        }
        case CACHE.UPDATE:{
            return {
                ...state,
                [action.payload.key]: {
                    ...state[action.payload.key],
                    ...action.payload.value
                }
            }
        }
        case CACHE.REMOVE:{
            return {
                ...state,
                [action.payload.key]: undefined
            }
        }
        case CACHE.CLEAR:{
            return {}
        }
        default:
            return state;
    }
}

export default CacheReducer;