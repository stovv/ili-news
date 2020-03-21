import {GET_DRAFTS, OPEN_DRAFT, UPDATE_DRAFT, CLOSE_DRAFT} from '../tools/constants';
import {me, create_draft, update_draft, get_draft} from '../api';


const getDraftAction = (data) => {
    return {
        type: GET_DRAFTS,
        payload: data
    };
};

const openDraftAction = (data) =>{
    return {
        type: OPEN_DRAFT,
        payload: data
    };
};

const updateDraftAction = (data) =>{
    return {
        type: UPDATE_DRAFT,
        payload: data
    };
};

const closeDraftAction = {
    type: CLOSE_DRAFT,
    payload: null
};


export function getDrafts(jwt, user_id){
    return async dispatch => {
        await me(jwt, user_id)
            .then(response=>{
                dispatch(getDraftAction(response.data.drafts));
            })
            .catch(reason=>{
                console.log(reason);
            })
    };
};

export function createNewDraft(jwt, user_id){
    return async dispatch => {
        await create_draft(jwt, {
            user: user_id
        })
        .then(response=>{
            dispatch(openDraftAction(response.data));
        })
        .catch(reason=>{
            console.log("REASON", reason);
        })
    };
}

export function openDraft(jwt, draft_id){
    async dispatch => {
        await get_draft(jwt, draft_id)
            .then(response=>{
                dispatch(openDraftAction(response.data));
            })
            .catch(reason=>{
                console.log("REASON", reason);
            });
    };
}


export function updateDraft(jwt, draft_id, data){
    return async dispatch => {
        await update_draft(jwt, draft_id, data)
            .then(response=>{
                dispatch(updateDraftAction(response.data));
            })
            .catch(reason=>{
                console.log("REASON", reason);
            });
    };
}

export function closeDraft(){
    return async dispatch =>{
        dispatch(closeDraftAction);
    }
}