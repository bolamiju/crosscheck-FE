import * as types from "../actionTypes/users";
import axios from "axios";

const fetchInstitutes = (payload) => {
  return {
    type: types.FETCH_INSTITUTIONS,
    payload,
  };
};

export const getAllInstitutions = () => (dispatch) => {
  axios.get(`http://localhost:5000/api/v1/institutions`).then(({ data }) => {
    console.log("see insti", data);
    dispatch(fetchInstitutes(data.institution));
  });
};
