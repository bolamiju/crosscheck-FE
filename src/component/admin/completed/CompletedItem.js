import React from "react";
import styled from "styled-components";
import Avatar from "../../../asset/Avatar.png";

const CompletedItem = () => {
  const Request = {
    id: 1,
    img: Avatar,
    name: "Nuzhat Yesmin",
    type: "Identification Verification",
    date: "10 Nov 2020",
  };
  return (
    <ItemWrapper>
      <div className="row align-items-center">
        <div className="d-flex justify-content-between">
          <img src={Request.img} alt="request" className="image mr-2 mt-1" />
          <p className="pt-3">{Request.name}</p>
        </div>
        <p className="pt-3">{Request.type}</p>
        <p className="pt-3">{Request.date}</p>
      </div>
      <div className="row">
        <div className="d-flex justify-content-between">
          <img src={Request.img} alt="request" className="image mr-2 mt-1" />
          <p className="pt-3">{Request.name}</p>
        </div>
        <p className="pt-3">{Request.type}</p>
        <p className="pt-3">{Request.date}</p>
      </div>
      <div className="row">
        <div className="d-flex justify-content-between align-items-center">
          <img src={Request.img} alt="request" className="image mr-2 mt-1" />
          <p className="pt-3">{Request.name}</p>
        </div>
        <p className="pt-3">{Request.type}</p>
        <p className="pt-3">{Request.date}</p>
      </div>
      <div className="row">
        <div className="d-flex justify-content-between">
          <img src={Request.img} alt="request" className="image mr-2 mt-1" />
          <p className="pt-3">{Request.name}</p>
        </div>
        <p className="pt-3">{Request.type}</p>
        <p className="pt-3">{Request.date}</p>
      </div>
    </ItemWrapper>
  );
};

const ItemWrapper = styled.div`
  width: 100%;
  padding-left: 1rem;
  padding-right: 2rem;
  font-size: 0.8rem;
  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 0.1rem solid var(--mainWhite);
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  .image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #e2e2ea;
    opacity: 1;
  }
`;

export default CompletedItem;
