import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./auth.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login, setLoading, setLoginError } from "../../state/actions/users";
//import css module
import "react-flags-select/css/react-flags-select.css";

const Login = () => {
  const [visibility, setVisibility] = useState(false);

  const dispatch = useDispatch();

  const { loginError, loading } = useSelector((state) => state.user);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      console.log(values);
      dispatch(setLoading(true));
      dispatch(setLoginError(""));
      try {
        const res = await login(values);
        // formik.resetForm();
        console.log("RES", res.data);
        if (res.data.message && res.data.message === "Logged in successfully") {
          window.location.href = `/dashboard/${res.data.user.id}`;
        }
        dispatch(setLoading(false));
      } catch (err) {
        if (
          err.response.data.message &&
          err.response.data.message === "Invalid email or password"
        ) {
          dispatch(setLoginError("invalid email or password"));
        }
        console.log("error", err.response);
        dispatch(setLoading(false));
      }
    },
    validationSchema: Yup.object({
      email: Yup.string().required("email is required"),
      password: Yup.string().required("password is required"),
      //   }),
    }),
  });

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
            <p style={{ fontSize: "14px" }}>Sign in to your account</p>
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
              className="input"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
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
              className="input"
              value={formik.values.password}
              onChange={formik.handleChange}
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
          </div>
          <button
            type="button"
            onClick={formik.handleSubmit}
            className="register-button"
          >
            {loading ? "Signing in..." : "LOGIN"}
          </button>
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
              <Link
                to="/register"
                style={{
                  textDecoration: "none",
                  color: "#0092e0",
                }}
              >
                Create one here
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div className="login-image-section">{/* <img src={men} /> */}</div>
    </div>
  );
};

export default Login;
