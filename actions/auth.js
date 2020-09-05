import {REGISTER, SIGN} from "../store/auth/types";
import { Auth } from '../api';


// return structures
const signOutAction = {
    type: SIGN.OUT
};

function signInAction(data){
    return {
        type: SIGN.IN,
        payload: data
    };
}


// dispatchers
export function loginAction(loginData){
    return async dispatch => {
        dispatch(signOutAction);
        await Auth.login(loginData.login, loginData.password)
            .then(response=>{
                dispatch(signInAction(response.data));
            })
            .catch(reason=>{
                console.log('Something wrong with sign in ->', reason);
                dispatch(signOutAction);
            })
    };
}

export function registerAction(registerData){
    return async dispatch => {
        await Auth.register(registerData.email, registerData.password, registerData.name, registerData.secondName)
            .then(response =>{
                dispatch({
                    type: REGISTER.OK,
                    payload: response.data
                });
            })
            .catch(reason => {
                dispatch({
                    type: REGISTER.BAD,
                    payload: reason.response
                });
            })
    }
}

export function setRegisterBad(){
    return async dispatch => {
        dispatch({
            type: REGISTER.STOP
        });
    }
}


export function logout(){
    return async dispatch => {
        dispatch(signOutAction)
    }
}
