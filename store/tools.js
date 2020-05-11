
export function setStorage(key, value){
    if (typeof window !== 'undefined' && typeof sessionStorage !== "undefined"){
        sessionStorage.setItem(key, value);
    }
}

export function getStorage(key){
    if (typeof window !== 'undefined' && typeof sessionStorage !== "undefined"){
        return sessionStorage.getItem(key);
    }
    return null
}