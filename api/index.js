import api from './connector.react';
import {getCookie} from '../tools/cookie.react';

function getJwt(){
    var auth = getCookie('auth');
    if (auth) {
        auth = JSON.parse(decodeURIComponent(auth));
        return auth.jwt ? auth.jwt : null;
    }else return null;
}

async function getSecurePost(id, jwt){
    let token = localStorage.getItem("token") ? localStorage.getItem("token"): "";
    return api.get(`/posts/${id}`, {
        headers: {
            'Authorization': `Bearer ${jwt}`
        }
    });
}

async function fetchCategories(fields = ['id', 'slug', 'updated_at']){
    return api.ql(`
        query{
            categories{
                ${fields.join(',\n')}
            }
        }
        `);
}

async function fetchTop(){
    return api.ql(`
        query{
            tops{
                post{
                    id,
                    title,
                    cover{
                        url
                    },
                    tag{
                        name,
                        color
                    }
                }
            }
        }
        `);
}

async function fetchPosts(fields = ['id', 'slug', 'updated_at']){
    return api.ql(`
        query{
            posts{
                ${fields.join(',\n')}
            }
        }
    `);
}

async function getPost(id){
    return api.get(`/posts/${id}`)
}

async function getCategory(id){
    return api.get(`/categories/${id}`)
}


async function uploadFile(file){
    const formData = new FormData();
    formData.append('files', file);

    return api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${jwt}`
                },
    })
}

async function getExternalImage(imageUrl, imageName="externalImage.jpg") {
    const response = await api.simple_get(imageUrl, {
      responseType: 'blob',
    });
    const mimeType = response.headers['content-type'];
    const imageFile = new File([response.data], imageName, { type: mimeType });
    return imageFile;
}

async function login(user, password){
    return api.post('/auth/local', {
        identifier: user,
        password: password,
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}


async function me(user_id){
    const jwt = getJwt();
    return api.get(`/users/${user_id}`,{
        headers: {
            'Authorization': `Bearer ${jwt}`
        }
    });
}

async function create_draft(data){
    const jwt = getJwt();
    return api.post("/drafts",data,{ 
        headers: { 'Authorization': `Bearer ${jwt}`}
    });
}

async function update_draft(id, data){
    const jwt = getJwt();
    return api.put(`/drafts/${id}`,data,{ 
        headers: { 'Authorization': `Bearer ${jwt}`}
    });
}

async function get_draft(id){
    const jwt = getJwt();
    return api.get(`/drafts/${id}`,{ 
        headers: { 'Authorization': `Bearer ${jwt}`}
    });
}

async function update_user(user_id, data){
    const jwt = getJwt();
    return api.put(`/users/${user_id}`, data, {
        headers: { 'Authorization': `Bearer ${jwt}`}
    });
}


export {
    getPost,
    getCategory,
    uploadFile,
    getExternalImage,
    login,
    me,
    create_draft,
    fetchCategories,
    fetchPosts,
    fetchTop,
    update_user,
    update_draft,
    get_draft
}