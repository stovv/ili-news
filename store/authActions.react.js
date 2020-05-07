import {RESTORE_AUTH_STATE, SING_IN, SING_OUT, SAVE_CLIENT_IP} from "../tools/constants";
import { Auth } from '../api';

function signInAction(data){
   return {
       type: SING_IN,
       payload: data
   };
};

export function saveIpAction(ip) {
    return {
      type: SAVE_CLIENT_IP,
      payload: {
          ip
      }
    };
};


const signOutAction = {
    type: SING_OUT
};


export function loginAction(loginData){
   return async dispatch => {
        dispatch(signOutAction);
        console.log(loginData);
        await Auth.login(loginData.login, loginData.password)
            .then(response=>{
                dispatch(signInAction(response.data));
            })
            .catch(reason=>{
                console.log('ERROR', reason);
                dispatch(signOutAction);
            })
   };
};


export function signUp(signUpDetails){
   return async dispatch => {
       try{
           dispatch(deAuthenticateAction());
           // Signup code. And storing data in result variable
           dispatch(authenticateAction(result));


       }catch (e) {
           dispatch(deAuthenticateAction());
       }
   };
};


export function logout(){
   return async dispatch => {
       dispatch(signOutAction())
   }
};
