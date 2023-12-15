import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Activated from "../../asset/activated.svg";
import { BASE_URL } from "../../state/constant/constants";

function AccountVerification({ match, location }) {
  const {
    params: { email },
  } = match;
  useEffect(() => {
    axios.put(`${BASE_URL}/api/v1/users/${email}`).then((data) => {
      return data;
    });
  }, [email]);

  return (
    <Div>
      <Container>
        <img src={Activated} alt="activated" />
        <p>Account activated</p>
        <Link to="/login" className="link">
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
  @media (max-width: 400px) {
    width: 300px;
  }
  @media (max-width: 500px) {
    width: 400px;
  }
  /* text-align: center; */
`;

const Container = styled.div`
  width: 400px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 25px;
  height: 330px;
  box-shadow: 0px 0px 5px #00000017;
  text-align: center;
  @media (max-width: 400px) {
    width: 300px;
    img {
      width: 150px;
    }
  }
  @media (max-width: 500px) {
    width: 350px;
    img {
      width: 180px;
    }
  }
  p {
    text-transform: capitalize;
    font-size: 24px;
    font-family: "poppins";
    letter-spacing: 0px;
    color: #707070;
    opacity: 1;
    font-weight: normal;
  }
  .link {
    font-family: "poppins";
    font-weight: bold;
    text-transform: capitalize;
    text-decoration: none;
    background: #0092e0;
    letter-spacing: 0.32px;
    color: #ffffff;
    opacity: 1;
    font-size: 14px;
    border-radius: 3px;
    padding: 15px 25px;
    border-radius: 30px;
  }
`;
