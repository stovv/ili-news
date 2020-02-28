import api from './connector.react';


async function getSecurePost(id){
    let token = localStorage.getItem("token") ? localStorage.getItem("token"): "";
    return api.get(`/posts/${id}`, {
        headers: {
            "Authorization": "Bearer " + token
        }
    });
}

async function fetchCategories(){
    return api.get('/categories');
}

async function fetchPosts(){
    return api.get('/posts');
}

export {
    getSecurePost,
    fetchCategories,
    fetchPosts
}