import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./ver.css";
import styled from "styled-components";
import Switch from "react-switch";
import { CountryDropdown } from "react-country-region-selector";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAllInstitutions } from "../../state/actions/institutions";
import Layout from "./DashboardLayout";
import start from "../../asset/start.svg";
import details from "../../asset/details.svg";
import payment from "../../asset/process_payment.svg";
import finish from "../../asset/finish.svg";
import Institution from "../../asset/institution.svg";
import arrow from "../../asset/arrow-right.svg";
import account from "../../asset/icon_account.svg";
import qualifications from "../../asset/qualification.svg";
import document from "../../asset/document-attach.svg";
import form from "../../asset/form-line.svg";
import uparrow from "../../asset/format.svg";
import documentAttach from "../../asset/attach.svg";
import download from "../../asset/download.svg";

const NewVerifications = () => {
  const dispatch = useDispatch();
  const { institutions } = useSelector((state) => state.institutions);
  const [activeTab, setActiveTab] = useState("individual-details");
  const [hideTable, setHideTable] = useState(false);

  const [input, setInput] = useState("");

  const [certImage, setCertImage] = useState(undefined);
  const [selectedInst, setSelectedInst] = useState({});

  const handleImage = (e) => {
    setCertImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleSelected = (institute) => {
    setSelectedInst(institute);
    setHideTable(true);
    setInput(institute.name);
  };

  const formik = useFormik({
    initialValues: {
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
    },

    onSubmit: async (values) => {
      for (var propName in values) {
        if (
          values[propName] === null ||
          values[propName] === undefined ||
          values[propName] === ""
        ) {
          delete values[propName];
        }
      }

      var formData = new FormData();
      formData.append("certImage", certImage);
      formData.append("institution", selectedInst.name);
      for (var key in values) {
        formData.append(key, values[key]);
      }
      for (var value of formData.values()) {
        console.log(value);
      }

      axios
        .post(`http://localhost:5000/api/v1/verifications/request`, formData)
        .then(({ data }) => {
          console.log("res", data);
          toast.success("verification requested");
          formik.resetForm();
        })
        .catch((err) => {
          console.log(err);
          toast.error("An error occured");
        });
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      middleName: Yup.string().required("Middle name is required"),
      dateOfBirth: Yup.string().required("DOB required"),
      studentId: Yup.string().required("studentID is required"),
      course: Yup.string().required("course is required"),
      qualification: Yup.string().required("Qualification is required"),
      classification: Yup.string().required("classification is required"),
      enrollmentStatus: Yup.bool().oneOf([true, false]),

      admissionYear: Yup.string().when("enrollmentStatus", {
        is: false,
        then: Yup.string().required("Please enter admission year"),
      }),
      graduationYear: Yup.string().when("enrollmentStatus", {
        is: false,
        then: Yup.string().required("Please enter graduation year"),
      }),
    }),
  });
  console.log("inst", selectedInst.name);
  // const handleChange = (e) => {
  //   console.log(e.target.value);
  //   setFirstName(e.target.value);
  // };

  // function onChange(checked) {
  //   console.log(`switch to ${checked}`);
  // }

  // const handleCheck = (checked) => {
  //   setEnrollmentStatus(!enrollmentStatus);
  //   console.log("clicked", checked);
  // };

  function handleInputChange(e) {
    setInput(e.target.value);
    console.log(e.target.value);
  }

  const filteredItems = institutions.filter((item) =>
    item.name.toLocaleLowerCase().includes(input.toLocaleLowerCase())
  );
  useEffect(() => {
    dispatch(getAllInstitutions());
    console.log("mounted");
  }, [dispatch]);

  const handleQualificationTab = () => {
    if (
      formik.values.firstName.length === 0 ||
      formik.values.lastName.length === 0 ||
      formik.values.middleName.length === 0 ||
      formik.values.dateOfBirth.length === 0
    ) {
      toast.error("please fill required fields");
      return;
    }
    setActiveTab("qualification-details");
  };

  const handleDocumentTab = () => {
    if (
      formik.values.course.length === 0 ||
      formik.values.qualification.length === 0 ||
      formik.values.classification.length === 0 ||
      formik.values.admissionYear.length === 0 ||
      formik.values.graduationYear.length === 0 ||
      formik.values.studentId.length === 0
    ) {
      toast.error("please fill required fields");
      return;
    }
    setActiveTab("documents");
  };

  return (
    <div>
      <Layout>
        <RequisitionBody>
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
          <SelectSch>
            <div className="req-trans">
              <img src={Institution} alt="select a sch" />

              <div>
                <p>Select an institute</p>
                <p style={{ fontSize: "12px" }}>
                  Select preferred institute to conduct verification
                </p>
              </div>
            </div>
            <div className="selects">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingLeft: "20px",
                  width: "46%",
                }}
              >
                <label style={{ paddingLeft: "5px" }}>SELECT COUNTRY</label>
                <CountryDropdown
                  style={{
                    height: "34px",
                    border: "2px solid #e2e2e2",
                    outline: "none",
                    width: "100%",
                    borderRadius: "14px",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingRight: "20px",
                  paddingLeft: "20px",
                  width: "48%",
                }}
              >
                <label style={{ paddingLeft: "5px" }}>SELECT INSTITUTION</label>
                <input
                  type="text"
                  style={{
                    height: "30px",
                    border: "2px solid #e2e2e2",
                    outline: "none",
                    width: "100%",
                    borderRadius: "14px",
                    paddingLeft: "5px",
                  }}
                  onChange={handleInputChange}
                  value={input}
                  name="input"
                  placeholder="Search an institute"
                />
              </div>
            </div>
            {filteredItems.length > 0 && input.length > 0 && (
              <div className="new-table">
                <table
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  className={hideTable ? "hide-table" : ""}
                >
                  <thead className="table-headers">
                    <tr>
                      <th>Name</th>
                      <th>Country</th>
                      <th>category rate</th>
                      <th>amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((ite) => (
                      <tr onClick={() => handleSelected(ite)}>
                        <th class="mobile-header">Number</th>
                        <td>{ite.name}</td>
                        <th class="mobile-header">Market rate</th>
                        <td>{ite.country}</td>
                        <th class="mobile-header">Weight</th>
                        <td>{ite.category}</td>
                        <th class="mobile-header">Value</th>
                        <td>{ite.amount}</td>
                      </tr>
                      // <tr className="space"></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </SelectSch>
          <FormContainer>
            <form>
              <div className="tabs">
                <ul>
                  <li
                    onClick={() => setActiveTab("individual-details")}
                    className={
                      activeTab === "individual-details" ? "activeTab" : ""
                    }
                  >
                    <img src={account} alt="details" />
                    &nbsp; Individual details
                  </li>
                  <li
                    onClick={handleQualificationTab}
                    className={
                      activeTab === "qualification-details" ? "activeTab" : ""
                    }
                  >
                    <img src={qualifications} alt="details" />
                    &nbsp; Qualification details
                  </li>
                  <li
                    onClick={handleDocumentTab}
                    className={activeTab === "documents" ? "activeTab" : ""}
                  >
                    <img src={document} alt="details" />
                    &nbsp; Documents
                  </li>
                </ul>
              </div>
              {activeTab === "individual-details" && (
                <FormDiv>
                  <Field>
                    <label>
                      First Name
                      <span>*</span>
                    </label>
                    <>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={
                          formik.touched.firstName && formik.errors.firstName
                            ? "first-input err"
                            : "first-input"
                        }
                      />
                      {formik.touched.firstName && formik.errors.firstName ? (
                        <div
                          className="error"
                          style={{ marginLeft: "-660px", paddingTop: "3px" }}
                        >
                          {formik.errors.firstName}
                        </div>
                      ) : null}
                    </>
                  </Field>

                  <Field>
                    <label>
                      Middle Name
                      <span>*</span>
                    </label>
                    <>
                      <input
                        type="text"
                        className={
                          formik.touched.middleName && formik.errors.middleName
                            ? "middle-input err"
                            : "middle-input"
                        }
                        name="middleName"
                        value={formik.values.middleName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.middleName && formik.errors.middleName ? (
                        <div
                          className="error"
                          style={{ marginLeft: "-660px", paddingTop: "3px" }}
                        >
                          {formik.errors.middleName}
                        </div>
                      ) : null}
                    </>
                  </Field>

                  <Field>
                    <label>
                      Last Name
                      <span>*</span>
                    </label>
                    <>
                      <input
                        type="text"
                        className={
                          formik.touched.lastName && formik.errors.lastName
                            ? "last-input err"
                            : "last-input"
                        }
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.lastName && formik.errors.lastName ? (
                        <div
                          className="error"
                          style={{ marginLeft: "-660px", paddingTop: "3px" }}
                        >
                          {formik.errors.lastName}
                        </div>
                      ) : null}
                    </>
                  </Field>

                  <Field>
                    <label>
                      Date of Birth
                      <span>*</span>
                    </label>
                    <>
                      <input
                        type="date"
                        className={
                          formik.touched.dateOfBirth &&
                          formik.errors.dateOfBirth
                            ? "date-input err"
                            : "date-input"
                        }
                        name="dateOfBirth"
                        value={formik.values.dateOfBirth}
                        onChange={formik.handleChange}
                      />
                      {formik.touched.dateOfBirth &&
                      formik.errors.dateOfBirth ? (
                        <div
                          className="error"
                          style={{ marginLeft: "-660px", paddingTop: "3px" }}
                        >
                          {formik.errors.dateOfBirth}
                        </div>
                      ) : null}
                    </>
                  </Field>

                  <Field>
                    <label>Reference ID</label>
                    <input type="text" className="ref-input" />
                  </Field>
                  <p>
                    The reference number will be used to track this case in your
                    internal system if you have one
                  </p>
                  <button
                    disabled={
                      formik.values.firstName.length === 0 ||
                      formik.values.lastName.length === 0 ||
                      formik.values.middleName.length === 0 ||
                      formik.values.dateOfBirth.length === 0
                    }
                    className={
                      formik.values.firstName.length === 0 ||
                      formik.values.lastName.length === 0 ||
                      formik.values.middleName.length === 0 ||
                      formik.values.dateOfBirth.length === 0
                        ? "btn notallowed"
                        : "btn"
                    }
                    onClick={() => {
                      setActiveTab("qualification-details");
                    }}
                  >
                    Next
                    <img src={arrow} alt="right" />
                  </button>
                </FormDiv>
              )}
              {/* =======QUALIFICATION DETAILS===== */}
              {activeTab === "qualification-details" && (
                <FormDiv>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: "40px",
                      paddingBottom: "40px",
                    }}
                  >
                    <label>Enrollment status &nbsp; &nbsp;</label>
                    <span>Alumni &nbsp;</span>
                    <Switch
                      checked={formik.values.enrollmentStatus}
                      onChange={(checked, e) => {
                        formik.setFieldValue("enrollmentStatus", checked);
                        console.log(checked);
                      }}
                      value={formik.values.enrollmentStatus}
                      name="enrollmentStatus"
                      onColor="#0092E0"
                      onHandleColor="#2693e6"
                      handleDiameter={28}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                      height={20}
                      width={48}
                      className="react-switch"
                      id="material-switch"
                    />
                    <span>&nbsp;Current student</span>
                  </div>
                  <p>
                    Must be the student ID issued by the institute at the time
                    of study
                  </p>
                  <Field>
                    <label>
                      Student ID
                      <span>*</span>
                    </label>
                    <>
                      <input
                        type="text"
                        className={
                          formik.touched.studentId && formik.errors.studentId
                            ? "student-input err"
                            : "student-input"
                        }
                        name="studentId"
                        value={formik.values.studentId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.studentId && formik.errors.studentId ? (
                        <div
                          className="error"
                          style={{ marginLeft: "-660px", paddingTop: "3px" }}
                        >
                          {formik.errors.studentId}
                        </div>
                      ) : null}
                    </>
                  </Field>

                  <Field>
                    <label>
                      Course
                      <span>*</span>
                    </label>
                    <>
                      <input
                        type="text"
                        className={
                          formik.touched.course && formik.errors.course
                            ? "course-input err"
                            : "course-input"
                        }
                        name="course"
                        value={formik.values.course}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.course && formik.errors.course ? (
                        <div
                          className="error"
                          style={{ marginLeft: "-660px", paddingTop: "3px" }}
                        >
                          {formik.errors.course}
                        </div>
                      ) : null}
                    </>
                  </Field>

                  <Field>
                    <label>
                      Qualification
                      <span>*</span>
                    </label>
                    <>
                      <input
                        type="text"
                        className={
                          formik.touched.qualification &&
                          formik.errors.qualification
                            ? "qualification-input err"
                            : "qualification-input"
                        }
                        name="qualification"
                        value={formik.values.qualification}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.qualification &&
                      formik.errors.qualification ? (
                        <div
                          className="error"
                          style={{ marginLeft: "-660px", paddingTop: "3px" }}
                        >
                          {formik.errors.qualification}
                        </div>
                      ) : null}
                    </>
                  </Field>

                  <Field>
                    <label>
                      Classificaton
                      <span>*</span>
                    </label>
                    <>
                      <input
                        type="text"
                        className={
                          formik.touched.classification &&
                          formik.errors.classification
                            ? "class-input err"
                            : "class-input"
                        }
                        name="classification"
                        value={formik.values.classification}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.classification &&
                      formik.errors.classification ? (
                        <div
                          className="error"
                          style={{ marginLeft: "-660px", paddingTop: "3px" }}
                        >
                          {formik.errors.classification}
                        </div>
                      ) : null}
                    </>
                  </Field>
                  {!formik.values.enrollmentStatus && (
                    <>
                      <Field>
                        <label>
                          Admission Year<span>*</span>
                        </label>
                        <>
                          <input
                            type="text"
                            className={
                              formik.touched.admissionYear &&
                              formik.errors.admissionYear
                                ? "admission-input err"
                                : "admission-input"
                            }
                            name="admissionYear"
                            value={formik.values.admissionYear}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.admissionYear &&
                          formik.errors.admissionYear ? (
                            <div
                              className="error"
                              style={{
                                marginLeft: "-620px",
                                paddingTop: "3px",
                              }}
                            >
                              {formik.errors.admissionYear}
                            </div>
                          ) : null}
                        </>
                      </Field>
                      <Field>
                        <label>
                          Graduation Year<span>*</span>
                        </label>
                        <>
                          <input
                            type="text"
                            className={
                              formik.touched.graduationYear &&
                              formik.errors.graduationYear
                                ? "graduation-input err"
                                : "graduation-input"
                            }
                            name="graduationYear"
                            value={formik.values.graduationYear}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.graduationYear &&
                          formik.errors.graduationYear ? (
                            <div
                              className="error"
                              style={{
                                marginLeft: "-620px",
                                paddingTop: "3px",
                              }}
                            >
                              {formik.errors.graduationYear}
                            </div>
                          ) : null}
                        </>
                      </Field>
                    </>
                  )}
                  <p>
                    The reference number will be used to track this case in your
                    internal system if you have one
                  </p>
                  <button
                    disabled={
                      formik.values.course.length === 0 ||
                      formik.values.qualification.length === 0 ||
                      formik.values.classification.length === 0 ||
                      formik.values.admissionYear.length === 0 ||
                      formik.values.graduationYear.length === 0 ||
                      formik.values.studentId.length === 0
                    }
                    className={
                      formik.values.course.length === 0 ||
                      formik.values.qualification.length === 0 ||
                      formik.values.classification.length === 0 ||
                      formik.values.admissionYear.length === 0 ||
                      formik.values.graduationYear.length === 0 ||
                      formik.values.studentId.length === 0
                        ? "btn notallowed"
                        : "btn"
                    }
                    type="submmit"
                    // onClick={() => setActiveTab("documents")}
                    onClick={formik.handleSubmit}
                  >
                    Next
                    <img src={arrow} alt="right" />
                  </button>
                </FormDiv>
              )}
              {activeTab === "documents" && (
                <FormDiv>
                  <Field>
                    <p className="upload-text">
                      Mandatory documents that are required by the institute in
                      order to process a verification are marked with asterik
                      below.
                      <br /> You can also use 'Add another document' to add any
                      further documentation you feel might be useful
                    </p>
                  </Field>
                  <UploadSection>
                    <Document>
                      <div className="consent">
                        <p>Download & sign a consent form</p>
                        <img src={form} alt="forms_document" />
                      </div>
                      <div className="icons">
                        <img src={download} alt="download_icon" />
                        <img src={documentAttach} alt="download_icon" />
                      </div>
                    </Document>

                    <Document className="second-upload">
                      <div className="consent">
                        <p>Upload a third party document</p>
                        <img src={uparrow} alt="forms_document" />
                      </div>

                      <div className="file_button_container">
                        <input
                          type="file"
                          name="certImage"
                          onChange={handleImage}
                        />
                      </div>
                    </Document>
                  </UploadSection>
                  <button
                    type="submit"
                    onClick={formik.handleSubmit}
                    className="btn"
                  >
                    Finish
                  </button>
                </FormDiv>
              )}
            </form>
          </FormContainer>
        </RequisitionBody>
      </Layout>
    </div>
  );
};

export default NewVerifications;

const UploadSection = styled.div`
  width: 80%;
  padding-left: 40px;
  display: flex;
  .second-upload {
    margin-left: 60px;
    img {
      margin-left: -20px;
    }
  }
`;
const Document = styled.div`
  height: 190px;
  width: 170px;
  background: #e9eaed 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 10px;

  .icons {
    height: 17%;
    padding: 0;
    width: 100%;
    display: flex;

    img {
      padding-left: 0px !important;
      margin-bottom: -35px;
    }
  }
  .consent {
    height: 83%;
  }
  p {
    padding-left: 0px !important;
    text-align: center;
    padding-top: 20px !important;
  }
  img {
    padding-left: 65px;
  }
`;

const RequisitionBody = styled.div`
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

const SelectSch = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 7px;
  /* height: 150px; */
  box-shadow: 0px 0px 10px #00000029;
  margin-top: 20px;

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
        background-color: #1e2a36;
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
  .selects {
    display: flex;
    margin-top: 25px;
    width: 100%;
    padding-bottom: 20px;
  }
  .req-trans {
    display: flex;
    width: 45%;
    padding-left: 20px;
    justify-content: space-between;
    margin-top: 10px;

    p {
      &:nth-child(1) {
        font-weight: bold;
        margin-bottom: 3px;
        color: black;
      }
      &:nth-child(2) {
        font-size: 14px;
        font: normal normal medium 15px/19px Montserrat;
        letter-spacing: 0.3px;
        color: #707070;
        margin: 0;
      }
    }
  }
`;

const FormContainer = styled.div`
  margin-top: 15px;
  width: 100%;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 7px;
  box-shadow: 0px 0px 10px #00000029;
  overflow-x: hidden;
  margin-bottom: 10px;
  padding-bottom: 20px;
  .tabs {
    width: 100%;
    height: 35px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    /* margin: 0 auto; */
    border-bottom: 1px solid #707070;
    ul {
      display: flex;
      justify-content: space-between;
      margin-top: 0px !important;
      margin-bottom: 0px !important;
      li {
        list-style-type: none;
        margin-right: 45px;
        cursor: pointer;

        &.activeTab {
          border-bottom: 2px solid #0092e0;
          font-weight: 500;
          color: #0092e0;
        }
      }
    }
  }
`;

const FormDiv = styled.div`
  width: 100%;
  margin-top: 20px;

  .btn {
    float: right;
    display: flex;
    align-items: center;
    justify-content: space-around;

    width: 80px;
    color: white;
    margin-right: 20px;
    background: #0092e0 0% 0% no-repeat padding-box;
    border-radius: 10px;
    opacity: 1;
    height: 30px;
    outline: none;
    border-color: #0092e0;
  }
  .notallowed {
    cursor: not-allowed;
  }
  p {
    font-size: 12px;
    padding-left: 135px;
    margin-top: -20px;
  }
`;
const Field = styled.div`
  width: 100%;
  padding-left: 40px;
  padding-bottom: 20px;
  .upload-text {
    padding-left: 0px !important;
    padding-top: 10px;
  }
  input {
    width: 65%;
    height: 30px;
    border: 1px solid #707070cc;
    border-radius: 5px;
    outline: none;
  }
  .err {
    border: 1px solid red !important;
  }
  label {
    span {
      color: red;
    }
  }
  .first-input {
    margin-left: 30px;
  }
  .middle-input {
    margin-left: 20px;
  }
  .last-input {
    margin-left: 33px;
  }
  .date-input {
    margin-left: 24px;
  }
  .ref-input {
    margin-left: 24px;
  }
  .student-input {
    margin-left: 34px;
  }
  .course-input {
    margin-left: 52px;
  }
  .qualification-input {
    margin-left: 25px;
  }
  .class-input {
    margin-left: 23px;
  }
  .admission-input {
    margin-left: 8px;
  }
  .graduation-input {
    margin-left: 3px;
  }
`;