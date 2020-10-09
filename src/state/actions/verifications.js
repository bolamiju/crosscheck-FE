import axios from "axios";

export const requestVerification = (val) => {
  console.log(val);
  return axios.post(
    `https://croscheck.herokuapp.com/api/v1/verifications/request`,
    val
  );
};
