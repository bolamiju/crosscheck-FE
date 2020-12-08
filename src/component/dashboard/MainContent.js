import React from "react";
import { useRouteMatch } from "react-router-dom";
import DashboardContent from "./DashboardContent";
import NewVerification from "./NewVerifications";
import NewTranscript from "./NewTranscript";
import VerificationHistory from "./VerificationHistory";

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
      ) : route && route.url === "/verification" ? (
          <VerificationHistory />
      ) : (
        <DashboardContent history={history} />
      )}
    </>
  );
};

export default MainContent;
