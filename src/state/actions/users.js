import * as types from "../actionTypes/users";
import axios from "axios";

export const setLoading = (payload) => {
  return {
    type: types.SET_LOADING,
    payload,
  };
};

export const setErrorMessage = (payload) => {
  return {
    type: types.SET_ERROR,
    payload,
  };
};
export const signUp = (user) =>
  axios.post("http://localhost:5000/api/v1/users/register", user);

export const login = (user) =>
  axios.post(`https://croscheck.herokuapp.com/api/v1/users/login`, user);
