import React from "react";
import VerificationContent from './VerificationContent';
import DashboardLayout from "./DashboardLayout";


const VerificationHistory = ({ history }) => {
  return (
    <DashboardLayout history={history}>
      <VerificationContent />
    </DashboardLayout>
  );
};


export default VerificationHistory;
