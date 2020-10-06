import React from "react";
import styled from "styled-components";
import Logo from "../../asset/CrossCheckLogo.png";
import dashboard from "../../asset/dashboard.svg";
import contact from "../../asset/contact.svg";
import logout from "../../asset/logout.svg";
import receipt from "../../asset/receipt.svg";
import newVer from "../../asset/new.svg";
import history from "../../asset/history.svg";

function Sidebar() {
  return (
    <Container>
      <LogoSection>
        <img
          src={Logo}
          alt="crosscheck"
          style={{ width: "150px", height: "30px", marginLeft: "-20px" }}
        />
      </LogoSection>
      <ListSection>
        <ul>
          <span>
            {" "}
            <img src={dashboard} alt="dash" />
            <li>DASHBOARD</li>
          </span>
          <span>
            {" "}
            <img src={newVer} alt="verification" />
            <li>NEW VERIFICATION</li>
          </span>
          <span>
            {" "}
            <img src={history} alt="history" />
            <li>VERIFICATION HISTORY</li>
          </span>
          <span>
            {" "}
            <img src={contact} alt="account" /> <li>MY ACCOUNT</li>
          </span>
          <span>
            {" "}
            <img src={receipt} alt="receipt" />
            <li>RECEIPTS</li>
          </span>
          <span>
            {" "}
            <img src={logout} alt="logout" /> <li>LOGOUT</li>
          </span>
        </ul>
      </ListSection>
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  height: 100vh;
  width: 230px;
  background-color: #0092e0;
`;

const LogoSection = styled.div`
  background: #1e2a36;
  width: 230px;
  height: 70px;
  border-bottom-left-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ListSection = styled.div`
  margin-top: 40px;
  ul {
    list-style-type: none;
    padding-inline-start: 20px !important;
  }
  span {
    padding-bottom: 50px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  li {
    color: white;
    letter-spacing: 0.4px;
    /* font-size: 14px; */
    font: normal normal normal 14px/16px Open Sans;
    letter-spacing: 0.4px;
    color: #ffffff;
    padding-left: 10px;
    opacity: 1;
  }
`;
