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


export function getDrafts(user_id){
    return async dispatch => {
        await me(user_id)
            .then(response=>{
                dispatch(getDraftAction(response.data.drafts));
            })
            .catch(reason=>{
                console.log(reason);
            })
    };
};

export function createNewDraft(user_id){
    return async dispatch => {
        await create_draft({
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

export function openDraft(draft_id){
    async dispatch => {
        await get_draft(draft_id)
            .then(response=>{
                dispatch(openDraftAction(response.data));
            })
            .catch(reason=>{
                console.log("REASON", reason);
            });
    };
}


export function updateDraft(draft_id, data){
    return async dispatch => {
        await update_draft(draft_id, data)
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