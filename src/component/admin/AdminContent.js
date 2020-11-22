import React from "react";
import { useRouteMatch } from "react-router-dom";
import Overview from "./Overview";

import styled from "styled-components";

const AdminContent = (props) => {
  const {
    match: { params },
    history,
  } = props;
  let route = useRouteMatch();
  return (
    <div>
      <>
        {/* {" "}
          {route && route.url === "/new" ? (
            <NewVerification />
          ) : route && route.url === "/transcript" ? (
            <NewTranscript />
          ) : ( */}
        <Overview history={history} />
        {/* )} */}
      </>
    </div>
  );
};

export default AdminContent;
