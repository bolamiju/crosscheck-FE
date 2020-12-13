import * as types from "../actionTypes/users";
import axios from "axios";
import { BASE_URL } from "../constant/constants";

const fetchInstitutes = (payload) => {
  return {
    type: types.FETCH_INSTITUTIONS,
    payload,
  };
};

export const getAllInstitutions = () => (dispatch) => {
  axios
    .get(`${BASE_URL}/api/v1/institutions`)
    .then(({ data }) => {
      dispatch(fetchInstitutes(data.institution));
    })
    .catch((err) => {
      return err;
    });
};
