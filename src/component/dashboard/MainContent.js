import React from "react";
import { useRouteMatch } from "react-router-dom";
import DashboardContent from "./DashboardContent";
import NewVerification from "./NewVerifications";

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
      ) : (
        <DashboardContent history={history} />
      )}
    </>
  );
};

export default MainContent;
