import api, { getJwt } from "../connector.react";

export async function get_draft(id){
    const jwt = getJwt();
    return api.get(`/drafts/${id}`,{
        headers: { 'Authorization': `Bearer ${jwt}`}
    });
}

export async function update_draft(id, data){
    const jwt = getJwt();
    return api.put(`/drafts/${id}`,data,{
        headers: { 'Authorization': `Bearer ${jwt}`}
    });
}

export async function remove_draft(id){
    const jwt = getJwt();
    return api.delete(`/drafts/${id}`,{
        headers: { 'Authorization': `Bearer ${jwt}`}
    });
}

export async function update_post(id, data){
    const jwt = getJwt();
    return api.put(`/posts/${id}`,data,{
        headers: { 'Authorization': `Bearer ${jwt}`}
    });
}

export async function create_draft(data){
    const jwt = getJwt();
    return api.post("/drafts",data,{
        headers: { 'Authorization': `Bearer ${jwt}`}
    });
}
