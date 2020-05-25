import api, { getJwt } from "../connector.react";

export async function login(user, password){
    return api.post('/auth/local', {
        identifier: user,
        password: password,
    });
}

export async function me(user_id){
    const jwt = getJwt();
    return api.get(`/users/${user_id}`,{
        headers: { 'Authorization': `Bearer ${jwt}`}
    });
}

export async function update_user(user_id, data){
    const jwt = getJwt();
    return api.put(`/users/${user_id}`, data, {
        headers: { 'Authorization': `Bearer ${jwt}`}
    });
}

export async function get_users(){
    const jwt = getJwt();
    return api.get(`/users`, {
        headers: { 'Authorization': `Bearer ${jwt}`}
    });
}