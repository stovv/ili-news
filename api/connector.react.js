import axios from 'axios';

const base_api = axios.create({
    baseURL: process.env.BACKEND_URL || 'http://localhost:1337'
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
    put: base_api.put
}

export default api;