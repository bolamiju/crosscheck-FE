import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./auth.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
// import ManHires from "../../asset/ManHiRes.png";
import {
  CountryDropdown,
  //   RegionDropdown,
  //   CountryRegionData,
} from "react-country-region-selector";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

//import css module
import "react-flags-select/css/react-flags-select.css";
import {
  signUp,
  setLoading,
  setRegisterError,
} from "../../state/actions/users";

function Register() {
  const [visibility, setVisibility] = useState(false);
  const [success, setSuccess] = useState(false);
  const [terms, setTerms] = useState(false);
  const dispatch = useDispatch();

  const { registerError, loading } = useSelector((state) => state.user);
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

      console.log(values);
      dispatch(setLoading(true));
      dispatch(setRegisterError(""));
      try {
        const res = await signUp(values);
        formik.resetForm();
        console.log("RES", res.data);
        if (
          res.data.message === "Please check your email for an activation link"
        ) {
          setSuccess(true);
        }
        dispatch(setLoading(false));

        // window.location.href = "/login";
      } catch (err) {
        if (
          err.response.data.message &&
          err.response.data.message === "user already exist"
        ) {
          dispatch(setRegisterError("Email already exist"));
        }
        dispatch(setLoading(false));
      }
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string().email().required("Enter valid email"),
      password: Yup.string().min(8).required("Password is required"),
      country: Yup.string().required("Country is required"),
      phone: Yup.string().required("Phone number is required"),
      accountType: Yup.string().required("Account type is required"),
      accept: Yup.bool().oneOf([true], "Please agree to our terms"),

      companyWebsite: Yup.string().when("accountType", {
        is: "organization",
        then: Yup.string()
          .matches(
            /^((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            "Enter correct url!"
          )
          .required("Please enter company's website"),
      }),
      organizationName: Yup.string().when("accountType", {
        is: "organization",
        then: Yup.string().required("Organization name is required"),
      }),
    }),
  });

  const [country, setCountry] = useState("us");

  return (
    <div className="container">
      <div className="form-section">
        <div className="form-surround">
          <form>
            <h5 className="text-header">Create An Account</h5>

            {registerError.length > 0 && (
              <p className="error">{registerError}</p>
            )}
            {success && (
              <p className="activation-text">
                An account activation link has been sent to your email, check
                your inbox or spam folder
              </p>
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
              <div className="country-input">
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
                  value={formik.values.country}
                  onChange={(_, e) => {
                    formik.handleChange(e);
                    console.log(e.currentTarget.value);
                    setCountry(e.currentTarget.value);
                  }}
                  onBlur={formik.handleBlur}
                  ReactFlagsSelect
                />
                {/* <RegionDropdown
                country={country}
                value={region}
                onChange={selectRegion}
              /> */}
                {formik.touched.country && formik.errors.country ? (
                  <div className="error">{formik.errors.country}</div>
                ) : null}
              </div>
              <div className="phone">
                <label htmlFor="phone">Phone Number</label>
                <PhoneInput
                  country={country}
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

            <button
              type="button"
              className="register-button"
              onClick={formik.handleSubmit}
            >
              {loading ? "CREATING..." : "REGISTER"}
            </button>
            <div className="terms">
              <div className="accept">
                <input
                  type="checkbox"
                  name="accept"
                  id="terms"
                  className="check"
                  style={{ marginRight: "10px" }}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setTerms(!terms);
                  }}
                />
                <span>I agree to the terms and conditions</span>
                {formik.touched.accept && formik.errors.accept ? (
                  <div className="error">{formik.errors.accept}</div>
                ) : null}
              </div>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* <p className="signup-with">Sign up with</p>

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
              </div> */}
              <p className="paragraph">
                Already have an account?
                <Link
                  style={{ color: "#0092e0", textDecoration: "none" }}
                  to="/"
                >
                  Login here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className="image-section">{/* <img src={ManHires} /> */}</div>
    </div>
  );
}

export default Register;
