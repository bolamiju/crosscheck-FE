import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./auth.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import crosscheckTm from "../../asset/crosscheckTm.svg";
import { ReactComponent as Check } from "../../asset/check.svg";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useFormik } from "formik";
import { BASE_URL } from "../../state/constant/constants";
import { loginValidation } from "./Validation";
import {
  login,
  setLoading,
  setLoginError,
  setUser,
} from "../../state/actions/users";
//import css module
import "react-flags-select/css/react-flags-select.css";

const Login = (props) => {
  const [visibility, setVisibility] = useState(false);
  const [remember, setRemember] = useState(false);

  const dispatch = useDispatch();

  const { loginError, loading } = useSelector((state) => state.user);

  useEffect(() => {
    return () => {
      dispatch(dispatch(setLoginError("")));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      dispatch(setLoading(true));
      dispatch(setLoginError(""));
      try {
        const res = await login(values);

        if (res.data.message && res.data.message === "Logged in successfully") {
          dispatch(setUser(res.data.user));
          localStorage.setItem("crosscheckuser", JSON.stringify(res.data.user));
          formik.resetForm();

          // window.location.href = `/dashboard/${res.data.user.id}`;
          props.history.push(`/dashboard/${res.data.user.id}`);
        }
        dispatch(setLoading(false));
      } catch (err) {
        if (
          err.response.data.message &&
          err.response.data.message === "invalid email or password"
        ) {
          dispatch(setLoginError("Invalid email or password"));
        } else if (
          err.response.data.message &&
          err.response.data.message === "Account not activated"
        ) {
          toast.error("Account not activated");
        }
        dispatch(setLoading(false));
      }
    },
    validationSchema: loginValidation,
  });
  const responseGoogle = (response) => {
    console.log("HIIIIII");
    axios({
      method: "POST",
      url: `${BASE_URL}/api/v1/users/googlelogin`,
      data: { tokenId: response.tokenId },
    })
      .then((response) => {
        localStorage.setItem(
          "crosscheckuser",
          JSON.stringify(response.data.user)
        );
        window.location.href = `/dashboard/${response.data.user.id}`;
      })
      .catch((err) => {
        if (
          err.response.data.message ===
          "No account associated with this google account"
        ) {
          return toast.error("No account associated with gmail account");
        }
      });
  };

  const responseFacebook = (response) => {
    axios({
      method: "POST",
      url: `${BASE_URL}/api/v1/users/facebooklogin`,
      data: { accessToken: response.accessToken, userID: response.userID },
    }).then((response) => {
      localStorage.setItem(
        "crosscheckuser",
        JSON.stringify(response.data.user)
      );
      window.location.href = `/dashboard/${response.data.user.id}`;
    });
  };

  return (
    <div className="container">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="top-nav">
        <img className="crosschecklogo" src={crosscheckTm} alt="" />
      </div>
      <div className="main-sec">
        <div className="form-section">
          <div className="form-wrapper login-wrapper">
            <form className="form-surround" onSubmit={formik.handleSubmit}>
              <div className="info-container">
                <h3 className="great">Great to See you again</h3>
                <p
                  style={{
                    fontSize: "14px",
                    fontFamily: "poppins",
                    color: "#707070",
                  }}
                >
                  Sign in to your account
                </p>
                {loginError.length > 0 && (
                  <p style={{ color: "red" }}>{loginError}</p>
                )}
              </div>

              <div className="email-input fields">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="input logininput"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="error">{formik.errors.email}</div>
                ) : null}
              </div>

              <div
                className="password-input fields"
                style={{ position: "relative" }}
              >
                <label>Enter password</label>

                <input
                  type={!visibility ? "password" : "text"}
                  name="password"
                  id="password"
                  className="input passwordinput"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {!visibility ? (
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    className="visible-icon"
                    onClick={() => setVisibility(!visibility)}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faEye}
                    className="visible-icon"
                    onClick={() => setVisibility(!visibility)}
                  />
                )}
                {formik.touched.password && formik.errors.password ? (
                  <div className="error">{formik.errors.password}</div>
                ) : null}
              </div>
              <button type="submit" className="register-button loginbtn">
                {loading ? "Signing in..." : "LOGIN"}
              </button>
              {/* <div className="terms">
              <div className="accept">
                <input
                  type="checkbox"
                  name="check"
                  className="check"
                  style={{ marginRight: "10px" }}
                />
                <span>Remember me</span>
              </div>
              <Link to="/forgotpassword">Forgot password?</Link>
            </div> */}
              <div
                className="terms"
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div className="accept" onClick={() => setRemember(!remember)}>
                  <div
                    className="agree-box"
                    style={{
                      background: remember ? "#0092e0" : "",
                      borderColor: remember ? "#0092e0" : "#e2e2e2",
                    }}
                  >
                    {remember && <Check />}
                  </div>
                  <span>Remember me</span>
                </div>
                <Link to="/forgotpassword">Forgot password?</Link>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* <p className="signup-with">Login with</p> */}

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "15px",
                  }}
                >
                  <FacebookLogin
                    appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
                    callback={responseFacebook}
                    textButton={
                      <>
                        <FontAwesomeIcon
                          icon={faFacebookF}
                          style={{
                            background: "#0092e0",
                            color: "white",
                            fontSize: "16px",
                          }}
                        />
                        <span>&nbsp;Continue with Facebook</span>
                      </>
                    }
                    buttonStyle={{
                      // width: "48%",
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      textTransform: "none",
                      height: "20px",
                      fontSize: "14px",
                      background: " #0092e0 0% 0% no-repeat padding-box",
                      borderRadius: "9px",
                      outline: " none",
                      border: "1px solid #0092e0",
                      color: " white",
                    }}
                  ></FacebookLogin>
                  <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_APP_ID}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy="single_host_origin"
                    buttonText="Google"
                    icon={false}
                    className="google"
                  >
                    <FontAwesomeIcon
                      icon={faGoogle}
                      style={{
                        background: "#FF2600",
                        color: "white",
                        fontSize: "16px",
                      }}
                    />{" "}
                    {/* <span>Continue with Google</span> */}
                  </GoogleLogin>
                </div>
                <p className="paragraph">
                  Don't have an account?
                  <Link
                    to="/register"
                    style={{
                      textDecoration: "none",
                      color: "#0092e0",
                    }}
                  >
                    &nbsp; Create One Here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className="image-section"></div>
      </div>
    </div>
  );
};

export default Login;
