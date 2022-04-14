import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./auth.css";
import { ReactComponent as Check } from '../../asset/check.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import { CountryDropdown } from "react-country-region-selector";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { signUpValidation } from "./Validation";
import ipapi from 'ipapi.co'

//import css module
import "react-flags-select/css/react-flags-select.css";
import {
  signUp,
  setLoading,
  setRegisterError,
  setLoginError,
} from "../../state/actions/users";

function Register() {
  const [visibility, setVisibility] = useState(false);
  const [success, setSuccess] = useState(false);
  const [terms, setTerms] = useState(false);
  const [counstrySelected, setCountrySelected] = useState("us");
  const [userEmail, setUserEmail] = useState("");
  const dispatch = useDispatch();

  const { registerError, loading } = useSelector((state) => state.user);

  useEffect(()=>{
    ipapi.location((loca) => {
      setCountrySelected(loca.toLowerCase())
    }, "", "", "country");
  },[])

  useEffect(()=>{
    ipapi.location((loca) => {
      formik.setFieldValue("country", loca)
    }, "", "", "country");
    
  },[])

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      accountType: "",
      password: "",
      country: "",
      companyWebsite: "",
      organizationName: "",
      accept: false,
      // ...(employeeStatus === "DISABLED" ? { employmentStartDate: "" } : null),
    },

    onSubmit: async (values) => {
      for (var propName in values) {
        if (
          values[propName] === null ||
          values[propName] === undefined ||
          values[propName] === "" ||
          values[propName] === true
        ) {
          delete values[propName];
        }
      }

      dispatch(setLoading(true));
      dispatch(setRegisterError(""));
      console.log('values',values)
      // try {
      //   const res = await signUp(values);
      //   formik.resetForm();
      //   if (
      //     res.data.message === "Please check your email for an activation link"
      //   ) {
      //     setSuccess(true);
      //     setUserEmail(values.email);
      //   }
      //   dispatch(setLoading(false));

      //   // window.location.href = "/login";
      // } catch (err) {
      //   if (
      //     err.response.data.message &&
      //     err.response.data.message === "user already exist"
      //   ) {
      //     dispatch(setRegisterError("Email already exist"));
      //   }
      //   dispatch(setLoading(false));
      // }
    },
    validationSchema: signUpValidation,
  });

  return (
    <div className="container">
      {success ? (
        <div className="activated-section">
          <div className="activated-wrapper">
            <h3>Account created successfuly</h3>
            <p>
              We've sent an account activation link to
              <br />
              <span>{userEmail}. Please check your inbox, spam or promotions folder.</span>{" "}
            </p>

            <p>Click on the link to activate your account</p>
            <button>
              <Link
                className="login-redirect"
                to="/login"
                onClick={() => dispatch(setLoginError(""))}
              >
                Login
              </Link>
            </button>
          </div>
        </div>
      ) : (
        <div className="form-section">
          <div className="form-wrapper">
            <form className="form-surround" onSubmit={formik.handleSubmit}>
              <h5 className="text-header">Create An Account</h5>

              {registerError.length > 0 && (
                <p className="error exist">{registerError}</p>
              )}

              <div className="name-section fields">
                <div className="firstname-input">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="input"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <div className="error">{formik.errors.firstName}</div>
                  ) : null}
                </div>
                <div className="lastname-input ">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="input"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <div className="error">{formik.errors.lastName}</div>
                  ) : null}
                </div>
              </div>
              <div className="email-input fields">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="input"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="error">{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="country-phone fields">
                <div className="country-input acctype">
                  <label htmlFor="email">Is this an</label>
                  <select
                    name="accountType"
                    id="accountType"
                    className="input"
                    value={formik.values.accountType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="" disabled selected>
                      Select an Option
                    </option>
                    <option value="individual">Individual</option>
                    <option value="organization">Organization</option>
                  </select>
                  {formik.touched.accountType && formik.errors.accountType ? (
                    <div className="error">{formik.errors.accountType}</div>
                  ) : null}
                </div>
                {formik.values.accountType === "organization" && (
                  <div className="phone">
                    <label htmlFor="email">Company Name</label>
                    <input
                      type="text"
                      name="organizationName"
                      id="organizationName"
                      className="input"
                      value={formik.values.organizationName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.organizationName &&
                    formik.errors.organizationName ? (
                      <div className="error">
                        {formik.errors.organizationName}
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
              <div className="country-phone fields">
                <div className="country-input">
                  <label htmlFor="country">Country</label>
                  <CountryDropdown
                    name="country"
                    id="country"
                    className="country"
                    valueType="short"
                    value={formik.values.country}
                    onChange={(_, e) => {
                      formik.handleChange(e);
                      setCountrySelected(e.target.value.toLowerCase());
                    }}
                    onBlur={formik.handleBlur}
                  />

                  {formik.touched.country && formik.errors.country ? (
                    <div className="error">{formik.errors.country}</div>
                  ) : null}
                </div>
                <div className="phone">
                  <label htmlFor="phone">Phone Number</label>
                  <PhoneInput
                    country={counstrySelected}
                    type="text"
                    name="phone"
                    id="phone"
                    className="react-phone"
                    value={formik.values.phone}
                    onChange={(e) => {
                      formik.setFieldValue("phone", e);
                    }}
                    onBlur={formik.handleBlur}
                    searchPlaceholder
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className="error">{formik.errors.phone}</div>
                  ) : null}
                </div>
              </div>
              <div
                className="password-input fields"
                style={{ position: "relative" }}
              >
                <label>Enter password</label>

                <input
                  name="password"
                  id="password"
                  type={!visibility ? "password" : "text"}
                  className="input"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
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
                {formik.touched.password && formik.errors.password ? (
                  <div className="error">{formik.errors.password}</div>
                ) : null}
              </div>

              {formik.values.accountType === "organization" && (
                <div
                  className="password-input fields"
                  style={{ marginTop: "10px" }}
                >
                  <label>Company's website</label>

                  <input
                    type="text"
                    className="input"
                    name="companyWebsite"
                    id="companyWebsite"
                    value={formik.values.companyWebsite}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.companyWebsite &&
                  formik.errors.companyWebsite ? (
                    <div className="error">{formik.errors.companyWebsite}</div>
                  ) : null}
                </div>
              )}
              <div className="terms">
                <div className="accept" onClick={()=>{
                    formik.setFieldValue("accept",!formik.values.accept)}}>
                  
                  <div className="agree-box" style={{background: formik.values.accept ? '#0092e0' : '', borderColor: formik.values.accept ? "#0092e0" : "#e2e2e2"}}>
                 {formik.values.accept && <Check/>}
                  </div>
                  <span>I agree to the <a href='/terms' target="_blank" rel="noopener noreferrer" style={{color:"rgb(0, 146, 224)"}} onClick={(e)=>e.stopPropagation()}>terms and conditions</a></span>
                </div>
                  {formik.touched.accept && formik.errors.accept ? (
                    <div className="error" style={{textAlign:'center'}}>{formik.errors.accept}</div>
                  ) : null}
              </div>
              <button
                type="submit"
                className="register-button"
                // onClick={formik.handleSubmit}
              >
                {loading ? "CREATING..." : "REGISTER"}
              </button>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p className="paragraph">
                  Already have an account? &nbsp;
                  <Link
                    style={{ color: "#0092e0", textDecoration: "none" }}
                    to="/login"
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="image-section"></div>
    </div>
  );
}

export default Register;
