import axios from "axios";
import * as types from "../actionTypes/verifications";
import { BASE_URL } from "../constant/constants";

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

export const messages = (payload) => {
  return {
    type: types.GET_MESSAGES,
    payload,
  };
};
export const delMessages = (payload) => {
  return {
    type: types.DELETE_MESSAGES,
    payload,
  };
};

export const requestVerification = (val,tranId) => {
  return axios.post(`${BASE_URL}/api/v1/verifications/request/${tranId}`, val);
};

export const getUserVerification = (email) => async (dispatch) => {
  await axios
    .get(`${BASE_URL}/api/v1/verifications/byemail/${email}`)
    .then(({ data }) => {
      dispatch(getOneUserVerifications(data.verifications));
    })
    .catch((err) => {
      return err
    });
};
export const getUserTranscript = (email) => async (dispatch) => {
  await axios
    .get(`${BASE_URL}/api/v1/transcript/byemail/${email}`)
    .then(({ data }) => {
      dispatch(getOneUserTranscript(data.transcripts));
    })
    .catch((err) => {
      return err
    });
};

export const sendMessage = (message) =>
  axios.post(`${BASE_URL}/api/v1/message/sendMessage`, message);

export const getUserMessages = (email) => async (dispatch) => {
  await axios
    .get(`${BASE_URL}/api/v1/message/${email}`)
    .then(({ data }) => {
      dispatch(messages(data.message));
    })
    .catch((err) => {
      return err
    });
};

export const deleteMessage = (id) => async (dispatch) => {
  await axios
    .delete(`${BASE_URL}/api/v1/message/${id}`)
    .then(({ data }) => {
      dispatch(delMessages(data.message));
    })
    .catch((err) => {
      return err
    });
};
