import React from "react";
import PendingColumn from "./PendingColumn";
import PendingItem from "./PendingItem";
import styled from "styled-components";

const RecentPending = () => {
  return (
    <PendingWrapper>
      <div className="d-flex justify-content-between mr-4">
        <h6 className="title">recent pending</h6>
        <p>
          total <span>10</span>
        </p>
      </div>
      <div className="card mr-4 px-4 pt-3 pb-4">
        <PendingColumn />
        <PendingItem />
      </div>
    </PendingWrapper>
  );
};

const PendingWrapper = styled.div`
  width: 50%;
  text-transform: capitalize;
  @media (max-width: 400px) {
    width: 100%;
  }
  @media (max-width: 500px) {
    width: 100%;
  }
  .title {
    font-weight: bolder;
  }
  .card {
    background: white;
    @media (max-width: 400px) {
      overflow-x: scroll;
      width: 90%;
    }
  }
`;
export default RecentPending;
