import * as types from "../actionTypes/users";
import axios from "axios";
import { BASE_URL } from "../constant/constants";

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

const setLocation = (payload) => {
  return {
    type: types.USER_LOCATION,
    payload,
  };
};

export const signUp = (user) =>
  axios.post(`${BASE_URL}/api/v1/users/register`, user);

export const login = (user) =>
  axios.post(`${BASE_URL}/api/v1/users/login`, user);

export const forgotPassword = (email) =>
  axios.post(`${BASE_URL}/api/v1/users/forgot`, email);

export const resetPassword = (token, passwords) =>
  axios.put(`${BASE_URL}/api/v1/users/reset/${token}`, passwords);


export const getGeoInfo = () => async(dispatch)=>{
   await axios.get("https://cors-anywhere.herokuapp.com/https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        dispatch(setLocation(data?.country_name))
      })
      .catch((error) => {
        console.log(error);
      });
  };