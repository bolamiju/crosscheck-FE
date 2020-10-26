import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useDispatch, useSelector } from "react-redux";
import "./ver.css";
import styled from "styled-components";
import Layout from "./DashboardLayout";
import start from "../../asset/start.svg";
import details from "../../asset/details.svg";
import payment from "../../asset/process_payment.svg";
import finish from "../../asset/finish.svg";

import VerificationForm from "./VerificationForm";

// import { PaystackButton } from "react-paystack";

const NewVerifications = () => {

  const formData = {
      firstName: "",
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

  const [formValues, setFormValues] = useState([
   formData
  ]);

  const verify =()=>{
    console.log('all forms',formValues)
  }
  const addNewForm = () => {
    setFormValues(values => ([...values, formData]));
  }

  const updateFormValues = (idx) => (data) => {
    setFormValues(formValues => formValues.map((value, index) => index === idx ? data : value))
    }
  

  // function updateFormValues(idx) {
  //   return function update(data) {
  //     setFormValues(formValues => formValues.map((value, index) => {
  //       if (index === idx) {
  //         return data;
  //       }
  //       return value;
  //     }));
  //   }
  // }
  


  // const formik = useFormik({
  //   initialValues: {
  //     firstName: "",
  //     lastName: "",
  //     middleName: "",
  //     dateOfBirth: "",
  //     studentId: "",
  //     course: "",
  //     qualification: "",
  //     classification: "",
  //     admissionYear: "",
  //     graduationYear: "",
  //     enrollmentStatus: false,
  //   },

  //   onSubmit: async (values, status) => {
  //     console.log("submit......", values);

  //     for (var propName in values) {
  //       if (
  //         values[propName] === null ||
  //         values[propName] === undefined ||
  //         values[propName] === ""
  //       ) {
  //         delete values[propName];
  //       }
  //     }

  //     var formData = new FormData();
  //     formData.append("certImage", certImage);
  //     formData.append("institution", selectedInst.name);
  //     formData.append("status", status);
  //     for (var key in values) {
  //       formData.append(key, values[key]);
  //     }
  //     for (var value of formData.values()) {
  //       console.log(value);
  //     }

  //     axios
  //       .post(`http://localhost:5000/api/v1/verifications/request`, formData)
  //       .then(({ data }) => {
  //         console.log("res", data);
  //         toast.success("verification requested");
  //         formik.resetForm();
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         toast.error("An error occured");
  //       });
  //   },
  //   validationSchema: Yup.object().shape({
  //     firstName: Yup.string().required("First Name is required"),
  //     lastName: Yup.string().required("Last Name is required"),
  //     middleName: Yup.string().required("Middle name is required"),
  //     dateOfBirth: Yup.string().required("DOB required"),
  //     studentId: Yup.string().required("studentID is required"),
  //     course: Yup.string().required("course is required"),
  //     qualification: Yup.string().required("Qualification is required"),
  //     classification: Yup.string().required("classification is required"),
  //     enrollmentStatus: Yup.bool().oneOf([true, false]),

  //     // admissionYear: Yup.string().when("enrollmentStatus", {
  //     //   is: false,
  //     //   then: Yup.string().required("Please enter admission year"),
  //     // }),
  //     // graduationYear: Yup.string().when("enrollmentStatus", {
  //     //   is: false,
  //     //   then: Yup.string().required("Please enter graduation year"),
  //     // }),
  //   }),
  // });

  // const submitRequest = (status) => {
  //   console.log("submitting req...");
  //   formik.handleSubmit("paid");
  // };
  // const componentProps = {
  //   email: "tolaked@yahoo.com",
  //   amount: 100,
  //   metadata: {
  //     name: "Tola",
  //     phone: "080932215257",
  //   },
  //   publicKey: "pk_test_459249dba27b1d3d5b6e12bce222f62c95accae9",
  //   text: "Pay Now",
  //   onSuccess: () => {
  //     console.log("paying");
  //     // return submitRequest("paid");
  //     // alert("Verification request submitted!!");
  //   },
  //   onClose: () => {},
  // };

 

 

  // const handleQualificationTab = () => {
  //   if (
  //     formik.values.firstName.length === 0 ||
  //     formik.values.lastName.length === 0 ||
  //     formik.values.middleName.length === 0 ||
  //     formik.values.dateOfBirth.length === 0
  //   ) {
  //     toast.error("please fill required fields");
  //     return;
  //   }
  //   let presentYear = new Date().getFullYear();
  //   let DOB = Number(formik.values.dateOfBirth.substr(0, 4));
  //   let age = presentYear - DOB;
  //   console.log(age < 15);
  //   if (age < 15) {
  //     return toast.error("Age cannot be less than 17");
  //   }
  //   setActiveTab("qualification-details");
  //   setPay(false);
  // };

  // const handleDocumentTab = () => {
  //   if (
  //     formik.values.course.length === 0 ||
  //     formik.values.qualification.length === 0 ||
  //     formik.values.classification.length === 0 ||
  //     formik.values.admissionYear.length === 0 ||
  //     formik.values.graduationYear.length === 0 ||
  //     formik.values.studentId.length === 0
  //   ) {
  //     toast.error("please fill required fields");
  //     return;
  //   }
  //   setActiveTab("documents");
  //   setPay(true);
  // };

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
          <h2
            style={{
              color: "#0092E0",
              fontFamily: "Quicksand",
              // fontSize: "16px",
            }}
          >
            New Verification
          </h2>
          <p>Education Verification</p>
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
          <div
            style={{
              width: "64%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "0 auto",
              fontSize: "12px",
              marginTop: "20px",
            }}
          >
            <span style={{ paddingLeft: "15px" }}>START</span>
            <span style={{ paddingLeft: "5px" }}>VERIFICATION DETAILS</span>
            <span style={{ paddingRight: "15px" }}>PROCESS PAYMENT</span>
            <span style={{ paddingRight: "10px" }}>FINISH</span>
          </div>
        
          {
            formValues.map((values, idx) => (
             
            <VerificationForm key={idx} initialValues={values} updateFormValues={updateFormValues(idx)}/>
      
            ))
          }<div>
          <button onClick={addNewForm} className="btn">Add New Verification </button>
          <button onClick={verify} className="btn proceed">Next</button></div>
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
  font-family: "Rubik", sans-serif;
  p {
    font: normal normal bold 14px Segoe UI;
    letter-spacing: 0.44px;
    color: #707070;
    opacity: 1;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  .btn{
    /* float: right; */
    /* display: flex;
    align-items: center;
    justify-content: space-around; */

    /* width: 80px; */
    color: white;
    margin-right: 20px;
    background: #0092e0 0% 0% no-repeat padding-box !important;
    border-radius: 10px;
    opacity: 1;
    height: 30px;
    outline: none;
    border-color: #0092e0;
  }
  .proceed{
    float:right;
    width:70px
  }
`;

const IconDiv = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

const Line = styled.div`
  width: 130px;
  /* height: 2px; */
  border: 1px dashed #d7dadb;
`;



