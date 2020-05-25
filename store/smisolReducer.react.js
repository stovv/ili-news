import {GET_DRAFTS, OPEN_DRAFT, UPDATE_DRAFT, CLOSE_DRAFT} from "../tools/constants";
import { SMISOL } from "./types.react";

let initialState = {
    draft: null,
    temp_cover: null,
    drafts: []
}

// if (typeof localStorage !== "undefined" && typeof window !== "undefined") {
//     const smisolCookie = sessionStorage.getItem('smisol');
//     if (smisolCookie) {
//         initialState = JSON.parse(smisolCookie);
//     }
// }

function smisolReducer(state = initialState, action){
   switch (action.type) {
        case GET_DRAFTS:{
            return {
                ...state,
                draft: null,
                drafts: action.payload
            };
        }
        case OPEN_DRAFT:{
            return {
                ...state,
                draft: action.payload
            };
        }
        case UPDATE_DRAFT:{
            return {
                ...state,
                draft: {
                    ...state.draft,
                    ...action.payload
                }
            };
        }
       case SMISOL.COVER.SET_TEMP:{
           return {
               ...state,
               temp_cover: action.payload
           };
       }
        case CLOSE_DRAFT:{
            return {
                ...state,
                draft: null
            };
        }
        default:
            return state;
   }
};

/*
* export function setTempCover(fileItems){
    return {
        type: SMISOL.COVER.SET_TEMP,
        payload: fileItems
    }
};
*
* */

export default smisolReducer;