import { SIGN_IN, SIGN_OUT } from "../store/reducers/auth/types";
import { login as loginRequest } from "../api/methods/auth";

function signInAction(data) {
  return {
    type: SIGN_IN,
    payload: data,
  };
}

function signOutAction(signError = {}) {
  return {
    type: SIGN_OUT,
    payload: { signError },
  };
}

export function login(login, password) {
  return async (dispatch) => {
    dispatch(signOutAction());
    await loginRequest(login, password)
      .then((response) => {
        dispatch(signInAction(response.data));
      })
      .catch((reason) => {
        dispatch(signOutAction(reason));
      });
  };
}

export function logout() {
  return async (dispatch) => {
    dispatch(signOutAction());
  };
}
