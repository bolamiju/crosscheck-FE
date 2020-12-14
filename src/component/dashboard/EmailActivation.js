import React from 'react';
import Avatar from "../../asset/Avatar.png";
import styled from 'styled-components';

const EmailActivation = () => {
  return (
    <EmailWrapper>
      <button>verify email address</button>
    </EmailWrapper>
  )
};

const EmailWrapper = styled.div`
background: var(--mainWhite);
height: 100vh;
padding: 3rem 5rem;
button {
  /* font-family: MontserratRegular; */
  font-weight: normal;
  background: #0092E0 0% 0% no-repeat padding-box;
  border-radius: 10px;
  opacity: 0.7;
  padding: 15px 25px;
  border: none;
  letter-spacing: 0.44px;
  color: #FFFFFF;
  text-transform: capitalize;
  font-size: 1rem;
  text-align: center;
}
`

export default EmailActivation;
