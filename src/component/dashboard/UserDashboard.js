import React, { useEffect } from "react";

function UserDashboard({ match, location }) {
  const {
    params: { id },
  } = match;

  console.log("see id", id);
  return (
    <div>
      <h4>Dashboard appears here</h4>
    </div>
  );
}

export default UserDashboard;
