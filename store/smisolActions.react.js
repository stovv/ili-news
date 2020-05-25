import {GET_DRAFTS, OPEN_DRAFT, UPDATE_DRAFT, CLOSE_DRAFT} from '../tools/constants';
import { SMISOL } from './types.react';
import {Redactor, Auth, Public} from '../api';


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
        await Auth.me(user_id)
            .then(response=>{
                dispatch(getDraftAction(response.data.drafts));
            })
            .catch(reason=>{
                console.log(reason);
            })
    };
};

export function createNewDraft(){
    return async dispatch => {
        await Redactor.create_draft()
            .then(response=>{
                dispatch(openDraftAction(response.data));
            })
            .catch(reason=>{
                console.log("REASON", reason);
            })
    };
}

export function openDraft(draft_id){
    return async dispatch => {
        await Redactor.get_draft(draft_id)
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
        await Redactor.update_draft(draft_id, data)
            .then(response=>{
                dispatch(updateDraftAction(response.data));
            })
            .catch(reason=>{
                console.log("REASON", reason);
            });
    };
}

export function draftToPost(post_id, draft_id, data){
    return async dispatch => {
        await Redactor.update_post(post_id, data)
            .then(response=>{
                Redactor.remove_draft(draft_id)
                    .then(response=>{
                        window.location.href=`/post/${post_id}`;
                        dispatch(closeDraftAction);
                    })
            })
            .catch(reason=>{
                console.log("REASON", reason);
            });
    };
}


export function postToDraft(post_id){
    return async dispatch => {
        await Public.getPost(post_id)
            .then(async post_response=>{
                console.log("POST RESP", post_response);
                await Redactor.create_draft()
                    .then(async draft_response=>{
                        console.log("DRAFT RESP", draft_response);
                        let draft_data = {
                            title: post_response.data.post.title,
                            blocks: post_response.data.post.blocks,
                            description: post_response.data.post.description,
                            event_date: post_response.data.post.event_date,
                            old_authors: post_response.data.post.old_authors,
                            authors: post_response.data.post.authors,
                            rubric: post_response.data.post.rubric.id,
                            cover: post_response.data.post.cover.id,
                            exists_post_id: post_id
                        };
                        console.log("NEW DRAFT DATA", draft_data);
                        await Redactor.update_draft(draft_response.data.id, draft_data)
                            .then(response=>{
                                dispatch(openDraftAction(response.data));
                            })
                            .catch(reason=>{
                                console.log("REASON", reason);
                            });
                    })
                    .catch(reason=>{
                        console.log("REASON", reason);
                    })
            })
            .catch(reason => {console.log("REASON", reason);})
    };
}


export function closeDraft(){
    return async dispatch =>{
        dispatch(closeDraftAction);
    }
}