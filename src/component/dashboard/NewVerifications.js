import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import arrow from "../../asset/arrow-right.svg";
import Logo from "../../asset/CrossCheckLogo.png";
import axios from "axios";
import "./ver.css";
import { Prompt, useHistory } from "react-router-dom";
import styled from "styled-components";
import Layout from "./DashboardLayout";
import start from "../../asset/start.svg";
import details from "../../asset/details.svg";
import payment from "../../asset/process_payment.svg";
import finish from "../../asset/finish.svg";
import bell from "../../asset/details.svg";

import {
  addVerificationList,
  deleteVerification,
  selectSchool,
} from "../../state/actions/verifications";
import VerificationForm from "./VerificationForm";
import Pdf from "react-to-pdf";

import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import ipapi from "ipapi.co";

const request = (data, tranId) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });
  axios({
    data: formData,
    method: "post",
    url: `https://crosschek.herokuapp.com/api/v1/verifications/request/${tranId}`,
    headers: { "Content-Type": "multipart/form-data" },
  });
};
// TODO: CHANGE ID TO THIS DATE-TIME STRING
// var currentdate = new Date();
// var datetime = currentdate.getDate()
//                 + (currentdate.getMonth()+1)  +
//                 + currentdate.getFullYear() +
//                 + currentdate.getHours() +
//                 + currentdate.getMinutes() +
//                 + currentdate.getSeconds()

const NewVerifications = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { verifications, selectedInstitution } = useSelector(
    (state) => state.verifications
  );

  const ref = React.createRef();

  useEffect(() => {
    ipapi.location((loca) => setUserCountry(loca), "", "", "country");
  }, []);

  const formData = {
    firstName: "",
    institution: selectedInstitution?.name || "",
    lastName: "",
    middleName: "",
    dateOfBirth: "",
    studentId: "",
    course: "",
    qualification: "",
    classification: "",
    admissionYear: "",
    graduationYear: "",
    enrollmentStatus: false,
  };
  let [isBlocking, setIsBlocking] = useState(true);
  const [userCountry, setUserCountry] = useState("");
  const convertedUsd = 382;

  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();
  const date = `${year}${month}${day}${hours}${minutes}${seconds}`;
  const splitDate = `${month}-${day}-${year}`

  const initialVerifications = useSelector(
    (state) => state.verifications.verifications
  );
  const [formValues, setFormValues] = useState([{ ...formData, id: date }]);

  const [requestList, setRequestList] = useState(false);

  const [checked, setChecked] = useState(false);
  const verificationsLength = formValues.length;

  useEffect(() => {
    if (initialVerifications.length) {
      setFormValues(initialVerifications);
    }
  }, [initialVerifications.length]);

  const handleCheck = (e) => {
    setChecked(e.target.checked);
  };
  const verify = async () => {
    for (let i = 0; i < formValues.length; i++) {
      for (const property in formValues[i]) {
        if (formValues[i][property] === "") {
          return toast.error(`please fill all fields and submit details`);
        }
      }
    }
    dispatch(addVerificationList(formValues));
    setRequestList(true);
  };
  const processPayment = async (tranId) => {
    await Promise.allSettled(formValues.map((value) => request(value, tranId)));
  };
  const addNewForm = () => {
    setFormValues((values) => [
      ...values,
      { ...formData, id: date, institution: "" },
    ]);
  };

  const updateFormValues = (id) => (data) => {
    setFormValues((formValues) =>
      formValues.map((value) => (value.id === id ? data : value))
    );
  };

  const deleteOneVerification = (id) => {
    const vals = formValues.filter((v) => v.id !== id);
    setFormValues(vals);
  };

  const toDollar = (amount) => {
    return (Number(amount) / Number(convertedUsd)).toFixed(2);
  };
  let totalOurCharge = verifications?.reduce(
    (accumulator, currentValue) =>
      accumulator +
      Number(
        userCountry === "NG"
          ? currentValue["our_charge"]
          : toDollar(currentValue["our_charge"])
      ),
    0
  );

  let totalInstituteCharge = verifications?.reduce(
    (accumulator, currentValue) =>
      accumulator +
      Number(
        userCountry === "NG"
          ? currentValue["institute_charge"]
          : toDollar(currentValue["institute_charge"])
      ),
    0
  );
  const total =
    (totalOurCharge ? totalOurCharge : 0) +
    (totalInstituteCharge ? totalInstituteCharge : 0);

  const removeVerification = (val) => {
    dispatch(deleteVerification(val));
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const config = {
    public_key: process.env.REACT_APP_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: total,
    currency: userCountry === "NG" ? "NGN" : "USD",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: user?.email,
      phonenumber: user?.phone,
      name: `${user?.firstName} ${user?.lastName}`,
    },
    customizations: {
      title: "CrossCheck",
      description: "Payment for verification",
      logo:
        "https://i.ibb.co/f048df8/logo.png",
    },
  };

  const fwConfig = {
    ...config,
    text: "Pay Now!",
    callback: (response) => {
      if (response?.status === "successful") {
        closePaymentModal(); // this will close the modal programmatically
        processPayment(response?.transaction_id);
        dispatch(addVerificationList([]));
        setRequestList(false);
        setFormValues([formData]);
        dispatch(selectSchool({}));
        toast.success("request submitted");
        setTimeout(() => {
          history.push(`/dashboard/${user.id}`);
        }, 1500);
      }
    },
    onClose: () => {},
  };

  return (
    <div>
      <Layout>
        <VerificationBody>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            style={{ marginTop: "20px" }}
          />
          <Prompt
            when={isBlocking}
            message={(location) =>
              `Are you sure you want to go to ${location.pathname}`
            }
          />
          <div className={requestList ? "none" : ""}>
            {" "}
            <h2 className="new-heading">New Verification</h2>
            <p classNam="new-para">Education Verification</p>
          </div>
          <IconDiv>
            <div>
              <img src={start} alt="starts" style={{ color: "blue" }} />
            </div>
            <Line></Line>
            <img src={details} alt="details" />
            <Line></Line>
            <img src={payment} alt="details" />
            <Line></Line>
            <img src={finish} alt="details" />
          </IconDiv>
          <div className="step-text">
            <span style={{ paddingLeft: "50px" }}>START</span>
            <span style={{ paddingLeft: "15px" }}>VERIFICATION DETAILS</span>
            <span style={{ paddingRight: "35px" }}>PROCESS PAYMENT</span>
            <span style={{ paddingRight: "45px" }}>FINISH</span>
          </div>

          {formValues.map((value) => (
            <div className={requestList ? "none" : ""} key={value.id}>
              {" "}
              <VerificationForm
                verificationsLength={verificationsLength}
                initialValues={value}
                updateFormValues={updateFormValues(value.id)}
                id={value.id}
                deleteOneVerification={deleteOneVerification}
              />
            </div>
          ))}
          <div className={requestList ? "none" : "bottom-button"}>
            <button onClick={addNewForm} className="add-new-btn">
              Add New Verification <FontAwesomeIcon icon={faPlus} />
            </button>
            <div className="line"></div>
            <div className="consent">
              <input
                type="checkbox"
                value={checked}
                name="checked"
                onChange={handleCheck}
              />
              <span>
                I hold the written consent of the individuals named above and
                have provided copies of these consents where requested.
              </span>
            </div>
            <button
              onClick={verify}
              className={!checked ? "notallowed proceed" : "proceed"}
              disabled={!checked}
            >
              Proceed to pay <img src={arrow} alt="right" />
            </button>
          </div>
          {requestList && (
            <SelectSch>
              <div className="new-table invoice-table" ref={ref}>
                <div className="first-section">
                  <div className="img-text">
                    <img src={Logo} alt="" />
                  </div>
                  <h1>Invoice</h1>
                </div>
                <div className="second-section">
                  <div className="customer">
                    <strong style={{ fontSize: "20px" }}>
                      Customer Details
                    </strong>
                    <p
                      style={{ margin: "0", color: "black", fontWeight: "500" }}
                    >
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p>{user?.organizationName || ""}</p>
                  </div>
                  <div className="invoice">
                    <div className="date">
                      <p>
                        {" "}
                        <strong>Invoice Date</strong>
                      </p>
                      <p>
                        {" "}
                        <strong>Amount</strong>
                      </p>
                    </div>
                    <div className="info">
                      <p>{splitDate}</p>
                      {userCountry === "NG" ? (
                        <p style={{ fontWeight: "bold" }}>&#8358;{total}</p>
                      ) : (
                        <p style={{ fontWeight: "bold" }}>${total}</p>
                      )}
                    </div>
                  </div>
                </div>
                <table
                  cellSpacing="0"
                  cellPadding="0"
                  border="0"
                  className="ideTable"
                >
                  <thead className="table-headers">
                    <tr>
                      <th>Name</th>
                      <th>Our Charge</th>
                      <th>Institute Charge</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {verifications.length > 0 &&
                      verifications.map((ver) => {
                        return (
                          <tr key={ver.name}>
                            <th className="mobile-header">Number</th>
                            <td>{ver.name}</td>
                            <th className="mobile-header">Weight</th>
                            {userCountry === "NG" ? (
                              <td>&#8358;{ver["our_charge"]}</td>
                            ) : (
                              <td>${toDollar(ver["our_charge"])}</td>
                            )}
                            <th className="mobile-header">Value</th>
                            {userCountry === "NG" ? (
                              <td>&#8358;{ver["institute_charge"]}</td>
                            ) : (
                              <td>${toDollar(ver["institute_charge"])}</td>
                            )}
                            <td>
                              <FontAwesomeIcon
                                icon={faTrash}
                                // className="menu-icon"
                                onClick={() => removeVerification(ver.id)}
                              />
                            </td>
                          </tr>
                        );
                      })}

                    <td></td>

                    <td style={{ color: "black", fontWeight: "bold" }}>
                      TOTAL
                    </td>
                    {userCountry === "NG" ? (
                      <td style={{ fontWeight: "bold" }}>&#8358;{total}</td>
                    ) : (
                      <td style={{ fontWeight: "bold" }}>${total}</td>
                    )}
                    <td></td>
                  </tbody>
                </table>
                <Pdf targetRef={ref} filename="receipt.pdf">
                  {({ toPdf }) => (
                    <button
                      style={{
                        backgroundColor: "#0092e0",
                        border: "none",
                        padding: "0.8rem",
                        color: "#ffffff",
                        float: "right",
                        marginRight: "1.5rem",
                        borderRadius: "15px",
                        outline: "none",
                        cursor: "pointer",
                      }}
                      onClick={toPdf}
                    >
                      Print Invoice
                    </button>
                  )}
                </Pdf>
              </div>
              <div className="buttons">
                <button
                  className="add-btn"
                  onClick={() => setRequestList(false)}
                >
                  <FontAwesomeIcon icon={faPlus} />
                  Add another Verification &nbsp;{" "}
                </button>
                <FlutterWaveButton {...fwConfig} className="btn" />
              </div>
            </SelectSch>
          )}
        </VerificationBody>
      </Layout>
    </div>
  );
};

export default NewVerifications;

const VerificationBody = styled.div`
  height: 100%;
  padding-left: 30px;
  overflow-y: scroll;
  padding-right: 30px;
  background: #fafafb;
  @media (max-width: 500px) {
    padding-right: 25px;
    padding-left: 25px;
  }
  .new-heading {
    font-family: MontserratRegular;
    letter-spacing: 0px;
    color: #0092e0;
    opacity: 1;
    font-size: 32px;
    font-weight: lighter;
  }
  .new-para {
    font-family: segoebold;
    letter-spacing: 0.44px;
    color: #707070;
    opacity: 1;
  }
  .step-text {
    width: 64%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    font-size: 12px;
    margin-top: 20px;
    text-align: center;
    opacity: 1;
    font-family: MontserratRegular;
    color: #707070;
    @media (max-width: 500px) {
      display: none;
    }
  }
  .none {
    display: none;
  }
  .bottom-button {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    width: 100%;
    background: #ffffff 0% 0% no-repeat padding-box;
    border-radius: 7px;
    box-shadow: 0px 0px 10px #00000029;
    padding-top: 30px;
    padding-bottom: 30px;
    .line {
      border-bottom: 1px solid grey;
      width: 95%;
      margin-left: 40px;
      margin-bottom: 20px;
      margin-top: 10px;
      @media (max-width: 500px) {
        width: 90%;
        margin-left: 20px;
      }
    }
    button {
      margin-left: 40px;
    }
    .consent {
      border-left: 3px solid #0092e0;
      padding-top: 5px;
      padding-bottom: 5px;
      margin-left: 40px;
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      @media (max-width: 500px) {
        margin-left: 20px;
      }
      span {
        font-size: 13px;
        margin-left: 15px;
        font-family: MontserratRegular;
        color: #707070;
      }
    }
  }

  p {
    font: normal normal bold 14px Segoe UI;
    letter-spacing: 0.44px;
    color: #707070;
    opacity: 1;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  .btn {
    cursor: pointer;
    color: white;
    margin-right: 20px;
    background: #0092e0 0% 0% no-repeat padding-box !important;
    border-radius: 10px;
    opacity: 1;
    height: 30px;
    outline: none;
    border: 1px solid #0092e0;
  }
  .add-btn {
    width: 250px;
    color: #0092e0;
    margin-right: 20px;
    background: #ffffff 0% 0% no-repeat padding-box !important;
    border-radius: 20px;
    opacity: 1;
    outline: 0;
    border: 1px solid #0092e0;
    cursor: pointer;
    margin-bottom: 20px;
    padding-top: 8px;
    padding-bottom: 8px;
    font-weight: bold;
    &:hover {
      background: #0092e0 0% 0% no-repeat padding-box !important;
      color: white;
    }
  }
  .proceed {
    width: 200px;
    padding: 8px;
    border-radius: 17px;
    cursor: pointer;
    color: white;
    margin-right: 20px;
    background: #0092e0 0% 0% no-repeat padding-box !important;
    opacity: 1;
    outline: none;
    border: 1px solid #0092e0;
  }
  .notallowed {
    cursor: not-allowed;
  }
`;

const IconDiv = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-top: 15px;
  margin-bottom: 20px;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const Line = styled.div`
  width: 130px;
  /* height: 2px; */
  border: 1px dashed #d7dadb;
`;

const SelectSch = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 7px;
  /* height: 150px; */
  box-shadow: 0px 0px 10px #00000029;
  margin-top: 20px;

  .buttons {
    padding-left: 30px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;

    .btn {
      width: 140px;
      color: white;
      margin-right: 20px;
      background: #0092e0 0% 0% no-repeat padding-box !important;
      border-radius: 10px;
      opacity: 1;
      height: 30px;
      outline: none;
      border: 1px solid #0092e0;
    }
  }
  .invoice-table {
    tr {
      td,
      th {
        width: 29% !important;
      }
    }
  }
  .new-table {
    margin-top: 10px;
    width: 100%;
    /* background: #ffffff 0% 0% no-repeat padding-box;
    border-radius: 7px;
    box-shadow: 0px 0px 10px #00000029; */

    /* height: 90%; */
    overflow-x: hidden;
    margin-bottom: 10px;
    padding-bottom: 20px;
    .first-section {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      align-content: center;
      margin-left: 20px;
      width: 65%;

      @media (max-width: 600px) {
        display: flex;
        flex-direction: column;
      }
    }
    .second-section {
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;
      margin-left: 20px;
      margin-bottom: 50px;
      width: 65%;
    }
    .customer {
      margin-top: 0.5rem;
      p {
        margin-bottom: -0.5rem;
        font-size: 16px;
      }
    }
    .invoice {
      display: flex;
      justify-content: space-between;
      margin-left: -7rem;
    }
    .date {
      margin-right: 3rem;
      text-align: right;
      @media (max-width: 600px) {
        margin-right: 0 !important;
      }
      p {
        margin-bottom: -0.5rem;
        font-size: 16px !important;
        color:black !important
      }
    }
    .info {
      text-align: left;
      p {
        margin-bottom: -0.5rem;
        font-size: 16px !important;
        color:black !important
      }
    }
    .hide-table {
      display: none;
    }

    table {
      margin: 0 auto;
      width: 95%;
      border-collapse: collapse;
      text-align: left;
      overflow: hidden;
      font-size: 14px;
      .mobile-header {
        display: none;
      }

      td,
      th {
        padding: 10px;
      }

      td {
        /* border-left: 1px solid #ecf0f1;
        border-right: 1px solid #ecf0f1; */
      }

      th {
        background-color: #0092e0;
        color: white;
      }

      /* tr:nth-of-type(even) td {
        background-color: lighten(#4ecdc4, 35%);
      } */
      tr {
        cursor: pointer;
        &:nth-child(odd) {
          background-color: #f3f2ee;
        }
        &:hover {
          background-color: #d9f4f2;
        }
      }
    }
  }
`;
