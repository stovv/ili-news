import { SIGN_IN, SIGN_OUT } from "./types";

let initialState = {
  isLoggedIn: false,
  userId: null,
  userType: null,
  avatar: {},
  name: null,
  secondName: null,
  jwt: "",
  signError: {},
};

function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_OUT: {
      return {
        ...state,
        isLoggedIn: false,
        jwt: "",
        userId: null,
        signError: action.payload.signError,
      };
    }
    case SIGN_IN: {
      return {
        ...state,
        isLoggedIn: true,
        jwt: action.payload.jwt,
        userType: action.payload.user.role.id,
        avatar: action.payload.user.avatar,
        name: action.payload.user.name,
        secondName: action.payload.user.secondName,
        userId: action.payload.user.id,
      };
    }
    default:
      return state;
  }
}

export default AuthReducer;
