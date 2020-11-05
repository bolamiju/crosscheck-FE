import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Logo from "../../asset/CrossCheckLogo.png";

import {
  forgotPassword,
  setLoading,
  setLoginError,
} from "../../state/actions/users";

const ForgotPassword = () => {
  const [success, setSucces] = useState(false);
  const { loginError, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
    },

    onSubmit: async (values) => {
      console.log(values);
      dispatch(setLoading(true));
      try {
        const res = await forgotPassword(values);
        console.log("RES", res.data);
        setSucces(true);
        dispatch(setLoading(false));
      } catch (err) {
        console.log("RES", err.response);
        if (
          err.response.data.message &&
          err.response.data.message === "user not found"
        ) {
          dispatch(setLoginError("No account found"));
        }
        dispatch(setLoading(false));
      }
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("email is required"),
      //   }),
    }),
  });
  return (
    <div class="forgot-password">
      <form>
        {success ? (
          <>
            <p className="forgot-password-content">
              Check your inbox for the next steps. If you don't receive an
              email, and it's not in your spam folder this could mean you signed
              up with a different address.
            </p>
            <p className="has-account">
              Have an account?
              <Link to="/" style={{ color: "#0092e0", textDecoration: "none" }}>
                Login
              </Link>
            </p>
          </>
        ) : (
          <Div>
            <img src={Logo} alt="CrossCheck" className="forgot-pass-img" />
            <h3 style={{ textAlign: "center" }}>
              Having troubles with your password?
            </h3>
            {loginError.length > 0 && (
              <p style={{ color: "red", textAlign: "center" }}>{loginError}</p>
            )}
            <p className="enter-email">
              Please enter the email address with which you registered, and
              we’ll send you an email with further instructions.
            </p>
            <div
              className="password-input fields"
              style={{ marginTop: "10px" }}
            >
              <input
                type="text"
                className="forgot-pass-input"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="passw-error">{formik.errors.email}</div>
              ) : null}
            </div>
            <button
              type="button"
              className="submit-button"
              onClick={formik.handleSubmit}
              style={{ fontSize: "14px" }}
            >
              {loading ? "Requesting" : "SUBMIT"}
            </button>
            <div className="reset-create">
              <p>
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "#0092e0" }}
                >
                  Login to your account
                </Link>
              </p>
              <p style={{ color: "#0092e0" }}>Home</p>
            </div>
          </Div>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .enter-email {
    width: 80%;
    text-align: center;
    font: normal normal normal 12px Montserrat;
    letter-spacing: 0.4px;
    color: #707070;
    opacity: 0.8;
    @media (max-width: 400px) {
      width: 100%;
      font-size: 14px;
    }
  }
  .password-input {
    display: flex;
    justify-content: center;
    width: 100%;
    input {
      outline: 0;
      height: 40px;
      width: 80%;
      margin: 0 auto;
      border: 2px solid #70707061;
      border-radius: 35px;
      padding-left: 20px;
      @media (max-width: 400px) {
        font-size: 16px;
      }
    }
    .passw-error {
      color: red;
      font-size: 14;
      text-align: center;
    }
  }
  .submit-button {
    outline: 0;
    height: 40px;
    border-radius: 15px;
    width: 350px;
    margin-top: 25px;
    background: #0092e0 0% 0% no-repeat padding-box;
    border: 2px solid #0092e0;
    border-radius: 35px;
    color: white;
    @media (max-width: 400px) {
      margin-top: 0 !important;
      width: 200px;
    }
  }
`;
