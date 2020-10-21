import api, {getJwt} from "../connector.react";

export async function uploadFile(file){
    const jwt = getJwt();

    const formData = new FormData();
    formData.append('files', file);

    return api.post('/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${jwt}`
        },
    })
}

export async function uploadByFormData(formData){
    const jwt = getJwt();
    return api.post('/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${jwt}`
        },
    })
}

export async function getExternalImage(imageUrl, imageName) {
    const response = await api.simple_get(imageUrl, {
        responseType: 'blob',
    });
    const mimeType = response.headers['content-type'];
    return new File([response.data], imageName, { type: mimeType });
}