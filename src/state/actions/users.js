import * as types from "../actionTypes/users";
import axios from "axios";

export const setLoading = (payload) => {
  return {
    type: types.SET_LOADING,
    payload,
  };
};

export const setRegisterError = (payload) => {
  return {
    type: types.SET_ERROR,
    payload,
  };
};

export const setLoginError = (payload) => {
  return {
    type: types.LOGIN_ERROR,
    payload,
  };
};

export const setUser = (payload) => {
  return {
    type: types.SET_USER,
    payload,
  };
};

export const signUp = (user) =>
  axios.post("https://croscheck.herokuapp.com/api/v1/users/register", user);

export const login = (user) =>
  axios.post(`https://croscheck.herokuapp.com/api/v1/users/login`, user);

export const forgotPassword = (email) =>
  axios.post(`https://croscheck.herokuapp.com/api/v1/users/forgot`, email);

export const resetPassword = (token, passwords) =>
  axios.put(
    `https://croscheck.herokuapp.com/api/v1/users/reset/${token}`,
    passwords
  );
