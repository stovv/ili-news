import { SIGN } from "./types";


let initialState = {
    isLoggedIn: false,
    user_id: null,
    jwt: "",
};

function authReducer(state = initialState, action){
    switch (action.type) {
        case SIGN.OUT:{
            return {
                ...state,
                isLoggedIn: false
            };
        }
        case SIGN.IN:{
            return {
                ...state,
                isLoggedIn: true,
                jwt: action.payload.jwt,
                user_id: action.payload.user.id
            };
        }
        default:
            return state;
    }
}

export default authReducer;