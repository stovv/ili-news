import {GET_DRAFTS, OPEN_DRAFT, UPDATE_DRAFT, CLOSE_DRAFT} from "../tools/constants";


let initialState = {
    draft: null,
    drafts: {}
}

if (typeof localStorage !== "undefined") {
    const smisolCookie = sessionStorage.getItem('smisol');
    if (smisolCookie) {
        initialState = JSON.parse(smisolCookie);
    }
} 

function smisolReducer(state, action){
   switch (action.type) {
        case GET_DRAFTS:
            const getObj = {
                ...state,
                draft: null,
                drafts: action.payload
            };
            sessionStorage.setItem("smisol", JSON.stringify(getObj));
            return getObj;
        case OPEN_DRAFT:
            let openObj = {
                ...state,
                draft: action.payload
            };
            sessionStorage.setItem("smisol", JSON.stringify(openObj));
            return openObj;
        case UPDATE_DRAFT:
            let updateObj = {
                ...state,
                draft: {
                    ...state.draft,
                    ...action.payload
                }
            };
            sessionStorage.setItem("smisol", JSON.stringify(updateObj));
            return updateObj;
        case CLOSE_DRAFT:
            let closeObj = {
                ...state,
                draft: null
            };
            sessionStorage.setItem("smisol", JSON.stringify(closeObj))
            return closeObj;
        default:
            return initialState;
   }
};

export default smisolReducer;