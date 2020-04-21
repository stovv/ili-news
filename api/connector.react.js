import axios from 'axios';
import { BACKEND_URL } from '../constants';
import {getCookie} from "../tools/cookie.react";

const base_api = axios.create({
    baseURL: BACKEND_URL,
    headers:{ 'Content-Type': 'application/json'}
});

const api = {
    ql: (query, additional_data = null) => {
        return base_api.post('/graphql', {
                ...additional_data,
                query: query,
            },
            {
                transformResponse: [function (data) {
                    return JSON.parse(data).data;
                }]
            }
        )
    },
    post: base_api.post,
    get: base_api.get,
    put: base_api.put, 
    simple_get: axios.get,
    simple_post: axios.post
}

function getJwt(){
    let auth = getCookie('auth');
    if (auth) {
        auth = JSON.parse(decodeURIComponent(auth));
        return auth.jwt ? auth.jwt : null;
    }else return null;
}

export {
    base_api,
    api,
    getJwt
}

export default api;