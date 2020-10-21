import axios from 'axios';
//import { store } from "../store";

const base_api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND,
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
    delete: base_api.delete,
    get: base_api.get,
    put: base_api.put, 
    simple_get: axios.get,
    simple_post: axios.post
}

function getJwt(){
    // try {
    //     return store.getState().auth.jwt;
    // }catch (e) {
    //     return null;
    // }
    return null;
}

export {
    base_api,
    api,
    getJwt
}

export default api;