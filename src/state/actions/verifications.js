import axios from "axios";
import * as types from "../actionTypes/verifications";

export const addVerificationList = (payload) => {
  return {
    type: types.ADD_VERIFICATIONS,
    payload,
  };
};

export const addTranscript = (payload) => {
  return {
    type: types.ADD_TRANSCRIPT,
    payload,
  };
};

export const deleteVerification = (payload) => {
  return {
    type: types.DELETE_VERIFICATION,
    payload,
  };
};

export const getOneUserVerifications = (payload) => {
  return {
    type: types.USER_VERIFICATIONS,
    payload,
  };
};
export const selectSchool = (payload) => {
  return {
    type: types.SELECT_SCHOOL,
    payload,
  };
};
export const getOneUserTranscript = (payload) => {
  return {
    type: types.GET_TRANSCRIPT,
    payload,
  };
};

export const requestVerification = (val) => {
  console.log(val);
  return axios.post(`http://localhost:5000/api/v1/verifications/request`, val);
};

export const getUserVerification = (email) => async (dispatch) => {
  await axios
    .get(`https://croscheck.herokuapp.com/api/v1/verifications/byemail/${email}`)
    .then(({ data }) => {
      console.log("verifications data", data);
      dispatch(getOneUserVerifications(data.verifications));
    })
    .catch((err) => {
      console.log("error", err);
    });
};
export const getUserTranscript = (email) => async (dispatch) => {
  await axios
    .get(`https://croscheck.herokuapp.com/api/v1/transcript/byemail/${email}`)
    .then(({ data }) => {
      console.log("transcript data", data);
      dispatch(getOneUserTranscript(data.transcripts));
    })
    .catch((err) => {
      console.log("error", err);
    });
};

