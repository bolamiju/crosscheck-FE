import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Activated from "../../asset/activated.svg";

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
    <Div>
      <Container>
        <img src={Activated} alt="activated" />
        <p>Account activated</p>
        <Link to="/" className="link">
          Log in
        </Link>
      </Container>
    </Div>
  );
}

export default AccountVerification;
const Div = styled.div`
  width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* text-align: center; */
`;

const Container = styled.div`
  width: 300px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 8px;
  height: 300px;
  box-shadow: 0px 0px 5px #00000017;
  text-align: center;
  p {
    font-weight: bold;
    font-size: 16px;
  }
  .link {
    text-decoration: none;
    background: #0092e0;
    color: white;
    border-radius: 3px;
    padding: 5px 15px 5px 15px;
  }
`;
