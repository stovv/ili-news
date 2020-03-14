import axios from 'axios';
import {BACKEND_URL} from '../tools/constants';

const base_api = axios.create({
    baseURL: BACKEND_URL
});

const api = {
    ql: (query, additional_data = null) => {
        return base_api.post('/graphql', {
            ...additional_data,
            query: query
        })
    },
    post: base_api.post,
    get: base_api.get,
    put: base_api.put, 
    simple_get: axios.get,
    simple_post: axios.post
}

export default api;