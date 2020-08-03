import {SING_IN, SING_OUT, SAVE_CLIENT_IP} from "../tools/constants";


let initialState = {
    isLoggedIn: false,
    user_id: null,
    jwt: "",
    ip: ""
};

// if (typeof window !== "undefined") {
//     const authCookie = getCookie('auth');
//     if (authCookie) {
//         initialState = JSON.parse(decodeURIComponent(authCookie));
//     }
// }


function authReducer(state = initialState, action){
   switch (action.type) {
       case SING_OUT:{
           return {
               ...state,
               isLoggedIn: false
           };
       }
       case SING_IN:{
           return {
               ...state,
               isLoggedIn: true,
               jwt: action.payload.jwt,
               user_id: action.payload.user.id
           };
       }
       case SAVE_CLIENT_IP:{
           return {
               ...state,
               ip: action.payload.ip
           };
       }
       default:
           return state;
   }
}

export default authReducer;