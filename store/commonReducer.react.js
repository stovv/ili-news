import { PAGE } from './types.react';

let initialState = {
    pageSize:{
        width: 1440,
        height: 919
    }
}

// const commonSession = getStorage('common');
// if (commonSession !== null) {
//     initialState = JSON.parse(commonSession);
// }

const CommonReducer = (state = initialState, action) => {
    switch (action.type) {
        case PAGE.SET_SIZE:{
            return {
                ...state,
                pageSize: action.payload
            }
        }
        default:
            return state
    }
}

export default CommonReducer;