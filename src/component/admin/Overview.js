import React from "react";
import AdminLayout from "./AdminLayout";
import RecentPending from "./pending/RecentPending";
import RecentCompleted from "./completed/RecentCompleted";
import styled from "styled-components";

const Overview = ({ history }) => {
  return (
    <AdminLayout history={history}>
      <OverviewWrapper>
        <div className="container py-5">
          <div className="welcome p-3 ">
            <h5>welcome admin_name</h5>
            <p>what would you like to do today ?</p>
          </div>
          <div className="cards py-5">
            <div className="card1">
              <h2>10</h2>
              <p>
                new transcript <br /> orders
              </p>
            </div>
            <div className="card2">
              <h2>100</h2>
              <p>
                new education <br /> checks
              </p>
            </div>
            <div className="card3">
              <h2>25</h2>
              <p>
                new identity <br /> verifications
              </p>
            </div>
            <div className="card4">
              <h2>15</h2>
              <p>
                new credit <br /> checks
              </p>
            </div>
          </div>
          <div className="d-block d-lg-flex justify-content-between">
            <RecentPending />
            <RecentCompleted />
          </div>
          <div className="cards py-5">
            <div className="cardy">
              <h2>15</h2>
              <p>New signups this week</p>
            </div>
            <div className="cardy">
              <h2>#70k</h2>
              <p>Total earinings</p>
            </div>
          </div>
        </div>
      </OverviewWrapper>
    </AdminLayout>
  );
};

const OverviewWrapper = styled.div`
  background: var(--mainWhite);
  width: 100%;
  margin-top: -1.25rem;
  overflow-y: scroll;
  height: 100%;
  font-family: "Roboto";
  .container {
    padding: 3rem 3rem;
    display: block;
  }
  .welcome {
    width: 100%;
    background: white;
    h5 {
      color: var(--lightBlue);
      text-transform: capitalize;
    }
    p {
      color: var(--lightDark);
    }
  }
  .cards {
    display: flex;
    /* padding: 0 2rem 0 0; */
    @media (max-width: 400px) {
      display: block;
      padding: 2rem 0;
    }
    @media (max-width: 500px) {
      display: block;
      padding: 2rem 0;
    }
  }
  .card1 {
    background: var(--lightBlue);
    padding: 1.5rem 0.5rem 0.5rem 1.5rem;
    width: 22rem;
    height: 8rem;
    color: white;
    margin-right: 1.5rem;
    border-radius: 0.2rem;
    background-image: linear-gradient(
      to right,
      var(--lightBlue),
      var(--mainBlue)
    );
    transition: all 0.2s linear;
    @media (max-width: 500px) {
      width: 100%;
      margin-left: 0;
      margin-top: 2rem;
    }
    h2 {
      font-weight: bolder;
    }
    p {
      text-transform: capitalize;
      font-weight: lighter;
      font-size: 0.8rem;
    }
  }
  .card1:hover {
    transform: scale(0.9);
  }
  .card2 {
    background: var(--lightBlue);
    padding: 1.5rem 0.5rem 0.5rem 1.5rem;
    width: 22rem;
    height: 8rem;
    color: white;
    margin-right: 1.5rem;
    border-radius: 0.2rem;
    background-image: linear-gradient(
      to right,
      var(--lightBlue),
      var(--mainBlue)
    );
    transition: all 0.2s linear;
    @media (max-width: 500px) {
      width: 100%;
      margin-left: 0;
      margin-top: 2rem;
    }
    h2 {
      font-weight: bolder;
    }
    p {
      text-transform: capitalize;
      font-weight: lighter;
      font-size: 0.8rem;
    }
  }
  .card2:hover {
    transform: scale(0.9);
  }
  .card3 {
    background: var(--lightBlue);
    padding: 1.5rem 0.5rem 0.5rem 1.5rem;
    width: 22rem;
    height: 8rem;
    color: white;
    margin-right: 1.5rem;
    border-radius: 0.2rem;
    background-image: linear-gradient(
      to left,
      var(--lightBlue),
      var(--mainBlue)
    );
    transition: all 0.2s linear;
    @media (max-width: 500px) {
      width: 100%;
      margin-left: 0;
      margin-top: 2rem;
    }
    h2 {
      font-weight: bolder;
    }
    p {
      text-transform: capitalize;
      font-weight: lighter;
      font-size: 0.8rem;
    }
  }
  .card3:hover {
    transform: scale(0.9);
  }
  .card4 {
    background: var(--lightBlue);
    padding: 1.5rem 0.5rem 0.5rem 1.5rem;
    width: 22rem;
    height: 8rem;
    color: white;
    border-radius: 0.2rem;
    background-image: linear-gradient(var(--lightBlue), var(--mainBlue));
    transition: all 0.2s linear;
    @media (max-width: 500px) {
      width: 100%;
      margin-left: 0;
      margin-top: 2rem;
    }
    h2 {
      font-weight: bolder;
    }
    p {
      text-transform: capitalize;
      font-weight: lighter;
      font-size: 0.8rem;
    }
  }
  .card4:hover {
    transform: scale(0.9);
  }

  .recent-completed {
    width: 50%;
    text-transform: capitalize;
    margin-right: 2rem;

    @media (max-width: 400px) {
      width: 100%;
    }
    @media (max-width: 500px) {
      width: 100%;
    }
  }
  .cardy {
    padding: 2rem 0.5rem 0.5rem 1rem;
    width: 13rem;
    height: 9rem;
    margin-right: 2rem;
    border-radius: 0.2rem;
    background: white;
    transition: all 1s linear;
    @media (max-width: 500px) {
      width: 100%;
      margin-left: 0;
      margin-top: 2rem;
    }
    h2 {
      color: #0092e0;
    }
    p {
      font-weight: lighter;
    }
  }
`;

export default Overview;
