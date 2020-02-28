import axios from 'axios';

const api = axios.create({
    baseURL: process.env.BACKEND_URL || 'localhost:1337'
});

export default api;