import React from "react";
import styled from "styled-components";
import Bell from "../../asset/bell.svg";
import Avatar from "../../asset/Avatar.png";

function TopHeader() {
  return (
    <HeadContainer className="top-header">
      <h5>search bar</h5>
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
            <p>John Kumuyi</p>
            <p>johnkumuyi@gmail.com</p>
          </div>
        </div>
      </div>
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

  h5 {
    letter-spacing: 0.12px;
    color: #171725;
    opacity: 1;
    font-weight: 500;
    font-size: 14px;
    font-family: "Rubik", sans-serif;
  }

  .right-con {
    display: flex;
    justify-content: center;
    align-items: center;
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