import React from "react";
import { useRouteMatch } from "react-router-dom";
import DashboardContent from "./DashboardContent";
import NewVerification from "./NewVerifications";
import NewTranscript from "./NewTranscript";

const MainContent = (props) => {
  const {
    match: { params },
    history,
  } = props;

  let route = useRouteMatch();
  return (
    // <DashboardLayout>
    <>
      {" "}
      {route && route.url === "/new" ? (
        <NewVerification />
      ) : route && route.url === "/transcript" ? (
        <NewTranscript />
      ) : (
        <DashboardContent history={history} />
      )}
    </>
  );
};

export default MainContent;
