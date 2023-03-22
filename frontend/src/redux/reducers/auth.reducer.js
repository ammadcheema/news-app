import { SET_AUTH_TOKEN, SET_USER, LOGOUT, RESET } from "../actions";

const preState = {
  user: null,
  authToken: null,
  justLoggedOut: false,
  error:{}
};

const authReducer = (state = preState, action) => {
  Object.freeze(state);
  const stateDup = { ...state };
  const { type, user, authToken } = action;

  switch (type) {
    case RESET:
      window.localStorage.clear("access_token");
      return preState;
    case LOGOUT:
      return { ...preState, justLoggedOut: true };
    case SET_AUTH_TOKEN:
      localStorage.setItem("access_token", authToken);
      return { ...stateDup, authToken, justLoggedOut: false };
    case SET_USER:
      return { ...stateDup, user, justLoggedOut: false };

    default:
      return state;
  }
};

export default authReducer;
