import React from "react";
import { useRouteMatch } from "react-router-dom";
import DashboardContent from "./DashboardContent";
import NewVerification from "./NewVerifications";

const MainContent = () => {
  let route = useRouteMatch();
  return (
    // <DashboardLayout>
    <>
      {" "}
      {route && route.url === "/new" ? (
        <NewVerification />
      ) : (
        <DashboardContent />
      )}
    </>
  );
};

export default MainContent;
