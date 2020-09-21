import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

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
          <>
            <h3 style={{ textAlign: "center" }}>Password Reset</h3>
            {loginError.length > 0 && (
              <p style={{ color: "red", textAlign: "center" }}>{loginError}</p>
            )}
            <p className="email-text">
              Enter your email address to receive reset link
            </p>
            <div
              className="password-input fields"
              style={{ marginTop: "10px" }}
            >
              <label>Enter email</label>

              <input
                type="text"
                className="input"
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
          </>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
