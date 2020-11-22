import React from "react";
import CompletedColumn from "./CompletedColumn";
import CompletedItem from "./CompletedItem";
import styled from "styled-components";

const RecentPending = () => {
  return (
    <CompletedWrapper>
      <div className="d-flex justify-content-between">
        <h6 className="title">recent completed</h6>
        <p>
          total <span>125</span>
        </p>
      </div>
      <div className="card px-4 pt-3 pb-4">
        <CompletedColumn />
        <CompletedItem />
      </div>
    </CompletedWrapper>
  );
};

const CompletedWrapper = styled.div`
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
  }
`;
export default RecentPending;
