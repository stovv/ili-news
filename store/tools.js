export const loadState = () => {
    if (typeof window !== 'undefined' && typeof localStorage !== "undefined") {
        try {
            const serializedState = localStorage.getItem('state');
            if (serializedState === null) {
                return undefined;
            }
            return JSON.parse(serializedState);
        } catch (err) {
            if ( process.env.NODE_ENV === "development" ) console.log("Something wrong with load redux state -> ", e);
            return undefined;
        }
    }
};


export const saveState = (state) => {
    if (typeof window !== 'undefined' && typeof localStorage !== "undefined"){
        try {
            const serializedState = JSON.stringify(state);
            localStorage.setItem('state', serializedState);
        } catch(e){
            if ( process.env.NODE_ENV === "development" ) console.log("Something wrong with save redux state -> ", e);
        }
    }
};
