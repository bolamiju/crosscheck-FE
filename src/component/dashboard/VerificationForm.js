import React, { useState, useEffect, useCallback } from "react";
import ReactPaginate from "react-paginate";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretRight,
  faTrash,
  faLongArrowAltLeft,
  faLongArrowAltRight,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Switch from "react-switch";
import styled from "styled-components";
import arrow from "../../asset/arrow-right.svg";
import account from "../../asset/icon_account.svg";
import qualifications from "../../asset/qualification.svg";
import document from "../../asset/document-attach.svg";
import uparrow from "../../asset/format.svg";
import cap from "../../asset/graduation-cap.svg";
import { CountryDropdown } from "react-country-region-selector";
import { fetchInstitutes, setPageInfo } from "../../state/actions/institutions";
import Institution from "../../asset/institution.svg";
import { search } from "./utils";
import Axios from "axios";

function VerificationForm({
  initialValues,
  updateFormValues,
  deleteOneVerification,
  verificationsLength,
  id,
}) {
  const [activeTab, setActiveTab] = useState("individual-details");
  const [pay, setPay] = useState(false);
  const [details, setDetails] = useState(true);

  const dispatch = useDispatch();
  const { institutions, pageInfo } = useSelector((state) => state.institutions);
  const { selectedInstitution } = useSelector((state) => state.verifications);

  const [selectedInst, setSelectedInst] = useState(
    selectedInstitution.name ? selectedInstitution : {}
  );
  const [input, setInput] = useState("");
  const [hideTable, setHideTable] = useState(false);
  const [schCard, setSchCard] = useState(true);
  const [offset, setOffset] = useState(0);
  const [byCountryOffset, setByCountryOffset] = useState(0);
  const [byCountryandNameoffset, setByCountryandNameOffset] = useState(0);
  const [country, setCountry] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const request = useCallback(
    async (offset, limit) => {
      return await search(
        `https://croscheck.herokuapp.com/api/v1/institutions/${input}/${offset}/${limit}`
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [offset, input]
  );

  useEffect(() => {
    console.log("clean up");
    dispatch(fetchInstitutes([]));
    dispatch(setPageInfo({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const institutionByCountry = useCallback(
    async (country, offset, limit) => {
      const { data } = await Axios.get(
        `https://croscheck.herokuapp.com/api/v1/institutions/country/${country}/${offset}/${limit}`
      );
      // console.log("res", data.institution);
      const {
        totalDocs,
        totalPages,
        hasPrevPage,
        hasNextPage,
        page,
      } = data.institution;
      dispatch(fetchInstitutes(data.institution.docs));
      dispatch(
        setPageInfo({ totalDocs, totalPages, hasPrevPage, hasNextPage, page })
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [offset, country]
  );
  const countryAndName = useCallback(
    async (country, offset, limit, input) => {
      await search(
        `https://croscheck.herokuapp.com/api/v1/institutions/countryandName/${country}/${input}/${offset}/${limit}`
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [country, offset, input]
  );

  useEffect(() => {
    if (country !== "" && input.length === 0) {
      institutionByCountry(country, byCountryOffset, 15);
    }
    if (country !== "" && input.length > 0) {
      countryAndName(country, byCountryandNameoffset, 15, input);
    }
    if (input.length > 0 && country.length === 0) {
      request(offset, 15);
    }
  }, [
    dispatch,
    institutionByCountry,
    byCountryandNameoffset,
    input,
    request,
    offset,
    byCountryOffset,
    country,
    countryAndName,
  ]);
  const pagesCount = pageInfo?.totalPages;

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setHideTable(false);
  };

  const handleSelected = (institute) => {
    setSelectedInst(institute);
    formik.setFieldValue("institution", institute.name);
    setHideTable(true);
    setInput(institute.name);
    setSchCard(true);
  };

  const institutionNavs = (data) => {
    console.log("data", data);
    if (country !== "" && input.length === 0) {
      setByCountryOffset((prev) => Math.ceil(data.selected * 15));
    } else if (country !== "" && input.length > 0) {
      setByCountryandNameOffset((prev) => Math.ceil(data.selected * 15));
    } else if (input.length > 0 && country.length === 0) {
      setOffset((prev) => Math.ceil(data.selected * 15));
    }
  };

  const formik = useFormik({
    initialValues,

    onSubmit: async (values, status) => {
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
      formData.append("email", user.email);
      formData.append("amount", selectedInst.amount);
      formData.append("country", selectedInst.country);
      for (var key in values) {
        formData.append(key, values[key]);
      }
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      updateFormValues(formData);
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      dateOfBirth: Yup.string().required("DOB required"),
      studentId: Yup.string().required("studentID is required"),
      course: Yup.string().required("course is required"),
      qualification: Yup.string().required("Qualification is required"),
      classification: Yup.string().required("classification is required"),
      enrollmentStatus: Yup.bool().oneOf([true, false]),
    }),
  });
  const submitRequest = (e) => {
    e.preventDefault();
    if (!formik.values.certImage) {
      return toast.error("please upload a file");
    } else if (!selectedInst.name) {
      return toast.error("please select a school");
    }
    formik.handleSubmit("paid");
    toast.success("Verification details saved");

    // updateFormValues(initialValues);
  };
  const handleQualificationTab = (e) => {
    e.preventDefault();
    if (
      formik.values.firstName.length === 0 ||
      formik.values.lastName.length === 0 ||
      formik.values.dateOfBirth.length === 0
    ) {
      toast.error("please fill required fields");
      return;
    }
    let presentYear = new Date().getFullYear();
    let DOB = Number(formik.values.dateOfBirth.substr(0, 4));
    let age = presentYear - DOB;

    if (age < 17) {
      return toast.error("Age cannot be less than 17years");
    }
    setActiveTab("qualification-details");
    setPay(false);
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
    setPay(true);
  };

  return (
    <SingleCheck
      style={{
        paddingBottom: !details ? "20px" : "",
        marginBottom: !details ? "40px" : "",
      }}
    >
      {formik.values.institution.length > 0 && schCard && (
        <SelectCheck
          onClick={() => {
            setDetails(!details);
          }}
        >
          <div style={{ width: "100%" }}>
            <img src={cap} alt="graduation cap" />
            <h3>Education Check - {formik.values.institution}</h3>
          </div>
          <FontAwesomeIcon
            icon={details ? faCaretDown : faCaretRight}
            className="arrow"
          />{" "}
        </SelectCheck>
      )}
      {formik.values.institution.length > 0 && schCard ? (
        <SelectSch style={{ display: !details ? "none" : "" }}>
          <p className="institution-details">Institution Details</p>
          <div className="inst-name">
            <span>Institution name</span>
            <span>
              {formik.values.institution}{" "}
              <span className="change" onClick={() => setSchCard(false)}>
                <small>change</small>
              </span>
            </span>
          </div>
          <div className="sch-country">
            <span>Country</span>
            <span>{selectedInst.country}</span>
          </div>
          {/* <div className="sch-country"><span>Price</span>
    <span>{ selectedInst.amount}</span></div> */}
        </SelectSch>
      ) : (
        <SelectSch>
          <div className="req-trans">
            <img src={Institution} alt="select a sch" />

            <div className="select-inst">
              <p>Select an institute</p>
              <p>Select preferred institute to conduct verification</p>
            </div>
          </div>
          <div className="selects">
            <div className="institution-wrapper">
              <label style={{ paddingLeft: "5px" }}>SELECT INSTITUTION</label>
              <input
                type="text"
                className="schl-input"
                onChange={handleInputChange}
                value={input}
                name="input"
                placeholder="Search for a school"
              />
            </div>
            <div className="select-country">
              <label style={{ paddingLeft: "5px" }}>SELECT COUNTRY</label>
              <CountryDropdown
                style={{
                  height: "34px",
                  border: "2px solid #e2e2e2",
                  outline: "none",
                  borderRadius: "14px",
                  fontSize: "14px",
                  fontFamily: "MontserratItalic",
                }}
                name="country"
                id="country"
                className="country"
                valueType="full"
                value={formik.values.country}
                onChange={(_, e) => {
                  formik.handleChange(e);
                  console.log(e.target.value);
                  setCountry(e.target.value.toLowerCase());
                }}
                onBlur={formik.handleBlur}
                ReactFlagsSelect
              />
            </div>
          </div>
          {(input.length > 0 || country.length > 0) && institutions.length > 0 && (
            <div className="new-table">
              <table
                cellSpacing="0"
                cellPadding="0"
                border="0"
                className={hideTable ? "hide-table" : ""}
              >
                <thead className="table-headers">
                  <tr>
                    <th>Name</th>
                    <th>Country</th>
                    <th>Our charge</th>
                    <th>Institute charge</th>
                  </tr>
                </thead>
                <tbody>
                  {institutions.map((ite) => (
                    <tr onClick={() => handleSelected(ite)} key={ite.name}>
                      <th className="mobile-header">Number</th>
                      <td>{ite.name}</td>
                      <th className="mobile-header">Market rate</th>
                      <td>{ite.country}</td>
                      <th className="mobile-header">Weight</th>
                      <td>{ite["our_charge"]}</td>
                      <th className="mobile-header">Value</th>
                      <td>{ite["institute_charge"]}</td>
                    </tr>
                    // <tr className="space"></tr>
                  ))}
                </tbody>
              </table>
              {!hideTable && (
                <div className="pagination-line">
                  <p>
                    Showing {institutions.length} of {pageInfo.totalDocs} of
                    entries
                  </p>

                  <ReactPaginate
                    previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pagesCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={(e) => institutionNavs(e)}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                  />
                </div>
              )}
            </div>
          )}
        </SelectSch>
      )}
      <FormContainer style={{ display: !details ? "none" : "" }}>
        <form>
          <div className="tabs">
            <ul>
              <li
                onClick={() => {
                  setActiveTab("individual-details");
                  setPay(false);
                }}
                className={
                  activeTab === "individual-details" ? "activeTab" : ""
                }
              >
                <img src={account} alt="details" />
                &nbsp; Individual details
              </li>
              <li
                onClick={(e) => handleQualificationTab(e)}
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
                <label>Middle Name</label>
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
                  />
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

              <Field className="DOB">
                <label>
                  Date of Birth
                  <span>*</span>
                </label>
                <>
                  <input
                    type="date"
                    className={
                      formik.touched.dateOfBirth && formik.errors.dateOfBirth
                        ? "date-input err"
                        : "date-input"
                    }
                    name="dateOfBirth"
                    value={formik.values.dateOfBirth}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
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
              <p className="ref">
                The reference number will be used to track this case in your
                internal system if you have one
              </p>
              <button
                // disabled={
                //   formik.values.firstName.length === 0 ||
                //   formik.values.lastName.length === 0 ||
                //   formik.values.dateOfBirth.length === 0 ||
                //   new Date().getFullYear() -
                //     Number(formik.values.dateOfBirth.substr(0, 4)) <
                //     17
                // }
                className={
                  formik.values.firstName.length === 0 ||
                  formik.values.lastName.length === 0 ||
                  formik.values.dateOfBirth.length === 0 ||
                  new Date().getFullYear() -
                    Number(formik.values.dateOfBirth.substr(0, 4)) <
                    17
                    ? "btn notallowed"
                    : "btn"
                }
                onClick={handleQualificationTab}
              >
                Next
                <img src={arrow} alt="right" />
              </button>
            </FormDiv>
          )}
          {/* =======QUALIFICATION DETAILS===== */}
          {activeTab === "qualification-details" && (
            <FormDiv>
              <div className="enrollment-status">
                <label>Enrollment status &nbsp; &nbsp;</label>
                <div className="enr-status">
                  <span>Alumni &nbsp;</span>
                  <Switch
                    checked={formik.values.enrollmentStatus}
                    onChange={(checked, e) => {
                      formik.setFieldValue("enrollmentStatus", checked);
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
              </div>
              <p className="title">
                Must be the student ID issued by the institute at the time of
                study
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
                    placeholder="B.Sc"
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
                    placeholder="second class upper"
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
              <p style={{ marginTop: "10px" }}>
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
                onClick={() => {
                  setActiveTab("documents");
                  setPay(true);
                }}
              >
                Next
                <FontAwesomeIcon
                  icon={faLongArrowAltRight}
                  style={{ marginRight: "5px", fontSize: "20px" }}
                />
              </button>
              <button
                className="btn-prev"
                type="submmit"
                onClick={() => {
                  setActiveTab("individual-details");
                  setPay(true);
                }}
              >
                <FontAwesomeIcon
                  icon={faLongArrowAltLeft}
                  style={{ marginRight: "5px", fontSize: "20px" }}
                />
                Previous
              </button>
            </FormDiv>
          )}
          {activeTab === "documents" && (
            <FormDiv>
              <Field>
                <p className="upload-text">
                  Please upload file in (pdf, jpg,jpeg) format only
                </p>
              </Field>
              <UploadSection>
                {/* <Document>
                  <div className="consent">
                    <p>Download & sign a consent form</p>
                    <img src={form} alt="forms_document" />
                  </div>
                  <div className="icons">
                    <img src={download} alt="download_icon" />
                    <img src={documentAttach} alt="download_icon" />
                  </div>
                </Document> */}

                <Document className="second-upload">
                  <div className="consent">
                    <p>Upload a third party document</p>
                    <img src={uparrow} alt="forms_document" />
                  </div>

                  <div className="file_button_container">
                    <input
                      type="file"
                      name="certImage"
                      style={{ cursor: "pointer" }}
                      onChange={(event) => {
                        formik.setFieldValue(
                          "certImage",
                          event.currentTarget.files[0]
                        );
                      }}
                    />
                  </div>
                  {/* <img
                    src={
                      formik.values.certImage
                        ? URL.createObjectURL(formik.values.certImage)
                        : null
                    }
                    style={{ width: "100px", height: "100px" }}
                    alt="selectedfile"
                  /> */}
                </Document>
              </UploadSection>
              <button pay={pay} onClick={submitRequest} className="btn submit">
                Submit details
              </button>
              <button
                className="btn-prev"
                type="submmit"
                onClick={() => {
                  setActiveTab("qualification-details");
                  setPay(true);
                }}
              >
                <FontAwesomeIcon
                  icon={faLongArrowAltLeft}
                  style={{ marginRight: "5px", fontSize: "20px" }}
                />
                Previous
              </button>
            </FormDiv>
          )}
        </form>
        {verificationsLength > 1 && (
          <button onClick={() => deleteOneVerification(id)} className="delete">
            <FontAwesomeIcon icon={faTrash} /> Delete verification
          </button>
        )}
      </FormContainer>
    </SingleCheck>
  );
}

export default VerificationForm;

const SingleCheck = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  padding: 10px 10px 5px 10px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const UploadSection = styled.div`
  width: 80%;
  padding-left: 40px;
  display: flex;
  @media (max-width: 500px) {
    padding-left: 0px;
    width: 100%;
  }
  .second-upload {
    margin-left: 60px;
    @media (max-width: 500px) {
      margin-left: 0px;
      margin: 0 auto;
      margin-bottom: 50px;
    }
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
  margin-bottom: 20px;

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

const FormContainer = styled.div`
  margin-top: 15px;
  width: 100%;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 7px;
  box-shadow: 0px 0px 10px #00000029;
  overflow-x: hidden;
  margin-bottom: 25px;
  padding-bottom: 20px;
  .DOB {
    @media (max-width: 500px) {
      display: flex;
      flex-direction: column;
    }
  }

  .btn {
    float: right;
    display: flex;
    align-items: center;
    justify-content: space-around;

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
  .btn-prev {
    display: none;
    @media (max-width: 500px) {
      float: left;
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-left: 1.5rem;

      /* width: 80px; */
      color: white;
      background: #0092e0 0% 0% no-repeat padding-box !important;
      border-radius: 10px;
      margin-right: 20px;
      opacity: 1;
      height: 30px;
      outline: none;
      border: none;
    }
  }
  .notallowed {
    cursor: not-allowed;
  }
  .tabs {
    width: 100%;
    height: 35px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    /* margin: 0 auto; */
    @media (max-width: 500px) {
      display: none;
    }
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
          letter-spacing: 0.44px;
          color: #0092e0;
          opacity: 1;
          text-transform: capitalize;
        }
      }
    }
  }
  .delete {
    width: 180px;
    color: #0092e0;
    margin-left: 20px;
    background: #ffffff 0% 0% no-repeat padding-box !important;
    border-radius: 18px;
    opacity: 1;
    height: 30px;
    outline: none;
    border: 1px solid #0092e0;
    cursor: pointer;
    padding-left: 5px;
    padding-right: 5px;
    &:hover {
      background: #0092e0 0% 0% no-repeat padding-box !important;
      color: white;
    }
  }
`;

const FormDiv = styled.div`
  width: 100%;
  margin-top: 20px;
  .ref {
    font-family: "Roboto" !important;
  }
  .enrollment-status {
    display: flex;
    align-items: center;
    padding-left: 40px;
    padding-bottom: 40px;
    label {
      font-family: MontserratBold;
      letter-spacing: 0.32px;
      color: #707070;
      opacity: 1;
    }
    @media (max-width: 500px) {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding-left: 15px;
    }
    .enr-status {
      display: flex;
      align-items: center;
      font-family: MontserratRegular;
      letter-spacing: 0.32px;
      color: #707070;
      opacity: 1;
      font-size: 14px;
    }
  }

  .btn {
    float: right;
    display: flex;
    align-items: center;
    justify-content: space-around;

    width: 80px;
    color: white;
    margin-right: 20px;
    background: #0092e0 0% 0% no-repeat padding-box !important;
    border-radius: 10px;
    opacity: 1;
    height: 30px;
    outline: none;
    border-color: #0092e0;
  }
  .submit {
    width: 120px;
  }
  .notallowed {
    /* cursor: not-allowed; */
  }
  p {
    font-size: 12px;
    padding-left: 135px;
    margin-top: -20px;
    @media (max-width: 500px) {
      padding-left: 10px;
      margin-top: 5px;
    }
  }
`;
const Field = styled.div`
  width: 100%;
  padding-left: 40px;
  padding-bottom: 20px;
  font-family: MonserratBold;
  @media (max-width: 500px) {
    padding-left: 15px;
  }
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
    @media (max-width: 500px) {
      font-size: 16px;
      width: 90%;
    }
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
    @media (max-width: 500px) {
      margin-left: 0px;
    }
  }
  .middle-input {
    margin-left: 23px;
    @media (max-width: 500px) {
      margin-left: 0px;
    }
  }
  .last-input {
    margin-left: 33px;
    @media (max-width: 500px) {
      margin-left: 0px;
    }
  }
  .date-input {
    margin-left: 21px;
    height: 34px;
    @media (max-width: 500px) {
      margin-left: 0px;
    }
  }
  .ref-input {
    margin-left: 24px;
    @media (max-width: 500px) {
      margin-left: 0px;
    }
  }
  .student-input {
    margin-left: 34px;
    @media (max-width: 500px) {
      margin-left: 0px;
    }
  }
  .course-input {
    margin-left: 52px;
    @media (max-width: 500px) {
      margin-left: 0px;
    }
  }
  .qualification-input {
    margin-left: 25px;
    @media (max-width: 500px) {
      margin-left: 0px;
    }
  }
  .class-input {
    margin-left: 23px;
    @media (max-width: 500px) {
      margin-left: 0px;
    }
  }
  .admission-input {
    margin-left: 8px;
    @media (max-width: 500px) {
      margin-left: 0px;
    }
  }
  .graduation-input {
    margin-left: 3px;
    @media (max-width: 500px) {
      margin-left: 0px;
    }
  }
`;
const SelectCheck = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: #fafafb 0% 0% no-repeat padding-box;
  border-radius: 7px;
  border-radius: 7px;
  box-shadow: 0px 0px 10px #00000029;
  margin-top: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  cursor: pointer;
  div {
    display: flex;
    margin-left: 5px;
  }
  .arrow {
    margin-right: 5px;
  }
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

  .institution-details {
    margin-left: 30px;
    border-bottom: 1px solid gray;
    width: 90%;
    font-family: segoebold;
    font-size: 15px;
    color: #173049;
    p {
      padding-bottom: 10px;
    }
  }
  .sch-country {
    padding-left: 30px;
    padding-top: 10px;
    padding-bottom: 40px;
    span {
      &:nth-child(1) {
        font-weight: normal;
        font-size: 14px;
        font-family: MontserratBold;
        letter-spacing: 0.32px;
        color: #707070;
      }
      &:nth-child(2) {
        padding-left: 105px;
        font-weight: normal;
        font-size: 14px;
        font-family: MontserratRegular;
        letter-spacing: 0.32px;
        color: #707070;
      }
    }
  }
  .inst-name {
    padding-left: 30px;
    padding-top: 10px;
    @media (max-width: 500px) {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding-left: 20px;
    }
    span {
      &:nth-child(1) {
        font-weight: normal;
        font-size: 14px;
        font-family: MontserratBold;
        letter-spacing: 0.32px;
        color: #707070;
      }
      &:nth-child(2) {
        padding-left: 40px;
        font-weight: normal;
        font-size: 14px;
        font-family: MontserratRegular;
        letter-spacing: 0.32px;
        color: #707070;
        @media (max-width: 500px) {
          padding-left: 0px;
        }
      }
    }
    .change {
      margin-left: 7px;
      background: #ff0000 0% 0% no-repeat padding-box;
      border-radius: 3px;
      padding-left: 5px;
      padding-right: 5px;
      cursor: pointer;
      opacity: 0.6;
      small {
        font: normal normal bold 12px/14px Montserrat;
        letter-spacing: 0.24px;
        color: black;
        opacity: 1;
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
  .selects {
    display: flex;
    margin-top: 25px;
    width: 100%;
    padding-bottom: 20px;
    .select-country {
      display: flex;
      flex-direction: column;
      padding-left: 20px;
      width: 46%;
      label {
        font-family: MontserratRegular;
        font-size: 14px;
        color: #707070;
      }
      @media (max-width: 500px) {
        width: 88%;
        margin-bottom: 20px;
        margin-top: 20px;
        input {
          width: 0 !important;
        }
      }
      label {
        @media (max-width: 500px) {
          font-size: 14px;
        }
      }
    }
    .select-schol {
      height: 34px;
      border: 2px solid #e2e2e2;
      outline: none;
      font-family: MontserratItalic;
      color: #707070;
      width: 100%;
      border-radius: 14px;
    }
    @media (max-width: 500px) {
      flex-direction: column;
    }
  }

  .institution-wrapper {
    display: flex;
    flex-direction: column;
    padding-left: 30px;
    width: 46%;
    label {
      font-family: MontserratRegular;
      font-size: 14px;
      color: #707070;
    }
    @media (max-width: 500px) {
      padding-left: 20px;
    }
    input {
      height: 28px;
      border: 2px solid #e2e2e2;
      outline: none;
      width: 100%;
      border-radius: 14px;
      font-family: MontserratItalic;
      color: #707070;
      padding-left: 5px;
      @media (max-width: 500px) {
        height: 30px;
      }
    }
    @media (max-width: 500px) {
      width: 85%;
      padding-right: 0px;
      label {
        font-size: 14px !important;
      }
    }
  }
  .req-trans {
    display: flex;
    width: 45%;
    padding-left: 20px;
    justify-content: space-between;
    margin-top: 10px;
    @media (max-width: 500px) {
      width: 90%;
    }
    .select-inst {
      p {
        &:nth-child(1) {
          font-size: 16px;
          text-transform: capitalize;
          font-family: MontserratBold;
          font-size: 16px;
          letter-spacing: 0.44px;
          color: #173049;
        }
        &:nth-child(2) {
          font-size: 16px;
          font-weight: normal;
          font-family: MonserratRegular;
          color: #707070;
          margin: 0;
        }
      }
      @media (max-width: 500px) {
        margin-left: 20px;
      }
    }
  }
`;
