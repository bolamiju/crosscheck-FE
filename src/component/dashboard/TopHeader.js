import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../../asset/Avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { getUserMessages, deleteMessage } from "../../state/actions/verifications";
import { BellFilled } from "@ant-design/icons";

function TopHeader({ setShow, show }) {
  const dispatch = useDispatch();
    let route = useRouteMatch();

  const { messages } = useSelector((state) => state.verifications);
  const [open, setOpen] = useState(true);
  const [font, setFont] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));



  const handleMenuIcon = () => {
    setShow(!show);
  };

  useEffect(() => {
    dispatch(getUserMessages(user?.email));
  }, [dispatch]);

  const handleFontChange = (font) => {
    setFont(font);
  };
  return (
    <div>
      <HeadContainer className="top-header">
      {route && route.url === "/new" ? (
        <h5>Education Check</h5>
      ) : route && route.url === "/transcript" ? (
        <h5>Transcript Order</h5>
      ) : route && route.url === "/history" ? (
          <h5>Verification History</h5>
      ) : (
        <h5>Dashboard</h5>
      )}
        <div className="right-con">
          <div className="nots">
            <BellFilled
              className="bell"
              style={{
                fontSize: "1.5em",
                color: "#2C3E50",
                width: "20px",
                cursor: "pointer",
              }}
              onClick={() => setOpen(!open)}
            />
            {!open && messages.length > 0 ? (
              <div className="messages">
                {messages.map((message) => (
                  <div key={message.id} className="message">
                    <h5>{message.subject}</h5>
                    <p>{message.message}</p>
                    <button
                      onClick={() => {
                        dispatch(deleteMessage(message.id));
                        handleFontChange(message.id);
                      }}
                      className={font === message.id ? "read" : ""}
                    >
                      mark as read
                    </button>
                  </div>
                ))}
              </div>
            ) : null}
            {messages.length > 0 && <div className="red-circle"></div>}
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
    </div>
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
      color: #707070;
      font-family: MonserratLight;
      font-size: 28px;
    }
  }

  h5 {
    letter-spacing: 0.12px;
    color: #707070;
    opacity: 1;
    font-weight: 500;
    font-size: 14px;
    font-family: MontserratLight;
    @media screen and (max-width: 400px) {
      display: none;
    }
    @media screen and (max-width: 500px) {
      display: none;
    }
  }

  .right-con {
    display: flex;
    justify-content: center;
    align-items: center;
    .user-avatar {
      @media screen and (max-width: 500px) {
      display: none;
    }
    @media screen and (max-width: 400px) {
      display: none;
    }
    }
  }
  .bell {
    @media screen and (max-width: 400px) {
      margin-left: -1rem;
      font-size: 3rem;
      width: 30px;
    }
    @media screen and (max-width: 500px) {
      margin-left: -1rem;
      font-size: 3rem;
      width: 30px;
    }
  }

  .nots {
    position: relative;
    margin-left: 20px;
    margin-right: 20px;
    display: inline-block;
    outline: none;
    .anticon.anticon-bell {
      outline: none !important;
    }
    .red-circle {
      position: absolute;
      top: 0px;
      right: 0px;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #f42753;
      border: 2.2px solid #fff;
    }

    .messages {
      position: absolute;
      right: 30%;
      background: #ffffff;
      max-height: 230px;
      overflow-y: scroll;
      padding: 0.5rem 1rem;
      color: #707070;
      width: 400px;
      text-align: left;
      border-radius: 5px;
      box-shadow: 0px 0px 10px #00000029;
      @media (max-width: 400px) {
        left: 10%;
        width: 250px;
      }
      @media (max-width: 500px) {
        width: 250px;
        left: 10%;
      }
      .message {
        padding-bottom: 1.2rem;
        button {
          float: right;
          background: transparent;
          border: none;
          color: #0092e0;
          text-transform: capitalize;
          cursor: pointer;
          outline: none;
          &.read {
            font-weight: bolder;
          }
        }
        /* h5 {
          border-bottom: 1px solid #707070;
          padding-bottom: 1rem;
        } */
        p {
          letter-spacing: 0.32px;
          opacity: 1;
          font-weight: normal;
        }
      }
    }
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
        letter-spacing: 0.44px;
        color: #173049;
        font-family: segoebold;
        font-size: 14px;
        margin: 0;
      }

      &:nth-child(2) {
        letter-spacing: 0.21px;
        font-family: MontserratRegular;
        color: #707070;
        opacity: 0.95;
        font-weight: 500;
        font-size: 10px;
        margin: 0;
      }
    }
  }
`;
