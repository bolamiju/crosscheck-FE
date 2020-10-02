import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AccountVerification({ match, location }) {
  const {
    params: { email },
  } = match;
  console.log("EMAIL", email);
  useEffect(() => {
    axios
      .put(`https://croscheck.herokuapp.com/api/v1/users/${email}`)
      .then((data) => {
        console.log(data);
      });
  }, [email]);

  return (
    <div>
      <h2>Account verification Success</h2>
      <p>
        <Link to="/">Log in</Link>
      </p>
    </div>
  );
}

export default AccountVerification;
