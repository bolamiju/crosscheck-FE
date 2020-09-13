import React, { useState } from "react";
import "./auth.css";
import men from "../../asset/mens.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  CountryDropdown,
  //   RegionDropdown,
  //   CountryRegionData,
} from "react-country-region-selector";

import ReactFlagsSelect from "react-flags-select";

//import css module
import "react-flags-select/css/react-flags-select.css";

function Register() {
  const [visibility, setVisibility] = useState(false);

  return (
    <div className="container">
      <div className="form-section">
        <form>
          <h3 style={{ color: "#FF2600" }}>Create An Account</h3>
          <p style={{ fontSize: "12px", width: "100%", marginBottom: "30px" }}>
            Created for job applicants and hiring managers who wants to stay
            ahead
          </p>
          <div className="name-section">
            <div className="firstname-input">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                className="input"
              />
            </div>
            <div className="lastname-input">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="input"
              />
            </div>
          </div>
          <div className="email-input">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" className="input" />
          </div>
          <div className="select-input">
            <label htmlFor="email">Are you an</label>
            <select className="input" style={{ height: "40px" }}>
              <option>Organization</option>
              <option>Individual</option>
            </select>
          </div>
          <div className="country-phone">
            <div className="country-input">
              <label htmlFor="country">Country</label>
              <CountryDropdown
                name="country"
                id="country"
                className="input"
                //   value={country}
                //   onChange={(val) => this.selectCountry(val)}
                style={{ height: "33px" }}
              />
            </div>
            <div className="phone">
              <label htmlFor="phone">Phone Number</label>
              <input type="text" name="phone" id="phone" className="input" />
            </div>
          </div>
          <div className="password-input" style={{ position: "relative" }}>
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
          <button className="register-button">REGISTER</button>
          <div className="terms">
            <div className="accept">
              <input
                type="checkbox"
                name="check"
                style={{ marginRight: "10px" }}
              />
              <span style={{ fontSize: "14px" }}>
                I agree to the terms and conditions
              </span>
            </div>
            <a
              href="https://google.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", fontSize: "14px" }}
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
            <p style={{ marginTop: "40px", fontSize: "14px" }}>
              Already have an account?
              <a
                href="https://google.com"
                style={{
                  textDecoration: "none",
                }}
              >
                Login here
              </a>
            </p>
          </div>
        </form>
      </div>
      <div className="image-section">{/* <img src={men} /> */}</div>
    </div>
  );
}

export default Register;
