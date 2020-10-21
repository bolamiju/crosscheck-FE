import React from "react";
import styled from "styled-components";
import TopHeader from "./TopHeader";

const DashHeader = () => {
  return (
    <Header className="dash-header">
      <TopHeader />
    </Header>
  );
};

export default DashHeader;

const Header = styled.div`
  width: calc(100% - 230px);
  top: 0;
  right: 0;
  position: fixed;
  font-family: "Rubik", sans-serif;
  z-index: 1;
  @media (max-width: 400px) {
    width: 100%;
  }
`;
