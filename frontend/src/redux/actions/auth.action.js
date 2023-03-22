import axios from "axios";
import { logError } from "../utils";
import { resetError } from "./error.action";
import { setError } from "./index";
import {  setPreferences } from "./preference.action";

export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN";
export const SET_ERROR = "SET_ERROR";
export const SET_USER = "SET_USER";
export const LOGOUT = "LOGOUT";
export const RESET = "RESET";

export const setAuthToken = (authToken) => ({
  type: SET_AUTH_TOKEN,
  authToken,
});

export const setUser = (user) => ({
  type: SET_USER,
  user,
});

export const logout = () => ({
  type: LOGOUT,
});

export const resetAuth = () => ({
  type: RESET,
});

export const thunkSignUp =
  ({ name, email, password,password_confirmation, from }) =>
  async (dispatch) => {
    const serverUrl = `${process.env.REACT_APP_SERVER_URL}/register`;
    try {
      dispatch(resetError());
      const response = await axios.post(serverUrl, { name, email, password, password_confirmation });
      if(response.data.status==="success"){
      console.log(response);
    }else if(response.data.status==="error"){
      dispatch(setError(response.data.errors))
    }
    } catch (error) {
      logError(error, "auth.actions.thunkSignUp");
    }
  };

export const thunkLogin =
  ({ email, password, from }) =>
  async (dispatch) => {
    const serverUrl = `${process.env.REACT_APP_SERVER_URL}/login`;
    try {
      dispatch(resetError());
      const response = await axios.post(serverUrl, { email, password });
      if(response.data.status==="success"){
        dispatch(setUser(response.data.data));
        dispatch(setAuthToken(response.data.data._token));
        const {country,language,category} = response.data.data
        dispatch(setPreferences({country,category,language}))
      }else if(response.data.status==="error"){
        dispatch(setError(response.data.errors))
      }
     
    } catch (error) {
      logError(error, "auth.actions.thunkLogin");
    }
  };
