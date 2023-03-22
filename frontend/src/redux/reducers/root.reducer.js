import authReducer from "./auth.reducer";
import { combineReducers } from "redux";
import preferenceReducer from "./preference.reducer";
import modalReducer from "./modal.reducer";
import errorReducer from "./error.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  preference: preferenceReducer,
  modal: modalReducer,
  error: errorReducer,
});

export default rootReducer;
