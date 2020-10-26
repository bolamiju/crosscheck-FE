import React, { useState } from "react";
// import Carousel from "react-elastic-carousel";
import {Link} from 'react-router-dom'
import styled from "styled-components";
import Logo from "../asset/CrossCheckLogo.png";
import Avatar from "../asset/Avatar.png";
import Mail from "../asset/mail.svg";
import phone from "../asset/phone.svg";
import Computer from "../asset/Computer.png";
import Tie from "../asset/manintie.png";
import cash from "../asset/cash.svg";
import enquiry from "../asset/enter_enquiry_dets.svg";
import service from "../asset/select_service.svg";
import pay from "../asset/pay_send.svg";
import register from "../asset/register_login.svg";
import whitelogo from "../asset/whitelogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const LandingPage = () => {
  const [show, setShow] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const handleMenuIcon = () => {
    setShow(!show);
  };

  const changeBackground = () => {
    if (window.scrollY >= 420) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeBackground);
  return (
    <div>
      <FirstSection>
        <NavBar
          style={{
            position: `${navbar ? "fixed" : ""}`,
            width: `${navbar ? "100%" : ""}`,
            background: `${navbar ? "white" : ""}`,
            color: `${navbar ? "blue" : "white"}`,
          }}
        >
          <div>
            <img
              className="crosschecklogo"
              src={navbar ? Logo : whitelogo}
              alt=""
            />
          </div>
          <div className="navs">
            <ul>
              <li style={{ color: `${navbar ? "#0092E0" : "white"}` }}>Home</li>
              <li style={{ color: `${navbar ? "#0092E0" : "white"}` }}>
                Coverage
              </li>
              <li style={{ color: `${navbar ? "#0092E0" : "white"}` }}>
                About Us
              </li>
              <li style={{ color: `${navbar ? "#0092E0" : "white"}` }}>
                How it works
              </li>
              <li style={{ color: `${navbar ? "#0092E0" : "white"}` }}>
                Contact
              </li>
              <button><Link className="link-to" to='/'>LOGIN</Link></button>
            </ul>
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
        </NavBar>
        <div className={show ? "hide-show" : "hide"}>
          <ul>
            <li>Home</li>
            <li>Coverage</li>
            <li>About Us</li>
            <li>How it works</li>
            <li>Contact</li>
            {/* <button>LOGIN</button> */}
          </ul>
        </div>
        <Main>
          <div className="intro-text">
            <h1>
              Your unfair
              <br /> advantage to get
              <br />
              ahead starts <h1 className="here">here</h1>
            </h1>
            <h2>Your unfair advantage to get ahead starts here</h2>
            <p>
              We are Africa’s most comprehensive online, automated verification
              service for academic qualifications.
            </p>
            <div className="register">
              <button>Sign Up Now</button>
              <button>How it Works</button>
            </div>
          </div>
          <img
            src={Computer}
            alt="headerimage"
            style={{ width: "700px", height: "350px" }}
          />
        </Main>
      </FirstSection>
      <About>
        <h1>A few things you should know about us</h1>
        <h2>About Us</h2>
        <div className="tabs">
          <h3>OUR MISSION</h3> <h3>WHO WE ARE</h3> <h3>OUR VISION</h3>
        </div>
        <div className="mobile-about">
          <h3>Who We Are</h3>
          <span>
            lorem ipsum is our response to the African verification dilemma. Our
            diverse offerings are the result of continuous technological
            innovation, constant customer feedback and a drive to offer
          </span>
        </div>
        <div className="mobile-about">
          <h3>Our Mission</h3>
          <span>
            lorem ipsum is our response to the African verification dilemma. Our
            diverse offerings are the result of continuous technological
            innovation, constant customer feedback and a drive to offer
          </span>
        </div>
        <div className="mobile-about">
          <h3>Our Vision</h3>
          <span>
            lorem ipsum is our response to the African verification dilemma. Our
            diverse offerings are the result of continuous technological
            innovation, constant customer feedback and a drive to offer
          </span>
        </div>
        <p>
          CrossCheck is our response to the African verification dilemma. Our
          diverse offerings are the result of continuous technological
          innovation, constant customer feedback and a drive to offer the
          industry’s best solutions. CrossCheck offers a centralised platform
          for degree verification that connects employers, agencies,
          universities, embassies and councils.
        </p>
        <img src={Tie} alt="manintie" />
      </About>
      <Div>
        <h2>How it Works</h2>
        <p>
          A descriptive if there is anyone who loves or pursues or desires to
          obtain pain and anything else to finish this sentence.
        </p>
      </Div>
      <Blocks>
        <div className="blocks">
          <img src={register} alt="regi" />
          <h4>Regiser</h4>
          <p>
            To take a trivial example, which of us ever undertakes laborious
            physical exercise and stuff.
          </p>
        </div>
        <div className="blocks">
          <img src={service} alt="regi" />
          <h4>Select Service</h4>
          <p>
            To take a trivial example, which of us ever undertakes laborious
            physical exercise and stuff.
          </p>
        </div>
        <div className="blocks">
          <img src={enquiry} alt="enq" />
          <h4>Search institution</h4>
          <p>
            To take a trivial example, which of us ever undertakes laborious
            physical exercise and stuff.
          </p>
        </div>
        <div className="blocks">
          <img src={enquiry} alt="enq" />
          <h4>Enter Enquiry Details</h4>
          <p>
            To take a trivial example, which of us ever undertakes laborious
            physical exercise and stuff.
          </p>
        </div>

        <div className="blocks">
          <img src={cash} alt="pay" />
          <h4>Pay</h4>
          <p>
            To take a trivial example, which of us ever undertakes laborious
            physical exercise and stuff.
          </p>
        </div>
        <div className="blocks">
          <img src={pay} alt="paysend" />
          <h4>Send</h4>
          <p>
            To take a trivial example, which of us ever undertakes laborious
            physical exercise and stuff.
          </p>
        </div>
      </Blocks>
      <Testimonies>
        <h2>What people say about us</h2>
        <p>
          We are quite fond of the people and organizations we serve, here's
          what they have to say about us.
        </p>
        <div className="testimonies">
          <div className="testimony">
            <p>
              {" "}
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt omnis iste natus.{" "}
            </p>
            <div className="profile">
              <img src={Avatar} alt="avatar" />
              <p>Bertha Johnson</p>
              <p className="role">CTO Herculanum</p>
            </div>
          </div>
          <div className="testimony">
            <p>
              {" "}
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt omnis iste natus.{" "}
            </p>
            <div className="profile">
              <img src={Avatar} alt="avatar" />
              <p>Bertha Johnson</p>
              <p className="role">HR Manager/Confetti Group</p>
            </div>
          </div>
          <div className="testimony">
            <p>
              {" "}
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt omnis iste natus.
            </p>
            <div className="profile">
              <img src={Avatar} alt="avatar" />
              <p>Bertha Johnson</p>
              <p className="role">Applicant</p>
            </div>
          </div>
        </div>

        {/* MOBILE TESTIMONIES */}
        {/* <Carousel itemsToShow={1} className="carousels"> */}
        <div className="carousels">
          <div className="testimony">
            <p>
              {" "}
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt omnis iste natus.
            </p>
            <div className="profile">
              <img src={Avatar} alt="avatar" />
              <p>Benedict Johnson</p>
              <p className="role">Applicant</p>
            </div>
          </div>
          </div>
          {/* <div className="testimony second">
            <p>
              {" "}
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt omnis iste natus.
            </p>
            <div className="profile">
              <img src={Avatar} alt="avatar" />
              <p>Bertha Johnson</p>
              <p className="role">Applicant</p>
            </div>
          </div>
          <div className="testimony third">
            <p>
              {" "}
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt omnis iste natus.
            </p>
            <div className="profile">
              <img src={Avatar} alt="avatar" />
              <p>Bertha Johnson</p>
              <p className="role">Applicant</p>
            </div>
          </div> */}
        {/* </Carousel> */}
      </Testimonies>
      <Cover>
        <h2>We Cover Over</h2>
        <div className="cover">
          <div className="count">
            <h2>100</h2>
            <p>COUNTRIES</p>
          </div>

          <div className="inst">
            <h2>200</h2>
            <p>INSTITUTIONS</p>
          </div>
        </div>
      </Cover>
      <Footer>
        <div className="footer-logo">
          <img src={Logo} alt="crosscheck" />
          <ul>
            <li>HOME</li>
            <li>ABOUT</li>
            <li>COVERAGE</li>
            <li>TESTIMONIALS</li>
            <li>CONTACT US</li>
          </ul>
        </div>
        <div className="contact">
          <div className="email">
            <img src={Mail} alt="mail" />
            <div>
              <p>Email</p>
              <p className="text">support@crosscheck.africa</p>
            </div>
          </div>

          <div className="email">
            <img src={phone} alt="mail" />
            <div className="text">
              <p>Phone</p>
              <p className="text">(01) 479-642-7461 (01)</p>
            </div>
          </div>

        
        </div>
        <div className="line"></div>
        <div className="bottom-content">
          <p>© 2020 Crosscheck. All Rights Reserved</p>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
      </Footer>
    </div>
  );
};

export default LandingPage;

const Footer = styled.div`
  @media only screen and (max-width: 400px) {
    display: flex;
    flex-direction: column;
    background: #001538 0% 0% no-repeat padding-box;
  }
  width: 100%;
  /* height: 350px; */
  background: #173049 0% 0% no-repeat padding-box;
  .line{
      width:90%;
      margin:0 auto;
    border-bottom:1px solid grey
    }
  .bottom-content {
    display: flex;
    justify-content: space-between;
    padding-left: 30px;
    padding-right: 30px;
    @media (max-width: 400px) {
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
    }
    p {
      color: grey;
      font-size: 12px;
    }
    ul {
      display: flex;
      list-style-type: none;

      li {
        margin-right: 7px;
        color: grey;
        font-size: 12px;
      }
    }
  }
  .contact {
    width: 55%;
    display: flex;
    /* margin: 0 auto; */
    justify-content: space-around;
    padding-top: 40px;
    padding-bottom: 30px;
    margin-left:550px;
    @media (max-width: 400px) {
      display: block;
      flex-direction: column;
      padding-top: 0px;
      margin-left:0
    }
    .email {
      display: flex;
      img {
        margin-right: 20px;
      }
      p {
        color: white;
      }
      .text {
        color: grey;
        font-size: 16px;
        @media (max-width: 400px) {
          font-size: 16px;
        }
      }
    }
  }
  .footer-logo {
    /* width: 100%; */
    padding-top: 60px;
    display: flex;
    flex-direction: space-between;
    padding-left: 60px;
  
    @media (max-width: 400px) {
      padding-left: 15px;
      display: flex;
      /* align-items: flex-start; */

      flex-direction: column;
    }
    img {
      @media (max-width: 400px) {
        width: 150px;
        height: 30px;
      }
    }
    ul {
      margin-left: 350px;
      list-style-type: none;
      display: flex;
      @media (max-width: 400px) {
        display: flex;
        flex-direction: column;
        margin-left: 0px;
        padding: 0 !important;
      }
      li {
        margin-right: 15px;
        color: grey;
        font-size: 12px;
        @media (max-width: 400px) {
          margin-bottom: 20px;
        }
      }
    }
  }
`;

const Cover = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 40px;
  padding-bottom: 40px;
  .cover {
    display: flex;
    justify-content: center;
    @media (max-width: 400px) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    h2 {
      color: #0092e0;
      font-size: 42px;
      font-weight: bolder;
      border-bottom: 1px solid gray;
    }
    .count {
      padding-right: 250px;
      @media (max-width: 400px) {
        padding-right: 0px;
      }
    }
  }
`;

const Testimonies = styled.div`
  width: 100%;
  height: 400px;
  color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 40px;
  background: transparent linear-gradient(308deg, #0092e0 0%, #1ec3ff 100%) 0%
    0% no-repeat padding-box;
  @media (max-width: 400px) {
    padding-bottom: 40px;
  }
  p {
    width: 40%;
    text-align: center;
    letter-spacing: 0px;
    color: #ffffff;
    @media(max-width:400px){
      width:80%
    }
  }
  .carousels {
    display: none;
    @media (max-width: 400px) {
      display: flex;
      justify-content: space-between;
      .hVmIQZ,
      .eMUgLX {
        width: 0.2rem !important;
        height: 1rem !important;
        border-radius: 50% !important;
      }
      .second{
        @media(max-width:400px){
          display:none
        }
        .third{
          @media(max-width:400px){
            display:none
          }
        }
      }
      .testimony {
        width: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 120px;
        background: #ffffff 0% 0% no-repeat padding-box;
        border-radius: 8px;
        margin-right: 10px;
        .profile {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: absolute;
          @media(max-width:400px){
           position:relative;
           top: 60px;
          }
          .role {
            color: #676f79;
          }
          p {
            width: 100%;
            color: white;
          }
          img {
            width: 70px;
            height: 70px;
          }
        }
        p {
          letter-spacing: 0px;
          color: #676f79;
          width: 90%;
          text-align: center;
          margin: 0;
          @media(max-width:400px){
            margin-bottom: -30px;
          }
        }
      }
    }
  }
  .testimonies {
    display: flex;
    justify-content: space-between;
    width: 90%;
    @media (max-width: 400px) {
      display: none;
    }

    .testimony {
      width: 300px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 120px;
      background: #ffffff 0% 0% no-repeat padding-box;
      border-radius: 8px;
      .profile {
        margin-bottom: -70px;
        padding-top: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .role {
          color: #676f79;
        }
        p {
          width: 100%;
          color: white;
        }
        img {
          width: 70px;
          height: 70px;
        }
      }
      p {
        letter-spacing: 0px;
        color: #676f79;
        width: 90%;
        text-align: center;
        margin: 0;
      }
    }
  }
`;

const Blocks = styled.div`
  width: 75%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0 auto;
  margin-top: 30px;
  @media (max-width: 400px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .blocks {
    @media (max-width: 400px) {
      width: 100%;
      margin-bottom: 40px;
    }
    width: 33.33%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 60px;
    p {
      width: 85%;
      text-align: center;
      color: #676f79;
    }
  }
`;
const Div = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;

  width: 80%;
  align-items: center;
  margin: 0 auto;
  margin-top: 30px;
  p {
    width: 50%;
    text-align: center;
    color: #676f79;
    @media (max-width: 400px) {
      width: 100%;
    }
  }
`;

const About = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  align-items: center;
  margin: 0 auto;
  margin-top: 50px;
  @media (max-width: 400px) {
    width: 100%;
  }
  .mobile-about {
    display: none;
    h3 {
      color: #0092e0;
      margin: 0px 0px 15px 0px;
    }
    span {
      text-align: center;
      padding-left: 3px;
      padding-right: 9px;
    }
    @media (max-width: 400px) {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 15px;
    }
  }
  h2 {
    display: none;
    @media (max-width: 400px) {
      display: block;
      font-size: 30px;
      font-weight: bolder;
    }
  }
  @media (max-width: 400px) {
    margin-left: 0px;
    margin-top: 30px;
  }
  h1 {
    @media (max-width: 400px) {
      display: none;
    }
  }
  img {
    width: 700px;
    height: 500px;
    @media (max-width: 500px) {
      width: 300px;
      height: 250px;
    }
  }
  p {
    color: #676f79;
    @media (max-width: 400px) {
      display: none;
    }
  }
  .tabs {
    display: flex;
    justify-content: space-between;
    width: 70%;
    @media (max-width: 400px) {
      display: none;
    }

    h3 {
      letter-spacing: 0.6px;
      color: #173049;
      cursor: pointer;

      &:nth-child(2) {
        color: #0092e0;
        border-bottom: 4px solid #0092e0;
      }
    }
  }
  p {
    width: 70%;
    text-align: center;
  }
`;

const FirstSection = styled.div`
  @media (max-width: 400px) {
    min-width: 60%;
  }
  width: 100%;
  background: #0092e0;
  background: transparent linear-gradient(180deg, #0092e0 0%, #1ec3ff 100%) 0%
    0% no-repeat padding-box;
  box-shadow: 0px 10px 30px #00000029;
  .hide-show {
    display: none;
    @media (max-width: 400px) {
      display: flex;
      width: 80%;
      ul {
        width: 100%;
        list-style-type: none;
        li {
          width: 100%;
          color: #eceff3;
          padding-bottom: 15px;
          margin-bottom: 15px;
          border-bottom: 1px solid #333;
        }
      }
    }
  }
  .hide {
    display: none;
  }
`;

const NavBar = styled.nav`
  /* .show {
    position: fixed !important;
    background: white !important;
    color: #0092e0 !important;
  } */
  @media (max-width: 500px) {
    padding: 0px 3px 0px 3px;
    display: flex;
    justify-content: space-between;
    /* max-width: 380px%; */
  }
  display: flex;
  padding-left: 90px;
  align-items: center;
  /* position: fixed; */
  /* width: 100%; */
  .menu-icon {
    display: none;
    @media (max-width: 400px) {
      display: block;
      padding-right: 3px;
      color: white;
      font-size: 28px;
    }
  }
  img {
    width: 150px;
    height: 30px;
    @media (max-width: 400px) {
      /* float: left; */
      width: 100px;
      height: 25px;
    }
  }

  .navs {
    @media only screen and (max-width: 400px) {
      display: none;
    }

    ul {
      display: flex;
      padding-left: 180px;

      list-style-type: none;
      button {
        margin-top: -5px;
        background: #ff0000;
        border-radius: 3px;
        color: white;
        outline: none;
        cursor: pointer;
        border: 1px solid #ff0000;
        padding: 10px 20px 7px 20px;
      }
      .link-to{
        color:white;
        text-decoration:none
      }
      li {
        margin-right: 50px;
        color: white;
        cursor: pointer;
      }
    }
  }
`;

const Main = styled.main`
  @media (max-width: 400px) {
    padding-top: 20px;
  }
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  padding-top: 100px;
  padding-bottom: 30px;
  h1 {
    &:nth-child(1) {
      font-size: 3em;
      margin: 0 !important;
    }
  }

  .register {
    width: 100%;
    display: flex;
    @media (max-width: 500px) {
      display: flex;
      justify-content: center;
    }

    button {
      font-size: 18px;
      outline: none;
      &:nth-child(1) {
        @media (max-width: 500px) {
          margin-right: 0;
        }
        background: white;
        color: #0092e0;
        outline: none;
        border: 1px solid white;
        padding: 10px 40px 10px 40px;
        margin-right: 25px;
        border-radius: 5px;
        cursor: pointer;
        &:hover {
          background: none;
          color: white;
          cursor: pointer;
        }
      }
      &:nth-child(2) {
        @media (max-width: 500px) {
          display: none;
        }
        border: 1px solid white;
        color: white;
        background: none;
        padding: 10px 40px 10px 40px;
        border-radius: 5px;
        &:hover {
          background: white;
          color: #0092e0;
          cursor: pointer;
        }
      }
    }
  }

  img {
    height: 68%;
    @media (max-width: 400px) {
      display: none;
    }
  }
  .intro-text {
    @media (max-width: 400px) {
      width: 80%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-left: 0px;
    }
    color: white;
    width: 38%;
    padding-left: 65px;
    h2 {
      display: none;
      @media (max-width: 400px) {
        display: block;
        color: #66c8ed;
        font-weight: lighter;
        font-size: 30px;
        text-align: center;
      }
    }
    h1 {
      /* font-family: "Quicksand"; */
      @media (max-width: 400px) {
        display: none;
      }
      color: #66c8ed;
      font-weight: lighter;
      font-size: 42px;
      .here {
        color: white;
        cursor: pointer;
        display: inline;
        font-weight: lighter;
      }
    }
    p {
      font-size: 20px;
      text-align: left;
      font: normal normal 400 20px/24px Segoe UI;
      letter-spacing: 0px;
      color: #ffffff;
      @media (max-width: 500px) {
        text-align: center;
      }
    }
  }
`;
