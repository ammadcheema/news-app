import { RESET_ERROR, SET_ERROR } from "../actions";

const preState = {
  error:{},
  isError: false,
};

const errorReducer = (state = preState, action) => {
  Object.freeze(state);
  const stateDup = { ...state };
  const { type, error} = action;

  switch (type) {
      case SET_ERROR:
        return { ...stateDup, error: error, isError: true };
    case RESET_ERROR:
        return { ...stateDup, error: {}, isError: false };
    default:
      return state;
  }
};

export default errorReducer;
