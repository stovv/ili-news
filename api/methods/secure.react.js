import api, {getJwt} from "../connector.react";

export async function getSecurePost(id, jwt){
    let token = getJwt();
    return api.get(`/posts/${id}`, {
        headers: { 'Authorization': `Bearer ${jwt}`}
    });
}
