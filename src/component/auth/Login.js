import React, { useState } from "react";
import "./auth.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";

//import css module
import "react-flags-select/css/react-flags-select.css";

const Login = () => {
  const [visibility, setVisibility] = useState(false);

  return (
    <div className="container">
      <div className="form-section" id="login-section">
        <form>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "-10px",
            }}
          >
            <h3 style={{ color: "#FF2600" }}>Great to see you again</h3>
            <p style={{ fontSize: "14px", marginTop: "-5px" }}>
              Sign in to your account
            </p>
          </div>

          <div className="email-input fields">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" className="input" />
          </div>

          <div
            className="password-input fields"
            style={{ position: "relative" }}
          >
            <label>Enter password</label>

            <input type={!visibility ? "text" : "password"} className="input" />
            {!visibility ? (
              <FontAwesomeIcon
                icon={faEyeSlash}
                className="custom-icon"
                onClick={() => setVisibility(!visibility)}
              />
            ) : (
              <FontAwesomeIcon
                icon={faEye}
                className="custom-icon"
                onClick={() => setVisibility(!visibility)}
              />
            )}
          </div>
          <button className="register-button">LOGIN</button>
          <div className="terms">
            <div className="accept">
              <input
                type="checkbox"
                name="check"
                className="check"
                style={{ marginRight: "10px" }}
              />
              <span>Remember me</span>
            </div>
            <a
              href="https://google.com"
              target="_blank"
              rel="noopener noreferrer"
              //   style={{ textDecoration: "none", fontSize: "14px" }}
            >
              forgot password
            </a>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p>Sign up with</p>

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <button className="facebook">
                <FontAwesomeIcon
                  icon={faFacebookF}
                  style={{
                    background: "#0092e0",
                    color: "white",
                    fontSize: "16px",
                  }}
                />{" "}
                Facebook
              </button>
              <button className="google">
                <FontAwesomeIcon
                  icon={faGoogle}
                  style={{
                    background: "#FF2600",
                    color: "white",
                    fontSize: "16px",
                  }}
                />{" "}
                Google
              </button>
            </div>
            <p className="paragraph">
              Don't have an account?
              <a
                href="https://google.com"
                style={{
                  textDecoration: "none",
                }}
              >
                Create one here
              </a>
            </p>
          </div>
        </form>
      </div>
      <div className="image-section">{/* <img src={men} /> */}</div>
    </div>
  );
};

export default Login;
