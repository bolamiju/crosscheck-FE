import React from "react";
import styled from "styled-components";
import Logo from "../asset/CrossCheckLogo.png";
import Avatar from "../asset/Avatar.png";
import Mail from "../asset/mail.svg";
import phone from "../asset/phone.svg";
import Address from "../asset/Address.svg";

const LandingPage = () => {
  return (
    <div>
      <FirstSection>
        <NavBar>
          <div>
            <img src={Logo} alt="" style={{ width: "150px", height: "30px" }} />
          </div>
          <div className="navs">
            <ul>
              <li>Home</li>
              <li>Coverage</li>
              <li>About Us</li>
              <li>How it works</li>
              <li>Contact</li>
              <button>LOGIN</button>
            </ul>
          </div>
        </NavBar>
        <Main>
          <div className="intro-text">
            <h1>
              Your unfair advantage to get
              <br />
              ahead starts here
            </h1>
            <p>
              We are Africa’s most comprehensive online, automated verification
              service for academic qualifications.
            </p>
            <div className="register">
              <button>Sign Up Now</button>
              <button>How it Works</button>
            </div>
          </div>
          {/* <img src={header} alt="headerimage" /> */}
        </Main>
      </FirstSection>
      <About>
        <h1>A few things you should know about us</h1>
        <div className="tabs">
          <h3>CONFIDENTIAL</h3> <h3>FASTEST RESPONSE TIME</h3>{" "}
          <h3>COST EFFECTIVE</h3>
        </div>
        <p>
          CrossCheck is Trapezoid’s response to the African verification
          dilemma. Our diverse offerings are the result of continuous
          technological innovation, constant customer feedback and a drive to
          offer the industry’s best solutions. CrossCheck offers a centralised
          platform for degree verification that connects employers, agencies,
          universities, embassies and councils.
        </p>
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
          <h4>Regiser/Login</h4>
          <p>
            To take a trivial example, which of us ever undertakes laborious
            physical exercise and stuff.
          </p>
        </div>
        <div className="blocks">
          <h4>Regiser/Login</h4>
          <p>
            To take a trivial example, which of us ever undertakes laborious
            physical exercise and stuff.
          </p>
        </div>
        <div className="blocks">
          <h4>Regiser/Login</h4>
          <p>
            To take a trivial example, which of us ever undertakes laborious
            physical exercise and stuff.
          </p>
        </div>
        <div className="blocks">
          <h4>Regiser/Login</h4>
          <p>
            To take a trivial example, which of us ever undertakes laborious
            physical exercise and stuff.
          </p>
        </div>

        <div className="blocks">
          <h4>Regiser/Login</h4>
          <p>
            To take a trivial example, which of us ever undertakes laborious
            physical exercise and stuff.
          </p>
        </div>
      </Blocks>
      <Testimonies>
        <h2>What our people say abouut us</h2>
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

          <div className="email">
            <img src={Address} alt="mail" />
            <div>
              <p>Address</p>
              <p className="text">31 Opebi, Street, Ikeja, Lagos.</p>
            </div>
          </div>
        </div>
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
  width: 100%;
  height: 350px;
  background: #173049 0% 0% no-repeat padding-box;
  .bottom-content {
    display: flex;
    justify-content: space-between;
    padding-left: 30px;
    padding-right: 30px;
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
    width: 95%;
    display: flex;
    margin: 0 auto;
    justify-content: space-around;
    padding-top: 40px;
    padding-bottom: 30px;
    border-bottom: 1px solid grey;
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
        font-size: 12px;
      }
    }
  }
  .footer-logo {
    width: 100%;
    padding-top: 60px;
    display: flex;
    flex-direction: space-between;
    padding-left: 60px;
    ul {
      margin-left: 250px;
      list-style-type: none;
      display: flex;
      li {
        margin-right: 15px;
        color: grey;
        font-size: 12px;
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
    h2 {
      color: #0092e0;
      font-size: 42px;
      font-weight: bolder;
      border-bottom: 1px solid gray;
    }
    .count {
      padding-right: 250px;
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
  p {
    /* font: normal normal 300 16px/29px Montserrat; */
    width: 40%;
    text-align: center;
    letter-spacing: 0px;
    color: #ffffff;
  }
  .testimonies {
    display: flex;
    justify-content: space-between;
    width: 90%;

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
  .blocks {
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
  }
`;

const About = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  align-items: center;
  margin: 0 auto;
  p {
    color: #676f79;
  }
  .tabs {
    display: flex;
    justify-content: space-between;
    width: 70%;
    h3 {
      letter-spacing: 0.6px;
      color: #173049;
    }
  }
  p {
    width: 70%;
    text-align: center;
  }
`;

const FirstSection = styled.div`
  width: 100%;
  background: #0092e0;
  height: 500px;
  background: transparent linear-gradient(180deg, #0092e0 0%, #1ec3ff 100%) 0%
    0% no-repeat padding-box;
  box-shadow: 0px 10px 30px #00000029;
`;

const NavBar = styled.nav`
  display: flex;
  padding-left: 90px;
  align-items: center;

  .navs {
    ul {
      display: flex;
      padding-left: 180px;

      list-style-type: none;
      button {
        margin-top: -5px;
        background: #ff0000;
        border-radius: 2px;
        color: white;
        outline: none;
        border: 1px solid #ff0000;
        padding: 10px 20px 7px 20px;
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
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  .register {
    width: 100%;
    display: flex;

    button {
      font-size: 18px;
      &:nth-child(1) {
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
  }
  .intro-text {
    color: white;
    width: 38%;
    padding-left: 0px;
    p {
      font-size: 20px;
    }
  }
`;
