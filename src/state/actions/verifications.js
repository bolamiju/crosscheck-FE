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

export const changeSchCard = (payload) => {
  return {
    type: types.CHANGE_SCH_CARD,
    payload,
  };
};

export const selectSchool = (payload) => {
  return {
    type: types.SCH_SELECTED,
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
