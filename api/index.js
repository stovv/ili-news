import api from './connector.react';

async function getSecurePost(id){
    let token = localStorage.getItem("token") ? localStorage.getItem("token"): "";
    return api.get(`/posts/${id}`, {
        headers: {
            "Authorization": "Bearer " + token
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
        headers: { 'Content-Type': 'multipart/form-data' },
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


async function me(jwt, user_id){
    return api.get(`/users/${user_id}`,{
        headers: {
            "Authorization": "Bearer " + jwt
        }
    });
}

async function create_draft(jwt, data){
    return api.post("/drafts",data,{ 
        headers: { "Authorization": "Bearer " + jwt}
    });
}

async function update_draft(jwt, id, data){
    return api.put(`/drafts/${id}`,data,{ 
        headers: { "Authorization": "Bearer " + jwt}
    });
}

async function get_draft(jwt, id){
    return api.get(`/drafts/${id}`,{ 
        headers: { "Authorization": "Bearer " + jwt}
    });
}

async function update_user(jwt, user_id, data){
    return api.put(`/users/${user_id}`, data, {
        headers: { "Authorization": "Bearer " + jwt}
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