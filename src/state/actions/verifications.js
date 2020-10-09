import axios from "axios";

export const requestVerification = (val) => {
  console.log(val);
  return axios.post(`http://localhost:5000/api/v1/verifications/request`, val);
};
