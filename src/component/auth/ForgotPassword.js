import React, { useState } from "react";
import styled from 'styled-components'
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
            <p
              style={{ fontSize: "14px", width: "450px", textAlign: "center" }}
            >
              Check your inbox for the next steps. If you don't receive an
              email, and it's not in your spam folder this could mean you signed
              up with a different address.
            </p>
            <p style={{ textAlign: "center", fontSize: "14px" }}>
              Have an account?
              <Link to="/" style={{ color: "#0092e0", textDecoration: "none" }}>
                Login
              </Link>
            </p>
          </>
        ) : (
          <Div>
          <img src={Logo} alt="CrossCheck" style={{width:'200px',height:'40px'}}/>
            <h3 style={{ textAlign: "center" }}>Having troubles with your password?</h3>
            {loginError.length > 0 && (
              <p style={{ color: "red", textAlign: "center" }}>{loginError}</p>
            )}
            <p className="enter-email">
            Please enter the email address with which you registered, and we’ll send you an email with further instructions.
            </p>
            <div
              className="password-input fields"
              style={{ marginTop: "10px" }}
            >

              <input
                type="text"
                // className="input"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error">{formik.errors.email}</div>
              ) : null}
            </div>
            <button
              type="button"
              className="register-button"
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

const Div =styled.div`
display:flex;
flex-direction:column;
align-items:center;
.enter-email{
width:80%;
text-align:center;
font: normal normal normal 12px Montserrat;
letter-spacing: 0.4px;
color: #707070;
.password-input{
  input{
 border: 2px solid #e2e2e2;
  outline: none;
  border-radius: 9px;
  height: 32px;
  }
}

}
`