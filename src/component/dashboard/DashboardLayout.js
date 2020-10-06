import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import DashHeader from "./DashHeader";

function DashboardLayout({ children }) {
  return (
    <div>
      <Sidebar />
      <DashHeader />
      <Main>{children}</Main>
    </div>
  );
}

export default DashboardLayout;

const Main = styled.main`
  position: fixed;
  right: 0;
  height: calc(100% - 70px);
  bottom: 0;
  width: calc(100% - 230px);
`;
