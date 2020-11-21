import React from "react";
// import { useSelector } from "react-redux";
import styled from "styled-components";
import Bell from "../../asset/bell.svg";
import Avatar from "../../asset/Avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

function TopHeader({ setShow, show }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const handleMenuIcon = () => {
    setShow(!show);
  };
  return (
    <HeadContainer className="top-header">
      <h5>overview</h5>
      <div className="right-con">
        <div className="nots">
          <img
            src={Bell}
            alt="bellimage"
            style={{ fontSize: "0.8em", color: "#2C3E50", width: "18px" }}
          />
        </div>
        <div className="user-avatar">
          <img src={Avatar} alt="Avatar" />
          <div className="user-info">
            <p>
              {user?.firstName} {user?.lastName}
            </p>
            <p>{user?.email}</p>
          </div>
        </div>
      </div>
      {!show ? (
        <FontAwesomeIcon
          icon={faBars}
          className="menu-icon"
          onClick={handleMenuIcon}
        />
      ) : (
        <FontAwesomeIcon
          icon={faTimes}
          className="menu-icon"
          onClick={handleMenuIcon}
        />
      )}
    </HeadContainer>
  );
}

export default TopHeader;

const HeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 10px 60px 10px 40px;
  border-bottom: 1px solid #eaeaea;
  opacity: 1;
  height: 50px;
  @media screen and (max-width: 500px) {
    display: flex;
    padding: 10px 40px 10px 40px;
  }
  .menu-icon {
    display: none;
    @media (max-width: 500px) {
      display: block;
      /* padding-right: 3px; */
      color: #171725;
      font-size: 28px;
    }
  }

  h5 {
    letter-spacing: 0.12px;
    color: #171725;
    opacity: 1;
    font-weight: 500;
    font-size: 14px;
    font-family: "Rubik", sans-serif;
    margin-left: 15rem;
    text-transform: capitalize;

    @media (max-width: 400px) {
      margin-left: 0rem;
    }
    @media (max-width: 500px) {
      margin-left: 0rem;
    }
  }

  .right-con {
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 500px) {
      display: none;
    }
  }
  .bell {
    width: 0.8em !important;
    height: 0.8em !important;
  }

  .nots {
    position: relative;
    margin-left: 20px;
    margin-right: 20px;
    display: inline-block;
  }

  .profile-icon {
    margin-left: 20px;
    margin-right: 20px;
  }

  .user-avatar {
    display: flex;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid #e2e2ea;
      opacity: 1;
    }
  }

  .user-info {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    p {
      &:nth-child(1) {
        letter-spacing: 0.24px;
        color: #44444f;
        opacity: 0.85;
        font-weight: 500;
        font-size: 12px;
        margin: 0;
      }

      &:nth-child(2) {
        letter-spacing: 0.21px;
        color: #503faa;
        opacity: 0.95;
        font-weight: 500;
        font-size: 10px;
        margin: 0;
      }
    }
  }
`;
