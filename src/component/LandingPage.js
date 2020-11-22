import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../asset/CrossCheckLogo.png";
import Avatar from "../asset/Avatar.png";
import ava1 from "../asset/ava1.png";
import ava2 from "../asset/ava2.png";
import Mail from "../asset/mail.svg";
import phone from "../asset/phone.svg";
import Computer from "../asset/Computer.png";
import cash from "../asset/cash.svg";
import enquiry from "../asset/enq.svg";
import service from "../asset/serv.svg";
import pay from "../asset/pay_send.svg";
import register from "../asset/reg.svg";
import whitelogo from "../asset/whitelogo.png";
import Menu from "../asset/Menu.svg";
import verified from "../asset/verified.svg";
import intelligence from "../asset/intelligence.svg";
import knowledge from "../asset/knowledge.svg";
import planet from "../asset/planet.svg";
import insight from "../asset/insight.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import VisibilitySensor from "react-visibility-sensor";

const LandingPage = () => {
  const [show, setShow] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const [testimonyIndex, setTestimonyIndex] = useState(0);

  const testimonies = [
    {
      text:
        "Just used CrossCheck for the first time, and It’s was amazing! I was able to order my transcript almost immediately and before every other applicant.",
      author: {
        name: "Adetola Akere",
        organisation: "Lambda School",
        position: "Student",
      },
      avatar: ava1,
    },
    {
      text:
        "Just used CrossCheck for the first time, and It’s was amazing! I was able to order my transcript almost immediately and before every other applicant.",
      author: {
        name: "Mike Attara",
        organisation: "Lambda School",
        position: "Student",
      },
      avatar: ava2,
    },
    {
      text:
        "Just used CrossCheck for the first time, and It’s was amazing! I was able to order my transcript almost immediately and before every other applicant.",
      author: {
        name: "Babatunde",
        organisation: "Paystack",
        position: "Software Engineer",
      },
      avatar: Avatar,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonyIndex((index) => (index + 1) % testimonies.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [testimonies.length]);

  const handleMenuIcon = () => {
    setShow(!show);
  };

  const changeBackground = () => {
    if (window.scrollY >= 420 && window.innerWidth > 600) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeBackground);

  const checkHeight = () => {
    if (window.scrollY >= 2500) {
      return true;
    }
    // else {
    //   return false
    // }
  };

  const testimony = testimonies[testimonyIndex];

  return (
    <div>
      <FirstSection>
        <NavBar
          style={{
            position: `${navbar ? "fixed" : ""}`,
            width: `${navbar ? "100%" : ""}`,
            background: `${navbar ? "white" : ""}`,
            color: `${navbar ? "blue" : "white"}`,
            zIndex: "10",
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
              <li>
                <a
                  style={{ color: `${navbar ? "#0092E0" : "white"}` }}
                  href="#coverage"
                >
                  {" "}
                  Coverage
                </a>
              </li>
              <li style={{ color: `${navbar ? "#0092E0 !" : "white"}` }}>
                <a
                  style={{ color: `${navbar ? "#0092E0" : "white"}` }}
                  href="#about"
                >
                  {" "}
                  About Us
                </a>
              </li>
              <li>
                <a
                  style={{ color: `${navbar ? "#0092E0" : "white"}` }}
                  href="#work"
                >
                  How it works
                </a>
              </li>
              <li>
                <a
                  style={{ color: `${navbar ? "#0092E0" : "white"}` }}
                  href="#contact"
                >
                  Contact{" "}
                </a>
              </li>
              <button>
                <Link className="link-to" to="/">
                  LOGIN
                </Link>
              </button>
            </ul>
          </div>

          {!show ? (
            <FontAwesomeIcon
              icon={faBars}
              className="menu-icon"
              onClick={handleMenuIcon}
            />
          ) : (
            ""
          )}
        </NavBar>
        <div className={show ? "hide-show" : "hide"}>
          <img src={Menu} alt="close" onClick={handleMenuIcon} />
          <ul>
            <li onClick={handleMenuIcon}>Home</li>
            <li onClick={handleMenuIcon}>
              <a href="#coverage">Coverage</a>{" "}
            </li>
            <li onClick={handleMenuIcon}>
              <a href="#about">About Us</a>
            </li>
            <li onClick={handleMenuIcon}>
              <a href="#testimony">Testimonials</a>
            </li>
            <li onClick={handleMenuIcon}>
              <a href="#contact">Contact us</a>
            </li>
            <li className="divider"></li>
            <li>
              <Link className="auth" to="/">
                Login
              </Link>
            </li>
            <li>
              <Link className="auth" to="/register">
                Sign up
              </Link>
            </li>
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
              <button>
                <Link className="reg" to="/register">
                  Sign Up Now
                </Link>
              </button>
              <button>How it Works</button>
            </div>
          </div>
          <img src={Computer} alt="headerimage" />
        </Main>
      </FirstSection>
      <a id="about" href={() => false}>
        <About>
          <h1>A few things you should know about us</h1>
          <h3 className="about-us">About Us</h3>
          <div className="cardss">
            <div className="card">
              <h3>OUR VISION</h3>
              <div className="line"></div>
              <p>To be Africa's leading expert in background checks industry</p>
            </div>
            <div className="card">
              <h3>WHO WE ARE</h3>
              <div className="line"></div>
              <p>
                CrossCheck is Africa’s most comprehensive online, automated
                verification service for academic qualifications and
                professional body memberships.
              </p>
            </div>
            <div className="card">
              <h3>OUR MISSION</h3>
              <div className="line"></div>
              <p>
                An exceptional team committed to providing innovative solutions
                and services to our clients for better hiring or engagement
                decision making
              </p>
            </div>
          </div>
          <div className="image-icons">
            <div className="sec">
              <img src={insight} alt="insight" />
              <p>Global Research</p>
            </div>
            <div className="sec">
              <img src={planet} alt="planet" />
              <p>Local Insights</p>
            </div>
            <div className="sec">
              <img src={intelligence} alt="intelligence" />
              <p>Expertise and Knowledge</p>
            </div>
            <div className="sec">
              <img src={knowledge} alt="knowledge" />
              <p>Primary source verifications</p>
            </div>
            <div className="sec">
              <img src={verified} alt="verified" />
              <p>Technologically relevant</p>
            </div>
          </div>
        </About>
      </a>

      <Div>
        <h2>How it Works</h2>
        <p>
          Our clients can order verifications anytime and our research teams
          start working on the same from multiple locations in highly efficient
          and effective ways.
        </p>
      </Div>
      <a id="work" href={() => false}>
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
      </a>
      <a id="testimonies" href={() => false}>
        <Testimonies>
          <h2>What people say about us</h2>
          <p>
            We are quite fond of the people and organizations we serve, here's
            what they have to say about us.
          </p>
          <div className="testimonies">
            <div className="testimony">
              <p>
                Just used CrossCheck for the first time, and It’s was amazing! I
                was able to order my transcript almost immediately and before
                every other applicant.
              </p>
              <div className="profile">
                <img src={ava2} alt="avatar" />
                <p>Bertha Johnson</p>
                <p className="role">CTO Herculanum</p>
              </div>
            </div>
            <div className="testimony">
              <p>
                Hiring exercises can be tedious. CrossCheck helps us optimize
                candidate verifications during hiring processes, while still
                staying on top of things.
              </p>
              <div className="profile">
                <img src={ava1} alt="avatar" />
                <p>Bertha Johnson</p>
                <p className="role">HR Manager/Confetti Group</p>
              </div>
            </div>
            <div className="testimony">
              <p>
                For the past few weeks, our small team has used CrossCheck to
                conduct seamless verifications without the hassle of multiple
                phone calls and emails.
              </p>
              <div className="profile">
                <img src={Avatar} alt="avatar" />
                <p>Bertha Johnson</p>
                <p className="role">Applicant</p>
              </div>
            </div>
          </div>

          {/* MOBILE TESTIMONIES */}
          <Slides>
            <div className="w3-container w3-center w3-animate-left">
              <p className="testimony-test">{testimony.text}</p>
              <div className="profile">
                <img src={testimony?.avatar} alt="avatar" />
                <span>{testimony?.author?.name}</span>
                <span>{`${testimony?.author?.position}, ${testimony?.author?.organisation}`}</span>
              </div>
            </div>
          </Slides>
          <div className="circles">
            {testimonies.map((_, i) => (
              <div
                key={i}
                onClick={() => setTestimonyIndex(i)}
                className={`circle ${testimonyIndex === i ? "active" : ""}`}
              />
            ))}
          </div>
        </Testimonies>
      </a>
      <a id="coverage" href={() => false}>
        <Cover imgUrl={process.env.PUBLIC_URL + "/map.svg"}>
          <h2>We Cover Over</h2>
          <div className="cover">
            <div className="count" data-target="100">
              {/* <h2 className="counter" >0</h2> */}
              <CountUp
                start={0}
                end={100}
                duration={5}
                onStart={checkHeight}
                className="counter"
              >
                {({ countUpRef, start }) => (
                  <VisibilitySensor onChange={start} delayedCall={true}>
                    <span ref={countUpRef} className="counter" />
                  </VisibilitySensor>
                )}
              </CountUp>
              <p>COUNTRIES</p>
            </div>

            <div className="inst">
              {/* <h2 className="counter" >200</h2> */}
              <CountUp
                start={0}
                end={400}
                duration={5}
                onStart={checkHeight}
                className="counter"
              >
                {({ countUpRef, start }) => (
                  <VisibilitySensor onChange={start} delayedCall={true}>
                    <span ref={countUpRef} className="counter" />
                  </VisibilitySensor>
                )}
              </CountUp>
              <p>INSTITUTIONS</p>
            </div>
          </div>
        </Cover>
      </a>
      <a id="contact" href={() => false}>
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
              <li>
                <Link to="/terms" className="termsof">
                  {" "}
                  Terms of Service
                </Link>
              </li>
              <li>
                <i
                  class="fa fa-twitter"
                  aria-hidden="true"
                  style={{ fontSize: "16px" }}
                ></i>
                &nbsp; &nbsp;
                <i
                  class="fa fa-facebook"
                  aria-hidden="true"
                  style={{ fontSize: "16px" }}
                ></i>
              </li>
            </ul>
          </div>
        </Footer>
      </a>
    </div>
  );
};

export default LandingPage;

const Slides = styled.div`
  display: none;

  @media (max-width: 400px) {
    display: flex;

    .w3-container {
      display: flex;
      flex-direction: column;

      .testimony-test {
        background: white;
        color: black;
        width: 100%;
        padding-top: 10px;
        padding-bottom: 30px;
        border-radius: 4px;
      }
      .profile {
        position: relative;
        top: -40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 70px;
          height: 70px;
        }
      }
    }
  }
  @media (max-width: 500px) {
    display: flex;

    .w3-container {
      display: flex;
      flex-direction: column;

      .testimony-test {
        background: white;
        color: black;
        margin: 0 auto;
        width: 95%;
        padding-top: 10px;
        padding-bottom: 30px;
        border-radius: 4px;
      }
      .profile {
        position: relative;
        top: -30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 70px;
          height: 70px;
        }
      }
    }
  }
`;

const Footer = styled.div`
  @media only screen and (max-width: 400px) {
    display: flex;
    flex-direction: column;
    background: #001538 0% 0% no-repeat padding-box;
    height: 100vh;
  }
  width: 100%;
  /* height: 350px; */
  background: #173049 0% 0% no-repeat padding-box;
  .line {
    width: 90%;
    margin: 0 auto;
    border-bottom: 1px solid grey;
  }
  .bottom-content {
    display: flex;
    justify-content: space-between;
    margin-left: 70px;
    margin-right: 70px;
    .termsof {
      text-decoration: none;
      color: grey;
      cursor: pointer;
    }
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
    margin-left: 550px;
    @media (max-width: 500px) {
      display: block;
      flex-direction: column;
      padding-top: 0px;
      margin-left: 0;
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
        @media (max-width: 500px) {
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
    @media (max-width: 500px) {
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
    img {
      @media (max-width: 500px) {
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
      @media (max-width: 500px) {
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
        @media (max-width: 500px) {
          margin-bottom: 20px;
        }
      }
    }
  }
`;

const Cover = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 70px;
  padding-bottom: 70px;
  background: url(${(props) => props.imgUrl});
  .cover {
    display: flex;
    justify-content: center;
    @media (max-width: 400px) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    @media (max-width: 500px) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .counter {
      color: #0092e0;
      font-size: 42px;
      font-weight: bolder;
      border-bottom: 1px solid gray;
    }
    .count {
      padding-right: 250px;
      @media (max-width: 400px) {
        padding-right: 0px;
        margin-bottom: 50px;
      }
      @media (max-width: 500px) {
        padding-right: 0px;
        margin-bottom: 50px;
      }
    }
  }
`;

const Testimonies = styled.div`
  width: 100%;
  height: 600px;
  color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 60px;
  background: transparent linear-gradient(308deg, #0092e0 0%, #1ec3ff 100%) 0%
    0% no-repeat padding-box;
  .circles {
    display: none;
    @media (max-width: 400px) {
      display: flex;
      margin-top: 30px;
    }
    @media (max-width: 500px) {
      display: flex;
      margin-top: 30px;
    }

    .circle {
      border: 1px solid white;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin-right: 15px;
    }
    .active {
      background: white;
    }
  }
  @media (max-width: 400px) {
    padding-bottom: 40px;
    height: auto !important;
  }
  @media (max-width: 500px) {
    padding-bottom: 40px;
    height: auto !important;
  }
  p {
    width: 40%;
    text-align: center;
    letter-spacing: 0px;
    font-family: MontserratLight;
    font-size: 16px;
    color: #ffffff;
    opacity: 0.9;
    padding-bottom: 60px;
    @media (max-width: 400px) {
      width: 80%;
    }
    @media (max-width: 500px) {
      width: 80%;
    }
  }

  .testimonies {
    display: flex;
    justify-content: space-between;
    width: 90%;
    @media (max-width: 400px) {
      display: none;
    }
    @media (max-width: 500px) {
      display: none;
    }
    .testimony {
      width: 300px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      /* height: 120px; */
      background: #ffffff 0% 0% no-repeat padding-box;
      padding: 10px;
      border-radius: 8px;
      .profile {
        margin-bottom: -90px;
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
          @media (max-width: 500px) {
            display: block;
          }
        }
      }
      p {
        letter-spacing: 0px;
        color: #676f79;
        width: 100%;
        padding: 7px 7px 0px 7px;
        text-align: center;
        margin: 0;
        font-size: 14px;
        font-family: MontserratRegular;
      }
    }
  }
`;

const Blocks = styled.div`
  width: 85%;
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
  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .blocks {
    @media (max-width: 400px) {
      width: 100%;
      margin-bottom: 40px;
    }
    @media (max-width: 500px) {
      width: 100%;
      margin-bottom: 40px;
    }
    width: 31.33%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 60px;
    padding: 0;
    &:hover {
      border: 1px solid #4a86ff;
    }
    h4 {
      font-family: MontserratSemibold;
      font-size: 21px;
      margin-top: 30px;
      margin-bottom: 20px;
      color: #333333;
    }
    p {
      width: 85%;
      text-align: center;
      color: #676f79;
      font-family: MontserratLight;
      font-size: 14px;
      @media (max-width: 400px) {
        line-height: 1.6;
      }
      @media (max-width: 500px) {
        line-height: 1.6;
      }
    }
  }
`;
const Div = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;

  align-items: center;
  margin: 0 auto;
  margin-top: 30px;
  p {
    width: 60%;
    text-align: center;
    color: #676f79;
    font-family: MontserratLight;
    font-size: 14px;
    opacity: 100;
    @media (max-width: 400px) {
      width: 100%;
    }
    @media (max-width: 500px) {
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
  margin-top: 20px;
  .about-us {
    @media (min-width: 500px) {
      display: none;
    }
  }
  .image-icons {
    @media (max-width: 400px) {
      display: none;
    }
    @media (max-width: 500px) {
      display: none;
    }
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 40px;

    .sec {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  .cardss {
    display: flex;
    width: 90%;
    justify-content: space-between;

    @media (max-width: 400px) {
      display: flex;
      flex-direction: column;
      width: auto;
    }
    @media (max-width: 500px) {
      display: flex;
      flex-direction: column;
      width: auto;
    }
    .card {
      @media (max-width: 400px) {
        margin-bottom: 25px;
      }
      @media (max-width: 500px) {
        margin-bottom: 25px;
      }
      background: #ffffff 0% 0% no-repeat padding-box;
      border-radius: 7px;
      box-shadow: 0px 0px 10px #00000029;
      height: 275px;
      width: 300px;
      display: flex;
      flex-direction: column;

      &:hover {
        box-shadow: 0px 12px 30px 0px rgba(0, 0, 0, 0.2);
        transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
        h3 {
          color: #0092e0;
        }
      }
      .line {
        border-bottom: 1px solid grey;
        width: 80%;
        margin: 0 auto;
        margin-bottom: 30px;
      }
      p {
        width: 85%;
        letter-spacing: 0.32px;
        color: #173049;
        font-size: 15px;
        text-align: left;
        margin-left: 30px;
        @media (max-width: 400px) {
          font-size: 16px;
          line-height: 1.4;
        }
        @media (max-width: 500px) {
          font-size: 16px;
          line-height: 1.4;
        }
      }
      h3 {
        color: #173049;
        letter-spacing: 0.7px;
        margin-left: 30px;
        margin-top: 30px;
      }
    }
  }
  @media (max-width: 400px) {
    width: 100%;
  }
  @media (max-width: 500px) {
    width: 100%;
  }
  h2 {
    display: none;
    @media (max-width: 400px) {
      display: block;
      font-size: 30px;
      font-weight: bolder;
    }
    @media (max-width: 500px) {
      display: block;
      font-size: 30px;
      font-weight: bolder;
    }
  }
  @media (max-width: 400px) {
    margin-left: 0px;
    margin-top: 30px;
  }
  @media (max-width: 500px) {
    margin-left: 0px;
    margin-top: 30px;
  }
  h1 {
    font-family: segoebold;
    font-size: 30px;
    margin-top: 45px;
    margin-bottom: 30px;
    @media (max-width: 400px) {
      display: none;
    }
  }
  h1 {
    @media (max-width: 500px) {
      display: none;
    }
  }

  p {
    color: #676f79;
    /* @media (max-width: 400px) {
      display: none;
    } */
  }
  .tabs {
    display: flex;
    justify-content: space-between;
    width: 70%;
    @media (max-width: 400px) {
      display: none;
    }
    @media (max-width: 500px) {
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
    height: 700px;
    margin-bottom: 30px;
  }
  width: 100%;
  height: 100vh;
  background: #0092e0;
  background: transparent linear-gradient(180deg, #0092e0 0%, #1ec3ff 100%) 0%
    0% no-repeat padding-box;
  box-shadow: 0px 10px 30px #00000029;
  .hide-show {
    @media (min-width: 500px) {
      display: none;
    }
    position: fixed;
    z-index: 50;
    height: 100vh;
    width: 100vw;
    top: 0;

    background: #0092e0 0% 0% no-repeat padding-box;
    opacity: 0.95;
    img {
      float: right;
      padding-top: 30px;
      padding-right: 10px;
    }
    ul {
      display: flex;
      flex-direction: column;
      list-style-type: none;
      margin-top: 70px;
      .divider {
        width: 270px;
        border: 1px solid white;
      }
      li {
        letter-spacing: 1.6px;
        color: #ffffff;
        text-transform: uppercase;
        opacity: 1;
        margin-bottom: 40px;
        a {
          text-decoration: none;
          color: white;
        }
      }
      .auth {
        text-decoration: none;
        color: white;
        font-weight: bold;
      }
    }
  }
  .hide {
    display: none;
  }
`;

const NavBar = styled.nav`
  @media (max-width: 400px) {
    padding: 10px 10px;
    display: flex;
    justify-content: space-between;
    /* max-width: 380px%; */
  }
  @media (max-width: 500px) {
    padding: 10px 10px;
    display: flex;
    justify-content: space-between;
    /* max-width: 380px%; */
  }
  display: flex;
  padding-left: 90px;
  align-items: center;
  .menu-icon {
    display: none;
    @media (max-width: 400px) {
      display: block;
      padding-right: 3px;
      color: white;
      font-size: 28px;
    }
    @media (max-width: 500px) {
      display: block;
      padding-right: 3px;
      color: white;
      font-size: 28px;
      overflow: hidden;
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
    @media (max-width: 500px) {
      /* float: left; */
      width: 100px;
      height: 25px;
    }
  }

  .navs {
    @media only screen and (max-width: 400px) {
      display: none;
    }
    @media only screen and (max-width: 500px) {
      display: none;
    }

    ul {
      display: flex;
      padding-left: 350px;
      /* padding-top: 15px; */
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
      .link-to {
        color: white;
        text-decoration: none;
        font-family: segoesemiLight;
      }
      li {
        margin-right: 50px;
        color: white;
        cursor: pointer;
        font-family: segoesemiLight;
        a {
          text-decoration: none;
          color: white;
          font-family: segoesemiLight;
          &:hover {
            color: #66c8ed !important;
          }
        }
        &:hover {
          color: #66c8ed !important;
        }
      }
    }
  }
`;

const Main = styled.main`
  overflow: hidden;
  @media (max-width: 400px) {
    padding-top: 20px;
  }
  @media (max-width: 500px) {
    padding-top: 20px;
  }
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  padding-top: 100px;
  padding-bottom: 30px;
  @media (max-width: 400px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h1 {
    &:nth-child(1) {
      font-size: 3em;
      margin: 0 !important;
    }
  }

  .register {
    width: 100%;
    display: flex;
    .reg {
      color: #0092e0;
      text-decoration: none;
      cursor: pointer;
      font-family: orkneyLight;
      &:hover {
        color: white;
      }
    }
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
        font-family: orkneyLight;
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
    width: 64%;
    height: calc(100vh - 148px);
    margin-right: -98px;
    @media (max-width: 400px) {
      width: 350px;
      height: 200px;
      margin-right: 0;
      margin-top: 40px;
    }
    @media (max-width: 500px) {
      width: 300px;
      height: 200px;
      margin-right: auto;
      margin-left: auto;
      margin-top: 40px;
    }
    @media (min-width: 768px) and (max-width: 1300px) {
      /* height: 385px; */
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
    @media (max-width: 500px) {
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
        font-size: 34px;
        text-align: center;
      }
      @media (max-width: 500px) {
        display: block;
        color: #66c8ed;
        font-weight: lighter;
        font-size: 34px;
        text-align: center;
      }
    }
    h1 {
      font-family: orkneyLight;

      @media (max-width: 400px) {
        display: none;
      }
      @media (max-width: 500px) {
        display: none;
      }
      color: #66c8ed;
      font-weight: lighter;
      font-size: 44px;
      .here {
        color: white;
        cursor: pointer;
        display: inline;
        font-weight: lighter;
      }
    }
    p {
      width: 100%;
      text-align: left;
      font-family: segosemiLight;
      font-size: 18px;
      font-weight: normal;
      letter-spacing: 0px;
      font-weight: lighter;
      color: #ffffff;
      opacity: 0.8;
      margin-top: 40px;
      margin-bottom: 40px;
      @media (max-width: 500px) {
        text-align: center;
        font-size: 18px;
        line-height: 1.6;
        margin-top: 15px;
        margin-bottom: 20px;
      }
    }
  }
`;
