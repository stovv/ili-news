import api, { getJwt } from "../connector.react";

export async function login(user, password){
    return api.post('/auth/local', {
        identifier: user,
        password: password,
    });
}

export async function register(email, password, name, secondName){
    return api.post('/auth/local/register', {
        username: email,
        email, name, secondName, password
    });
}

export async function me(userId){
    const jwt = getJwt();
    return api.get(`/users/${userId}`,{
        headers: { 'Authorization': `Bearer ${jwt}`}
    });
}

export async function update_user(userId, data){
    const jwt = getJwt();
    return api.put(`/users/${userId}`, data, {
        headers: { 'Authorization': `Bearer ${jwt}`}
    });
}

export async function get_users(){
    const jwt = getJwt();
    return api.get(`/users`, {
        headers: { 'Authorization': `Bearer ${jwt}`}
    });
}