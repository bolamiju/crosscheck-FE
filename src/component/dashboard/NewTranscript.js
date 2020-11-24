import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import arrow from "../../asset/arrow-right.svg";
import axios from "axios";
import "./ver.css";
import styled from "styled-components";
import Layout from "./DashboardLayout";
import start from "../../asset/start.svg";
import details from "../../asset/details.svg";
import payment from "../../asset/process_payment.svg";
import finish from "../../asset/finish.svg";
import { addTranscript } from "../../state/actions/verifications";
import TranscriptForm from "./TranscriptForm";

import { PaystackButton } from "react-paystack";

const request = (data) => {
  axios({
    data,
    method: "post",
    url: "https://croscheck.herokuapp.com/api/v1/transcript/request",
  });
};

const NewTranscript = () => {
  const dispatch = useDispatch();
  const { transcript } = useSelector((state) => state.verifications);

  const formData = {
    firstName: "",
    lastName: "",
    course: "",
    graduationYear: "",
    course: "",
    address: "",
    zipCode: "",
    // destination: "",
    destinationNumber: "",
    city: "",
    matricNo: "",
  };

  const [formValues, setFormValues] = useState([
    { ...formData, _id: Date.now() },
  ]);

  const [requestList, setRequestList] = useState(false);

  const [checked, setChecked] = useState(false);

  const handleCheck = (e) => {
    setChecked(e.target.checked);
  };
  const verify = async () => {
    console.log("updated form values", formValues);
    for (let i = 0; i < formValues.length; i++) {
      for (var key in formValues[i]) {
        if (formValues[i][key] === "") {
          return toast.error(
            "Please complete and submit all verification details"
          );
        }
      }
    }
    dispatch(addTranscript(formValues));
    setRequestList(true);
  };
  const processPayment = async (data) => {
    await Promise.allSettled(formValues.map((value) => request(value)));
  };

  const updateFormValues = (id) => (data) => {
    setFormValues((formValues) =>
      formValues.map((value, index) => (index === id ? data : value))
    );
  };
  // console.log("updated", formValues);

  let total = formValues.reduce(
    (accumulator, currentValue) => accumulator + Number(currentValue.amount),
    0
  );

  const componentProps = {
    email: "tolaked@yahoo.com",
    amount: total * 100,
    metadata: {
      name: "Tola",
      phone: "080932215257",
    },
    publicKey: process.env.REACT_APP_PAYSTACK_KEY,
    text: "Pay Now",
    onSuccess: () => {
      console.log("paying");
      processPayment();
      dispatch(addTranscript([]));
      setRequestList(false);
      setFormValues([formData]);
      toast.success("request submitted");
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
          <div className={requestList ? "none" : ""}>
            {" "}
            <h2 className="new-heading">New Transcript Order</h2>
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

          {formValues.map((values, id) => (
            <div className={requestList ? "none" : ""}>
              {" "}
              <TranscriptForm
                key={id}
                initialValues={values}
                updateFormValues={updateFormValues(id)}
              />
            </div>
          ))}
          <div className={requestList ? "none" : "bottom-button"}>
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
              <div className="new-table">
                <table
                  cellSpacing="0"
                  cellPadding="0"
                  border="0"
                  className="ideTable"
                >
                  <thead className="table-headers">
                    <tr>
                      <th>Name</th>
                      <th>Country</th>
                      <th>category rate</th>
                      <th>amount</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {formValues.length > 0 &&
                      formValues.map((ver) => (
                        <tr key={ver.institution}>
                          <th className="mobile-header">Number</th>
                          <td>{ver.institution}</td>
                          <th className="mobile-header">Market rate</th>
                          <td>{ver.destination}</td>
                          <th className="mobile-header">Weight</th>
                          <td>50000</td>
                          <th className="mobile-header">Value</th>
                          <td>{ver.amount}</td>
                          {/* <td>
                            <FontAwesomeIcon
                              icon={faTrash}
                              // className="menu-icon"
                              onClick={() =>
                                removeVerification(ver.institution)
                              }
                            />
                          </td> */}
                        </tr>
                      ))}

                    <td></td>
                    <td></td>
                    <td style={{ color: "black", fontWeight: "bold" }}>
                      TOTAL
                    </td>
                    <td style={{ fontWeight: "bold" }}>&#8358;{total}</td>
                  </tbody>
                </table>
              </div>
              <div className="buttons">
                <PaystackButton {...componentProps} className="btn" />
              </div>
            </SelectSch>
          )}
        </VerificationBody>
      </Layout>
    </div>
  );
};

export default NewTranscript;

const VerificationBody = styled.div`
  height: 100%;
  padding-left: 30px;
  overflow-y: scroll;
  padding-right: 30px;
  background: #fafafb;
  font-family: "Rubik", sans-serif;
  .new-heading {
    font-family: MontserratRegular;
    letter-spacing: 0px;
    color: #0092e0;
    opacity: 1;
    font-size: 32px;
    font-weight: lighter;
  }
  @media (max-width: 500px) {
    padding-right: 25px;
    padding-left: 25px;
  }
  .step-text {
    width: 64%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    font-size: 12px;
    margin-top: 20px;
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
        padding: 10px;
        margin-left: 20px;
        input {
          margin-left: -5px;
          margin-right: 10px;
        }
      }
      span {
        /* font-size: 16px; */
        margin-left: 15px;
        color: #707070;
        font-weight: normal;
        font-family: MonserratRegular;
        @media (max-width: 500px) {
          margin-left: 0;
        }
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
