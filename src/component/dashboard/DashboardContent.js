import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { CountryDropdown } from "react-country-region-selector";
import DashboardLayout from "./DashboardLayout";
import { useFormik } from "formik";
import Transcript from "../../asset/Transcript.svg";
import EduVer from "../../asset/EduVeri.svg";
import wavy from "../../asset/wavy.svg";
import Institution from "../../asset/institution.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft,faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import {
  fetchInstitutes,
  setPageInfo,
  setLoading,
  noInstitute,
} from "../../state/actions/institutions";
import { selectSchool } from "../../state/actions/verifications";
import { search } from "./utils";
import Axios from "axios";
import VerificationContent from "./VerificationContent";
import ipapi from 'ipapi.co'

const DashboardContent = ({ history }) => {
  const dispatch = useDispatch();
  const { institutions, pageInfo, loading, noInstitutes } = useSelector(
    (state) => state.institutions
  );
  const { userVerifications, newTranscript } = useSelector(
    (state) => state.verifications
  );


  const [input, setInput] = useState("");
  const [hideTable, setHideTable] = useState(false);
  const [offset, setOffset] = useState(0);
  const [byCountryOffset, setByCountryOffset] = useState(0);
  const [byCountryandNameoffset, setByCountryandNameOffset] = useState(0);
  const [country, setCountry] = useState("");
  const [userCountry,setUserCountry] = useState('')
  const convertedUsd = 382;

  useEffect(()=>{
    ipapi.location((loca)=>setUserCountry(loca),'','','country')
  },[])
  

  const formik = useFormik({
    initialValues: {
      country: "",
    },
    validationSchema: Yup.object().shape({
      country: Yup.string().required("First Name is required"),
    }),
  });

  const request = useCallback(
    async (offset, limit) => {
      return await search(
        `https://crosschek.herokuapp.com/api/v1/institutions/${input}/${offset}/${limit}`
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [offset, input]
  );

  const institutionByCountry = useCallback(
    async (country, offset, limit) => {
      dispatch(setLoading(true));
      const { data } = await Axios.get(
        `https://crosschek.herokuapp.com/api/v1/institutions/country/${country}/${offset}/${limit}`
      );
      const {
        totalDocs,
        totalPages,
        hasPrevPage,
        hasNextPage,
        page,
      } = data.institution;
      if (data.institution.docs > 1) {
        dispatch(noInstitute(false));
      }
      dispatch(setLoading(false));
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
        `https://crosschek.herokuapp.com/api/v1/institutions/countryandName/${country}/${input}/${offset}/${limit}`
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [country, offset, input]
  );
 
  useEffect(() => {
    dispatch(fetchInstitutes([]));
    dispatch(setPageInfo({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const allHistory = userVerifications.concat(newTranscript);

  function handleInputChange(e) {
    setInput(e.target.value);
  }
  const pagesCount = pageInfo?.totalPages;

  const handleNext = (data) => {
    if (country !== "" && input.length === 0) {
      setByCountryOffset((prev) => Math.ceil(data.selected * 15));
    } else if (country !== "" && input.length > 0) {
      setByCountryandNameOffset((prev) => Math.ceil(data.selected * 15));
    } else if (input.length > 0 && country.length === 0) {
      setOffset((prev) => Math.ceil(data.selected * 15));
    }
  };

  const handleSelected = (institute) => {
    dispatch(selectSchool(institute));
    setHideTable(true);
    setInput(institute.name);
    history.push("/new");
  };

  const toDollar = (amount) => {
    return (Number(amount) / Number(convertedUsd)).toFixed(2);
  };
  const truncateString = (str) => {
    if (str.length <= 24) {
      return str;
    }
    return str.slice(0, 32) + "...";
  };
  return (
    <DashboardLayout history={history}>
      <DashboardBody>
        <h2
          style={{
            color: "#0092E0",
            fontFamily: "poppins",
            // fontSize: "16px",
          }}
        >
          What would you like to do today?
        </h2>

        <CardsContainer>
          <Card>
            <img src={Transcript} alt="tran" className="trans-image"/>
            <div className="tran-text">
              <div className="transcript">
                <p>Transcript Check</p>
                <p>Request transcript from schools</p>
              </div>
              <button>
                <Link
                  to="/transcript"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Start New
                </Link>
              </button>
            </div>
          </Card>
          <Card>
            <img src={EduVer} alt="tran" />
            <div className="tran-text">
              <div className="transcript">
                <p>Education Check</p>
                <p>Verify educational credentials</p>
              </div>
              <button>
                <Link
                  to="/new"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Start New
                </Link>
              </button>
            </div>
          </Card>
          <Card className="transcript-card">
            <div className="total-verification">Total Verification Orders</div>
            <div className="num">
              <p>{allHistory.length}</p>
              <img src={wavy} alt="wave" />
            </div>
          </Card>
        </CardsContainer>
        <SelectSch>
          <div className="req-trans">
            <img src={Institution} alt="select a sch" />

            <div className="paragraph">
              <p>Select an institution</p>
              <p>Request education verification </p>
            </div>
          </div>
          <div className="selects">
            <div className="sch-select">
              <label style={{ paddingLeft: "5px" }}>Select Institution</label>
              <input
                type="text"
                className="schl-input"
                onChange={handleInputChange}
                value={input}
                name="input"
                placeholder="Search for a school"
              />
            </div>
            <div className="country-select">
              <label style={{ paddingLeft: "5px" }}>Country</label>
              <CountryDropdown
                style={{
                  height: "34px",
                  border: "2px solid #e2e2e2",
                  outline: "none",
                  borderRadius: "14px",
                  fontSize: "14px",
                  fontFamily: "poppins",
                }}
                name="country"
                id="country"
                className="country"
                valueType="full"
                value={formik.values.country}
                onChange={(_, e) => {
                  formik.handleChange(e);
                  setCountry(e.target.value.toLowerCase());
                  setByCountryOffset(0)
                  setByCountryandNameOffset(0)
                  setOffset(0)
                }}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          {loading && <p>loading</p>}

          {(input.length > 0 || country.length > 0) && institutions.length > 0 && (
            <div className="new-table open">
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
                    <th>Institute charge</th>
                    <th>Our charge</th>
                  </tr>
                </thead>
                <tbody>
                  {institutions.length > 0 &&
                    institutions.map((ite) => (
                      <tr onClick={() => handleSelected(ite)} key={ite.name}>
                        <th className="mobile-header">Number</th>
                        <td>{truncateString(ite.name)}</td>
                        <th className="mobile-header">Market rate</th>
                        <td>{truncateString(ite.country)}</td>
                        <th className="mobile-header">Value</th>
                        {ite['institute_charge'] === 0 ? <td>-</td> :
                        userCountry === "NG" ? (
                          <td>&#8358;{ite["institute_charge"] || 0}</td>
                        ) :
                          <td>${toDollar(ite["institute_charge"]) || 0}</td>
                        }
                        <th className="mobile-header">Weight</th>
                        {userCountry === "NG" && (
                          <td>&#8358;{ite["our_charge"] || 0}</td>
                        )}
                        {userCountry !== "NG" && (
                          <td>${toDollar(ite["our_charge"]) || 0}</td>
                        )}

                        
                      </tr>
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
                    previousLabel={<FontAwesomeIcon
                      className="icon"
                      icon={faAngleDoubleLeft}
                      style={{ fontSize: "15px" }}
                    />}
                    nextLabel={<FontAwesomeIcon
                      className="icon"
                      icon={faAngleDoubleRight}
                      style={{ fontSize: "15px" }}
                    />}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pagesCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={(e) => handleNext(e)}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                    initialPage={0}
                  /> 
                </div>
              )}
            </div>
          )}
          {noInstitutes && institutions.length < 1 && (
            <p style={{ marginLeft: "40px" }}>No institutions found</p>
          )}
        </SelectSch>
        {/* <div className="spacer"></div> */}
        <VerificationContent />
      </DashboardBody>
    </DashboardLayout>
  );
};

export default DashboardContent;

const CardsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .transcript-card {
    display: block;
    height: 110px;
    background: transparent linear-gradient(148deg, #0092e0 0%, #0074b3 100%) 0%
      0% no-repeat padding-box;
    box-shadow: 0px 0px 5px #00000017;
    border-radius: 0px;
  }
`;

const SelectSch = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 7px;
  padding-bottom: 25px;
  box-shadow: 0px 0px 10px #00000029;
  margin-top: 20px;
  .selects {
    display: flex;
    margin-top: 25px;
    width: 100%;
    .sch-select {
      display: flex;
      flex-direction: column;
      padding-right: 20px;
      padding-left: 20px;
      width: 46%;
      label {
        font-family: "poppins";
        font-size: 12px;
        text-transform: uppercase;
        color: #707070;
      }
      .schl-input {
        height: 28px;
        border: 2px solid #e2e2e2;
        outline: none;
        font-family: "poppins";
        border-radius: 14px;
        padding-left: 5px;
        padding-left: 15px;
        @media screen and (max-width: 500px) {
          font-size: 16px;
          width: 250px;
        }
        @media (max-width: 500px) {
          width: 100%;
        }
      }
      @media (max-width: 500px) {
        width: 80%;
        padding-right: 0px;
      }
    }
    .country-select {
      display: flex;
      flex-direction: column;
      padding-left: 20px;
      width: 46%;
      label {
        font-family: "poppins";
        font-size: 12px;
        text-transform: uppercase;
        color: #707070;
      }
      @media (max-width: 500px) {
        width: 87%;
        margin-bottom: 15px;
        margin-top: 15px;
      }
    }
    @media (max-width: 500px) {
      display: flex;
      flex-direction: column;
    }
  }
  .req-trans {
    display: flex;
    width: 35%;
    padding-left: 20px;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 10px;
    @media (max-width: 500px) {
      width: 100%;
      padding-left: 10px;
    }
    .paragraph {
      p {
        &:nth-child(1) {
          font-family: "poppins";
          font-size: 15px;
          letter-spacing: 0.44px;
          color: #173049;
          text-transform: capitalize;
        }
        &:nth-child(2) {
          font-family: "poppins";
          font-size: 14px;
          letter-spacing: 0.44px;
          color: #707070;
          margin: 0;
        }
      }
      @media (max-width: 500px) {
        padding-right: 20px;
      }
    }

    p {
      &:nth-child(1) {
        font-weight: bold;
        margin-bottom: 3px;
      }
      &:nth-child(2) {
        font-size: 14px;
        font: normal normal medium 15px/19px "poppins";
        letter-spacing: 0.3px;
        color: #707070;
        margin: 0;
      }
    }
  }
`;

// const Table = styled.div`

// `;

const Card = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 0px 10px #00000029;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 7px;
  height: 110px;
  padding-bottom: 10px;
  opacity: 3;
  .trans-image{
    margin-left:10px
  }
  @media (max-width: 500px) {
    margin-bottom: 20px;
  }
  .total-verification {
    height: 30%;
    background: #ef0a0a;
    color: white;
    font: normal normal bold 16px/18px "poppins";
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .num {
    height: 70% 
    display: flex;
    justify-content: space-around;
    align-items: center;
    p {
      color: white;
      font: normal normal medium 22px/30px "poppins";
      font-family: "poppins";
      font-weight: normal;
      letter-spacing: 1.04px;
      font-size: 22px;
    }
  }
  .tran-text {
    display: flex;
    flex-direction: column;
    padding-right: 5px;

    .transcript {
      margin-top: 8px;
      padding-right: 10px;
      p {
        &:nth-child(1) {
          font-size: 15px;
          letter-spacing: 0.44px;
          color: #000000;
          margin: 0;
          font-family: "poppins";
          font-weight: bold
        }
      }
      p {
        &:nth-child(2) {
          font-size: 12px;
          letter-spacing: 0.32px;
          font-weight: normal;
          color: #707070;
          font-family: "poppins";
          margin: 0;
        }
      }
    }

    button {
      width: 90px;
      height: 30px;
      outline: none;
      border-radius: 6px;
      color: white;
      font-size: 12px;
      border: 1px solid #0092e0;
      background: #0092e0;
      margin-top: 15px;
    }
  }
`;
const DashboardBody = styled.div`
  height: 100%;
  padding-left: 30px;
  overflow-y: scroll;
  padding-right: 30px;
  background: #fafafb;
  font-family: "poppins";
  ::-webkit-scrollbar {
    display: none;
  }
  .new-table {
    margin-top: 10px;
    width: 100%;
    background: #ffffff 0% 0% no-repeat padding-box;
    border-radius: 7px;
    box-shadow: 0px 0px 10px #00000029;

    /* height: 90%; */
    overflow-x: hidden;
    margin-bottom: 10px;
    padding-bottom: 20px;
    @media (max-width: 400px) {
      overflow-x: scroll;
    }
    @media (max-width: 500px) {
      overflow-x: scroll;
    }
    .hide-table {
      display: none;
    }
    table {
      margin: 0 auto;
      width: 95%;
      border-collapse: collapse;
      overflow: hidden;
      font-size: 14px;
      text-align: left;
      .mobile-header {
        display: none;
      }

      td,
      th {
        padding: 10px;
        @media (max-width: 500px) {
          padding: 9px !important;
        }
      }

      th {
        background-color: #1e2a36;
        color: white;
      }

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
    .history {
      margin-left: 50px;
      font-family: "poppins";
      letter-spacing: 0.44px;
      color: #173049;
      opacity: 1;
    }
    @media (max-width: 400px) {
      text-align: center;
    }
    @media (max-width: 500px) {
      text-align: center;
    }
    .showing-search {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-right: 4rem;
      @media (max-width: 400px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 1rem;
      }
      @media (max-width: 500px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 1rem;
      }

      .showing {
        font-family: "poppins";
        letter-spacing: 0.44px;
        color: #707070;
        opacity: 1;
        margin-left: 50px;
        @media (max-width: 400px) {
          margin-left: 0;
        }
        @media (max-width: 500px) {
          margin-left: 0;
        }
      }
      .search-input {
        position: relative;
        padding: 0.5rem;

        input {
          height: 1rem;
          padding: 0.2rem;
          outline: none;
        }
        @media (max-width: 400px) {
          margin-bottom: 1rem;
          margin-left: 0;
        }
        @media (max-width: 500px) {
          margin-bottom: 1rem;
          margin-left: 0;
        }
        .icon {
          position: absolute;
          top: 30%;
          right: 5%;
          opacity: 0.7;
          color: #2c3e50;
        }
      }
    }
  }

  .spacer {
    margin-top: 4rem;
  }
`;
