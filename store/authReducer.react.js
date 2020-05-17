import {SING_IN, SING_OUT, SAVE_CLIENT_IP} from "../tools/constants";
import {getCookie, setCookie, removeCookie} from '../tools/cookie.react';


let initialState = {
    isLoggedIn: false,
    user_id: null,
    jwt: "",
    ip: ""
};

if (typeof window !== "undefined") {
    const authCookie = getCookie('auth');
    if (authCookie) {
        initialState = JSON.parse(decodeURIComponent(authCookie));
    }
}


function authReducer(state, action){
   switch (action.type) {
       case SING_OUT:{
           removeCookie("auth");
           return {
               ...state,
               isLoggedIn: false
           };
       }
       case SING_IN:{
           const authObj = {
               ...state,
               isLoggedIn: true,
               jwt: action.payload.jwt,
               user_id: action.payload.user.id
           };
           setCookie("auth", authObj);
           return authObj;
       }
       case SAVE_CLIENT_IP:{
           const authObj = {
               ...state,
               ip: action.payload.ip
           };
           setCookie("auth", authObj);
           return authObj;
       }
       default:
           return initialState;
   }
};

export default authReducer;