import {REGISTER, SIGN} from "./types";


let initialState = {
    isLoggedIn: false,
    userId: null,
    inRegister: false,
    registered: false,
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
                userId: action.payload.user.id
            };
        }
        case REGISTER.OK:{
            return {
                ...state,
                inRegister: true,
                userId: action.payload.user.id,
                jwt: action.payload.jwt,
                registered: true
            }
        }
        case REGISTER.BAD:{
            return {
                ...state,
                inRegister: true,
                registered: false
            }
        }
        case REGISTER.STOP:{
            return {
                ...state,
                inRegister: false,
                registered: false
            }
        }
        default:
            return state;
    }
}

export default authReducer;