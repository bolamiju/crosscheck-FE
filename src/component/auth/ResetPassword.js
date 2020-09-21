import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import {
  resetPassword,
  //   setLoading,
  //   setLoginError,
} from "../../state/actions/users";
import * as Yup from "yup";

function ResetPassword({ match, location }) {
  const [passwordToken, setPasswordToken] = useState("");
  const {
    params: { token },
  } = match;
  useEffect(() => {
    console.log("pass token", token);
    setPasswordToken(token);
  }, [token]);
  //   const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
    },

    onSubmit: async (values) => {
      console.log(values);
      //   dispatch(setLoading(true));
      try {
        const res = await resetPassword(passwordToken, values);
        console.log("RES", res.data);
        //   setSucces(true);
        //   dispatch(setLoading(false));
      } catch (err) {
        console.log("RES", err.response);
        //   if (
        //     err.response.data.message &&
        //     err.response.data.message === "user not found"
        //   ) {
        //     dispatch(setLoginError("No account found"));
        //   }
        //   dispatch(setLoading(false));
      }
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().required("Enter password"),
      confirmPassword: Yup.string()
        .required("Re-enter password")
        .test("passwords-match", "Passwords must match", function (value) {
          return this.parent.newPassword === value;
        }),
    }),
  });
  return (
    <div class="forgot-password">
      <form style={{ width: "70%" }}>
        <h3 style={{ textAlign: "center" }}>Password Reset</h3>
        {/* {loginError.length > 0 && (
              <p style={{ color: "red", textAlign: "center" }}>{loginError}</p>
            )} */}
        <p className="email-text">Create New Password</p>
        <div className="password-input fields" style={{ marginTop: "10px" }}>
          <label>New Password</label>

          <input
            type="text"
            className="newpassword-input"
            name="newPassword"
            id="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.newPassword && formik.errors.newPassword ? (
            <div className="error">Enter pass</div>
          ) : null}
        </div>
        <div className="password-input fields" style={{ marginTop: "10px" }}>
          <label>Confirm password</label>

          <input
            type="text"
            className="newpassword-input"
            name="confirmPassword"
            id="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="error">{formik.errors.confirmPassword}</div>
          ) : null}
        </div>
        <button
          type="button"
          className="resetpassword-button"
          onClick={formik.handleSubmit}
          style={{ fontSize: "14px" }}
        >
          RESET PASSWORD
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
      </form>
    </div>
  );
}

export default ResetPassword;
