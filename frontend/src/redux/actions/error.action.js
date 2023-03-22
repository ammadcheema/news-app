
import { logError } from "../utils";
export const SET_ERROR = "SET_ERROR";
export const RESET_ERROR = "RESET_ERROR";

export const setError = (errors) => ({
  type: SET_ERROR,
  error:errors,
});

export const resetError = () => ({
    type: RESET_ERROR,
});