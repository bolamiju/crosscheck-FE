import axios from "axios";
import * as types from "../actionTypes/verifications";

export const addVerificationList = (payload) => {
  return {
    type: types.ADD_VERIFICATIONS,
    payload,
  };
};

export const deleteVerification = (payload) => {
  return {
    type: types.DELETE_VERIFICATION,
    payload,
  };
};

export const requestVerification = (val) => {
  console.log(val);
  return axios.post(
    `https://croscheck.herokuapp.com/api/v1/verifications/request`,
    val
  );
};
