import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import DashHeader from "./DashHeader";

function DashboardLayout({ children }) {
  const [show, setShow] = useState(false);
  console.log("show", show);

  return (
    <Div>
      <aside> {show && <Sidebar />}</aside>

      <section>
        <Sidebar className="sec" />
      </section>

      <DashHeader setShow={setShow} show={show} />
      <Main>{children}</Main>
    </Div>
  );
}

export default DashboardLayout;
const Div = styled.div`
  aside {
    @media (min-width: 402px) {
      display: none;
    }
  }
  section {
    @media (max-width: 400px) {
      display: none !important;
    }
  }
`;

const Main = styled.main`
  position: fixed;
  right: 0;
  height: calc(100% - 70px);
  bottom: 0;
  width: calc(100% - 230px);

  @media (max-width: 400px) {
    width: 100%;
  }
`;
