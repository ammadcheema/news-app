import { SET_MODAL_OPEN, SET_MODAL_CLOSE } from "../actions";

const preState = {
  open: false,
};

const modalReducer = (state = preState, action) => {
  Object.freeze(state);
  const stateDup = { ...state };
  const { type } = action;
  switch (type) {
    case SET_MODAL_OPEN:
      return { ...stateDup, open: true };
    case SET_MODAL_CLOSE:
      return { ...stateDup, open: false };

    default:
      return state;
  }
};

export default modalReducer;
