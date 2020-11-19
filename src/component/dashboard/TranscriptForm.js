import React, { useState, useEffect } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import arrow from "../../asset/arrow-right.svg";
import account from "../../asset/icon_account.svg";
import qualifications from "../../asset/qualification.svg";
import document from "../../asset/document-attach.svg";
import cap from "../../asset/graduation-cap.svg";
import { CountryDropdown } from "react-country-region-selector";
import { getAllInstitutions } from "../../state/actions/institutions";
import Institution from "../../asset/institution.svg";

function TranscriptForm({
  initialValues,
  updateFormValues,
  deleteOneVerification,
}) {
  const [activeTab, setActiveTab] = useState("destination-details");
  const [pay, setPay] = useState(false);
  const [details, setDetails] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const dispatch = useDispatch();
  const { institutions } = useSelector((state) => state.institutions);

  const [selectedInst, setSelectedInst] = useState({});
  const [input, setInput] = useState("");
  const [hideTable, setHideTable] = useState(false);
  const [schCard, setSchCard] = useState(false);
  const [country, setCountry] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setHideTable(false);
  };

  const filteredItems = institutions.filter((item) =>
    item.name.toLocaleLowerCase().includes(input.toLocaleLowerCase())
  );

  const pageSize = 4;
  const pagesCount = Math.ceil(filteredItems.length / pageSize);

  const handleNavigation = (e, index) => {
    e.preventDefault();
    if (index < 0 || index >= pagesCount) {
      return;
    } else {
      setCurrentPage(index);
    }
  };

  const handleSelected = (institute) => {
    setSelectedInst(institute);
    setHideTable(true);
    setInput(institute.name);
    setSchCard(true);
  };

  useEffect(() => {
    dispatch(getAllInstitutions());
  }, [dispatch]);

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
      formData.append("institution", selectedInst.name);
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
      formik.values.course.length === 0 ||
      formik.values.graduationYear.length === 0 ||
      formik.values.matricNo.length === 0
    ) {
      toast.error("please fill required fields");
      return;
    }

    setActiveTab("destination-details");
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
      {schCard && (
        <SelectCheck
          onClick={() => {
            setDetails(!details);
          }}
        >
          <div style={{ width: "100%" }}>
            <img src={cap} alt="graduation cap" />
            <h3>Education Check - {selectedInst.name}</h3>
          </div>
          <FontAwesomeIcon
            icon={details ? faCaretDown : faCaretRight}
            className="arrow"
          />{" "}
        </SelectCheck>
      )}
      {schCard ? (
        <SelectSch style={{ display: !details ? "none" : "" }}>
          <p className="institution-details">Institution Details</p>
          <div className="inst-name">
            <span>Institution name</span>
            <span>
              {selectedInst.name}{" "}
              <span className="change" onClick={() => setSchCard(false)}>
                <small>change</small>
              </span>
            </span>
          </div>
          <div className="sch-country">
            <span>Country</span>
            <span>{selectedInst.country}</span>
          </div>
        </SelectSch>
      ) : (
        <SelectSch>
          <div className="req-trans">
            <img src={Institution} alt="select a sch" />

            <div className="select-inst">
              <p>Select an institute</p>
              <p>Select preferred institute to order transcript</p>
            </div>
          </div>
          <div className="selects">
            <div className="select-country">
              <label style={{ paddingLeft: "5px" }}>SELECT COUNTRY</label>
              <CountryDropdown
                name="country"
                id="country"
                className="select-schol"
                value={country}
                onChange={(_, e) => {
                  setCountry(e.target.value);
                }}
              />
            </div>
            <div className="institution-wrapper">
              <label style={{ paddingLeft: "5px" }}>SELECT INSTITUTION</label>
              <input
                type="text"
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
                cellSpacing="0"
                cellPadding="0"
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
                  {filteredItems
                    .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                    .map((ite) => (
                      <tr onClick={() => handleSelected(ite)} key={ite.name}>
                        <th className="mobile-header">Number</th>
                        <td>{ite.name}</td>
                        <th className="mobile-header">Market rate</th>
                        <td>{ite.country}</td>
                        <th className="mobile-header">Weight</th>
                        <td>{ite.category}</td>
                        <th className="mobile-header">Value</th>
                        <td>{ite.amount}</td>
                      </tr>
                      // <tr className="space"></tr>
                    ))}
                </tbody>
              </table>
              {!hideTable && (
                <div className="pagination-line">
                  <p>
                    Showing{" "}
                    {
                      filteredItems.slice(
                        currentPage * pageSize,
                        (currentPage + 1) * pageSize
                      ).length
                    }{" "}
                    of {pagesCount} of entries
                  </p>
                  <Pagination aria-label="Page navigation example">
                    <PaginationItem
                      disabled={currentPage <= 0}
                      className="prev"
                    >
                      <PaginationLink
                        onClick={(e) => handleNavigation(e, currentPage - 1)}
                        previous
                        href={() => false}
                      />
                    </PaginationItem>

                    {[...Array(pagesCount)].map((page, i) => (
                      <PaginationItem active={i === currentPage} key={i}>
                        <PaginationLink
                          onClick={(e) => handleNavigation(e, i)}
                          href={() => false}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem disabled={currentPage >= pagesCount - 1}>
                      <PaginationLink
                        onClick={(e) => handleNavigation(e, currentPage + 1)}
                        next
                        href={() => false}
                        className="next"
                      />
                    </PaginationItem>
                  </Pagination>
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
                  activeTab === "destination-details" ? "activeTab" : ""
                }
              >
                <img src={qualifications} alt="details" />
                &nbsp; Destination details
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
                  Matric No<span>*</span>
                </label>
                <>
                  <input
                    type="text"
                    className={
                      formik.touched.matricNo && formik.errors.matricNo
                        ? "matric-input err"
                        : "matric-input"
                    }
                    name="matricNo"
                    value={formik.values.matricNo}
                    onChange={formik.handleChange}
                  />
                </>
              </Field>

              <Field className="DOB">
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

              <Field className="DOB">
                <label>
                  Graduation Year
                  <span>*</span>
                </label>
                <>
                  <input
                    type="text"
                    className={
                      formik.touched.graduationYear &&
                      formik.errors.graduationYear
                        ? "graduationyear-input err"
                        : "graduationyear-input"
                    }
                    name="graduationYear"
                    value={formik.values.graduationYear}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.graduationYear &&
                  formik.errors.graduationYear ? (
                    <div
                      className="error"
                      style={{ marginLeft: "-660px", paddingTop: "3px" }}
                    >
                      {formik.errors.graduationYear}
                    </div>
                  ) : null}
                </>
              </Field>

              <Field>
                <label>Reference ID</label>
                <input type="text" className="ref-input" />
              </Field>
              {/* <p className="ref">
                The reference number will be used to track this case in your
                internal system if you have one
              </p> */}
              <button
                className={
                  formik.values.firstName.length === 0 ||
                  formik.values.lastName.length === 0 ||
                  formik.values.course.length === 0 ||
                  formik.values.graduationYear.length === 0 ||
                  formik.values.matricNo.length === 0
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
          {activeTab === "destination-details" && (
            <FormDiv>
              <Field>
                <label>
                  Destination Country
                  <span>*</span>
                </label>
                <>
                  <CountryDropdown
                    name="destinationCountry"
                    id="destinationCountry"
                    className="destination-country"
                    valueType="full"
                    value={formik.values.destinationCountry}
                    onChange={(_, e) => {
                      formik.handleChange(e);
                      console.log(e.target.value);
                    }}
                    onBlur={formik.handleBlur}
                    ReactFlagsSelect
                  />
                  {formik.touched.destinationCountry &&
                  formik.errors.destinationCountry ? (
                    <div
                      className="error"
                      style={{ marginLeft: "-660px", paddingTop: "3px" }}
                    >
                      {formik.errors.destinationCountry}
                    </div>
                  ) : null}
                </>
              </Field>

              <Field>
                <label>
                  Address Line
                  <span>*</span>
                </label>
                <>
                  <input
                    type="text"
                    className={
                      formik.touched.addressLine && formik.errors.addressLine
                        ? "address-input err"
                        : "address-input"
                    }
                    name="course"
                    value={formik.values.addressLine}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.addressLine && formik.errors.addressLine ? (
                    <div
                      className="error"
                      style={{ marginLeft: "-660px", paddingTop: "3px" }}
                    >
                      {formik.errors.addressLine}
                    </div>
                  ) : null}
                </>
              </Field>

              <Field>
                <label>
                  Zip/Postcode
                  <span>*</span>
                </label>
                <>
                  <input
                    type="text"
                    className={
                      formik.touched.ZipPostCode && formik.errors.ZipPostCode
                        ? "postcode-input err"
                        : "postcode-input"
                    }
                    name="qualification"
                    placeholder="eg 11101"
                    value={formik.values.ZipPostCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.ZipPostCode && formik.errors.ZipPostCode ? (
                    <div
                      className="error"
                      style={{ marginLeft: "-660px", paddingTop: "3px" }}
                    >
                      {formik.errors.ZipPostCode}
                    </div>
                  ) : null}
                </>
              </Field>

              <Field>
                <label>
                  Destination Number
                  <span>*</span>
                </label>
                <>
                  <input
                    type="text"
                    className={
                      formik.touched.destinationNumber &&
                      formik.errors.destinationNumber
                        ? "destination-input err"
                        : "destination-input"
                    }
                    name="destinationNumber"
                    value={formik.values.destinationNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.destinationNumber &&
                  formik.errors.destinationNumber ? (
                    <div
                      className="error"
                      style={{ marginLeft: "-660px", paddingTop: "3px" }}
                    >
                      {formik.errors.destinationNumber}
                    </div>
                  ) : null}
                </>
              </Field>

              <Field>
                <label>
                  City<span>*</span>
                </label>
                <>
                  <input
                    type="text"
                    className={
                      formik.touched.city && formik.errors.city
                        ? "city-input err"
                        : "city-input"
                    }
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.city && formik.errors.city ? (
                    <div
                      className="error"
                      style={{
                        marginLeft: "-620px",
                        paddingTop: "3px",
                      }}
                    >
                      {formik.errors.city}
                    </div>
                  ) : null}
                </>
              </Field>

              <button
                disabled={
                  formik.values.destinationCountry.length === 0 ||
                  formik.values.addressLine.length === 0 ||
                  formik.values.destinationNumber.length === 0 ||
                  formik.values.city.length === 0 ||
                  formik.values.ZipPostCode.length === 0
                }
                className="btn"
                type="submmit"
                onClick={() => {
                  setActiveTab("documents");
                  setPay(true);
                }}
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
                  Please upload file in (pdf, jpg,jpeg) format only
                </p>
              </Field>

              <button pay={pay} onClick={submitRequest} className="btn submit">
                Submit details
              </button>
            </FormDiv>
          )}
        </form>
      </FormContainer>
    </SingleCheck>
  );
}

export default TranscriptForm;

const SingleCheck = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  padding: 10px 10px 5px 10px;
  margin-top: 10px;
  margin-bottom: 20px;
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
    input {
      @media (max-width: 500px) {
        /* width: 250px !important; */
      }
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
    border-bottom: 1px solid #707070;
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
          font-weight: 500;
          color: #0092e0;
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
    @media (max-width: 500px) {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding-left: 15px;
    }
    .enr-status {
      display: flex;
      align-items: center;
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
    width: 150px;
    @media (max-width: 500px) {
      margin-right: 55px !important;
    }
  }
  .notallowed {
    cursor: not-allowed;
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
  .destination-country {
    width: 65%;
    height: 30px;
    border: 1px solid #707070cc;
    border-radius: 5px;
    outline: none;
    margin-left: 35px;
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
    margin-left: 61px;
    @media (max-width: 500px) {
      margin-left: 0px;
    }
  }
  .matric-input {
    margin-left: 67px;
    @media (max-width: 500px) {
      margin-left: 0px;
    }
  }
  .last-input {
    margin-left: 62px;
    @media (max-width: 500px) {
      margin-left: 0px;
    }
  }
  .course-input {
    margin-left: 84px;
    @media (max-width: 500px) {
      margin-left: 0px;
    }
  }
  .graduationyear-input {
    margin-left: 29px;
    @media (max-width: 500px) {
      margin-left: 0px;
    }
  }
  .ref-input {
    margin-left: 56px;
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
  .address-input {
    margin-left: 78px;
    @media (max-width: 500px) {
      margin-left: 0px;
    }
  }
  .postcode-input {
    margin-left: 75px;
    @media (max-width: 500px) {
      margin-left: 0px;
    }
  }
  .destination-country {
    margin-left: 35px;
    @media (max-width: 400px) {
      margin-left: 0px;
    }
    @media (max-width: 500px) {
      margin-left: 0px;
    }
  }
  .city-input {
    margin-left: 135px;
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
  .destination-input {
    margin-left: 35px;
    @media (max-width: 400px) {
      margin-left: 0px;
    }
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
        font: normal normal bold 12px/14px Montserrat;
        letter-spacing: 0.32px;
        color: #707070;
      }
      &:nth-child(2) {
        padding-left: 100px;
        font: normal normal normal 12/14px Montserrat;
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
        font: normal normal bold 12px/14px Montserrat;
        letter-spacing: 0.32px;
        color: #707070;
      }
      &:nth-child(2) {
        padding-left: 40px;
        font: normal normal normal 12/14px Montserrat;
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
      small {
        font: normal normal bold 12px/14px Montserrat;
        letter-spacing: 0.24px;
        color: #b30000;
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
      @media (max-width: 500px) {
        width: 95%;
        margin-bottom: 20px;
        input {
          width: 0 !important;
        }
      }
      label {
        @media (max-width: 500px) {
          font-size: 14px;
          font-family: "Roboto";
        }
      }
    }
    .select-schol {
      height: 34px;
      border: 2px solid #e2e2e2;
      outline: none;
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
    padding-right: 20px;
    padding-left: 20px;
    width: 48%;
    input {
      height: 34px;
      border: 2px solid #e2e2e2;
      outline: none;
      width: 100%;
      border-radius: 14px;
      padding-left: 5px;
      @media (max-width: 500px) {
        height: 30px;
      }
    }
    @media (max-width: 500px) {
      width: 95%;
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
      width: 100%;
    }
    .select-inst {
      p {
        font-family: "Roboto";
        &:nth-child(1) {
          font-size: 16px;
        }
        &:nth-child(2) {
          font-size: 14px;
          font-weight: normal;
        }
      }
      @media (max-width: 500px) {
        margin-left: 20px;
      }
    }

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
