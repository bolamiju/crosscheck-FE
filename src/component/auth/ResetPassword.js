import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import Logo from "../../asset/CrossCheckLogo.png";
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
      <form>
        <Div>
          <img src={Logo} alt="CrossCheck" className="forgot-pass-img" />
          <h3 style={{ textAlign: "center" }}>Create a New Password</h3>
          <div className="password-input fields">
            <label className="pass-label" htmlFor="email">
              New Password
            </label>
            <input
              type="text"
              className="forgot-pass-input"
              name="newPassword"
              id="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />{" "}
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <div className="passw-error">Enter password</div>
            ) : null}
          </div>
          <div className="password-input fields">
            <label className="confirm-label" htmlFor="email">
              Confirm Password
            </label>
            <input
              type="text"
              className="forgot-pass-input"
              name="confirmPassword"
              id="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="passw-error">{formik.errors.confirmPassword}</div>
            ) : null}
          </div>
          <button
            type="button"
            className="submit-button"
            onClick={formik.handleSubmit}
          >
            RESET PASSWORD
          </button>

          <div className="recover-pass">
            <p>
              If you are having problems recovering your password
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "#0092e0" }}
              >
                <br />
                contact us
              </Link>
              &nbsp; or go
              <Link
                to="/home"
                style={{ textDecoration: "none", color: "#0092e0" }}
              >
                &nbsp; Home
              </Link>
            </p>
          </div>
        </Div>
      </form>
    </div>
  );
}

export default ResetPassword;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    @media (max-width: 400px) {
      font-size: 28px;
    }
  }
  .recover-pass {
    p {
      text-align: center;
      letter-spacing: 0.32px;
      opacity: 1;
      @media (max-width: 400px) {
        font-size: 16px;
        width: 100%;
      }
    }
  }
  .enter-email {
    width: 80%;
    text-align: center;
    font: normal normal normal 12px Montserrat;
    letter-spacing: 0.4px;
    color: #707070;
    opacity: 0.8;
  }
  .password-input {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 20px;
    .pass-label,
    .confirm-label {
      font-weight: bold !important;
      margin-left: 15px;
      @media (max-width: 400px) {
      }
    }
    input {
      outline: 0;
      height: 40px;
      width: 100%;
      margin: 0 auto;
      margin-bottom: 0;
      border: 2px solid #70707061;
      border-radius: 35px;
      padding-left: 20px;
      @media (max-width: 400px) {
        font-size: 16px;
        height: 50px;
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
    margin: 0 auto;
    width: 350px;
    margin-top: 10px;
    background: #0092e0 0% 0% no-repeat padding-box;
    border: 2px solid #0092e0;
    border-radius: 35px;
    color: white;
    letter-spacing: 1px;
    cursor: pointer;
    padding-top: 10px;
    padding-bottom: 10px;
    @media (max-width: 400px) {
      height: 60px;
      font-size: 18px;
      width: 300px;
    }
  }
`;
