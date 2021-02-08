import React, { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import {useHistory} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

import Pdf from "react-to-pdf";
import { FlutterWaveButton,closePaymentModal } from 'flutterwave-react-v3';
import ipapi from 'ipapi.co'

const request = (data,tranId) => {
  axios({
    data,
    method: "post",
    url: `https://croscheck.herokuapp.com/api/v1/transcript/request/${tranId}`,
  });
};

const NewTranscript = () => {
  const dispatch = useDispatch();

  const ref = React.createRef();
  const history = useHistory()


  const formData = {
    firstName: "",
    lastName: "",
    course: "",
    graduationYear: "",
    address: "",
    zipCode: "",
    // destination: "",
    destinationNumber: "",
    city: "",
    matricNo: "",
  };

  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();
  const date = `${year}${month}${day}${hours}${minutes}${seconds}`;

  const [formValues, setFormValues] = useState([{ ...formData, id: date }]);

  const [requestList, setRequestList] = useState(false);

  const [checked, setChecked] = useState(false);
  const [userCountry,setUserCountry] = useState('')
  const convertedUsd = 382

  const toDollar = (amount) => {
    return Math.round(Number(amount) / Number(convertedUsd));
  };
  useEffect(()=>{
    ipapi.location((loca)=>setUserCountry(loca),'','','country')
  },[])
 

  const handleCheck = (e) => {
    setChecked(e.target.checked);
  };
  const verify = async () => {
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
  const processPayment = async (tranId) => {
    await Promise.allSettled(formValues.map((value) => request(value,tranId)));
  };

  const updateFormValues = (id) => (data) => {
    setFormValues((formValues) =>
      formValues.map((value, index) => (index === id ? data : value))
    );
  }
  let total = formValues.reduce(
    (accumulator, currentValue) => accumulator + Number(userCountry && userCountry === 'NG' ? currentValue.amount : toDollar(currentValue.amount)),
    0
  );
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
   public_key: process.env.REACT_APP_PUBLIC_KEY,
   tx_ref: Date.now(),
   amount: total,
   currency: userCountry ==='NG' ? 'NGN' : 'USD',
   payment_options: 'card,mobilemoney,ussd',
   customer: {
     email: user?.email,
     phonenumber: user?.phone,
     name: `${user?.firstName} ${ user?.lastName}`,
   },
   customizations: {
     title: 'CrossCheck',
     description: 'Payment for Transcript',
     logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
   },
 };

 const fwConfig = {
   ...config,
   text: 'Pay Now!',
   callback: (response) => {
  console.log(response);
  if(response?.status === 'successful'){
    closePaymentModal() // this will close the modal programmatically
    processPayment(response?.transaction_id);
    dispatch(addTranscript([]));
    setRequestList(false);
    setFormValues([formData]);
    toast.success("request submitted");
      setTimeout(() => {
        history.push(`/dashboard/${user.id}`);
      }, 1500)
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
                  ref={ref}
                  cellSpacing="0"
                  cellPadding="0"
                  c
                  border="0"
                  className="ideTable"
                >
                  <thead className="table-headers">
                    <tr>
                      <th>Name</th>
                      <th>Country</th>
                      <th>our charge</th>
                      <th>Institute Charge</th>
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
                          <td>  {userCountry === 'NG' ? <td>&#8358;{ver.amount}</td> : <td>${toDollar(ver.amount)}</td>}</td>
                          <th className="mobile-header">Value</th>
                          <td>-</td>
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
              <FlutterWaveButton {...fwConfig} className="btn"/>
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
