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

export const requestVerification = (val) => {
  console.log(val);
  return axios.post(`${BASE_URL}/api/v1/verifications/request`, val);
};

export const getUserVerification = (email) => async (dispatch) => {
  await axios
    .get(`${BASE_URL}/api/v1/verifications/byemail/${email}`)
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
    .get(`${BASE_URL}/api/v1/transcript/byemail/${email}`)
    .then(({ data }) => {
      console.log("transcript data", data);
      dispatch(getOneUserTranscript(data.transcripts));
    })
    .catch((err) => {
      console.log("error", err);
    });
};

export const getAllMessages = (message) =>
  axios
    .post(`${BASE_URL}/api/v1/message/sendMessage`, message)



export const getMessages = (value) => async(dispatch) => {
  await axios
    .get(`${BASE_URL}/api/v1/message`, value) 
    .then(({ data }) => {
      console.log("messages", data);
      dispatch(messages(data.message))
    })
    .catch((err) => {
    console.log("error", err)
  })
}

export const deleteMessages = (id) => async(dispatch) => {
  await axios
    .delete(`${BASE_URL}/api/v1/message/${id}`) 
    .then(({ data }) => {
      console.log("deleted", data);
      dispatch(delMessages(data.message))
    })
    .catch((err) => {
    console.log("error", err)
  })
}


    // http://localhost:5000