
export const loadState = () => {
    if (typeof window !== 'undefined' && typeof localStorage !== "undefined") {
        try {
            const serializedState = localStorage.getItem('state');
            if (serializedState === null) {
                return undefined;
            }
            return JSON.parse(serializedState);
        } catch (err) {
            return undefined;
        }
    }
};


export const saveState = (state) => {
    if (typeof window !== 'undefined' && typeof localStorage !== "undefined"){
        try {
            const serializedState = JSON.stringify(state);
            localStorage.setItem('state', serializedState);
        } catch {
            // ignore write errors
        }
    }
};

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