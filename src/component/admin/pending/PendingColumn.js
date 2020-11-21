import React from "react";
import styled from "styled-components";

const PendingColumn = () => {
  return (
    <ColumnWrapper className=" container-fluid">
      <div className="row justify-content-center">
        <div className="heading mx-auto">
          <p>requester</p>
        </div>
        <div className="heading mx-auto">
          <p>type</p>
        </div>
        <div className="heading mx-auto">
          <p>date</p>
        </div>
      </div>
    </ColumnWrapper>
  );
};

const ColumnWrapper = styled.div`
  padding-left: 6rem;
  padding-right: 6rem;
  .heading {
    font-weight: bolder;
  }
`;

export default PendingColumn;
