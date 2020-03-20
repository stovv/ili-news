import {SING_IN, SING_OUT} from "../tools/constants";
import {getCookie, setCookie, removeCookie} from '../tools/cookie.react';


let initialState;
if (typeof localStorage !== "undefined") {
    const authCookie = getCookie('auth');

    if (authCookie) {
        initialState = JSON.parse(decodeURIComponent(authCookie));
    } else {
        initialState = {
            isLoggedIn: false,
            user_id: null,
            jsw: ""
        }
    }
} else {
    initialState = {
        isLoggedIn: false,
        user_id: null,
        jwt: ""
    };
}


function authReducer(state, action){
   switch (action.type) {
       case SING_OUT:
           removeCookie("auth");
           return {
               isLoggedIn: false
           };

       case SING_IN:
           const authObj = {
               isLoggedIn: true,
               jwt: action.payload.jwt,
               user_id: action.payload.user.id
           };
           setCookie("auth", authObj);
           return authObj;
       default:
           return initialState;
   }
};

export default authReducer;