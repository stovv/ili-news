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


export {
    getSecurePost,
    fetchCategories,
    fetchPosts,
    getPost,
    getCategory,
    uploadFile,
    getExternalImage
}