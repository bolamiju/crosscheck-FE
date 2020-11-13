import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import DashHeader from "./DashHeader";

function DashboardLayout({ children, history }) {
  const [show, setShow] = useState(false);

  return (
    <Div>
      <aside> {show && <Sidebar />}</aside>

      <section>
        <Sidebar className="sec" history={history} />
      </section>

      <DashHeader setShow={setShow} show={show} />
      <Main>{children}</Main>
    </Div>
  );
}

export default DashboardLayout;
const Div = styled.div`
  aside {
    @media (min-width: 500px) {
      display: none;
    }
  }
  section {
    @media (max-width: 500px) {
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

  @media (max-width: 500px) {
    width: 100%;
  }
`;
