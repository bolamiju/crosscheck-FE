import React, { useState,useEffect } from "react";
import Layout from "./DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft,faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import ipapi from 'ipapi.co'
import {
  getUserVerification,
  getUserTranscript,
} from "../../state/actions/verifications";
import Receipt from "./Receipt";

import styled from "styled-components";

const Receipts = ({ history }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [show, setShow] = useState("close");
  const [userCountry,setUserCountry] = useState('')
  const convertedUsd = 382

  const dispatch = useDispatch();
  const { userVerifications, newTranscript } = useSelector(
    (state) => state.verifications
  );

  const [input, setInput] = useState("");
  const [receiptDetails, setReceiptDetails] = useState({});
  const [searchParameter] = useState("status");
  const user = JSON.parse(localStorage.getItem("crosscheckuser"));

  useEffect(()=>{
    ipapi.location((loca)=>setUserCountry(loca),'','','country')
  },[])

  useEffect(() => {
    dispatch(getUserTranscript(user.email));
    dispatch(getUserVerification(user.email));
  }, [dispatch, user.email]);

  const allHistory = userVerifications.concat(newTranscript);

  const filteredItems = allHistory?.filter((history) =>
    history[searchParameter]
      ?.toLocaleLowerCase()
      .includes(input.toLocaleLowerCase())
  );

  const pageSize = 15;

  const verificationsCount = Math.ceil(filteredItems.length / pageSize);

  function handleInputChange(e) {
    setInput(e.target.value);
  }

  const truncateString = (str) => {
    if (str.length <= 24) {
      return str;
    }
    return str.slice(0, 32) + "...";
  };

  const toDollar = (amount) => {
    return Math.round(Number(amount) / Number(convertedUsd));
  };

  const handleReceiptDetails =(details)=>{
    setReceiptDetails(details)
    setShow("open");
  }
  const handleNext=(data)=>{
    return setCurrentPage(data.selected)
  }
  return (
    <Layout>
      <ReceiptBody>
        <div className="new-table">
          {show === "open" && (
            <Receipt style={{ padding: "3rem", textAlign: "center" }} receiptDetails={receiptDetails} userCountry={userCountry}/>
          )}
          <div id="tableScroll">
            <table>
              <thead>
                <tr>
                <th>Request type</th>
                  <th>Institution</th>
                  <th>our charge</th>
                  <th>Institute charge</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody className="t-body">
              {filteredItems.length > 0
                  && filteredItems
                      .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                      .map(
                        (item) => (
                          <tr
                          onClick={()=>{
                            handleReceiptDetails(item)
                          }}
                        >
                            
                  <td>{item?.destination ? 'Transcript Request' : 'Verification Request'}</td>
                  <td>{truncateString(item?.institution)}</td>
                          {item['our_charge'] ? (
                            userCountry === 'NG' ? (<td>&#8358;{item['our_charge']}</td>) : (<td>${toDollar(item['our_charge'])}</td>)
                          ) : item.amount ? (userCountry ==='NG' ? (<td>&#8358;{item.amount}</td>) : (<td>${toDollar(item.amount)}</td>)) : <td>-</td>
                        }
                        {
                          item['institute_charge'] ? (
                            userCountry ==='NG' ? (<td>&#8358;{item['institute_charge']}</td>) : (<td>${toDollar(item['institute_charge'])}</td>)
                          ) : <td>-</td>
                        }
                  {item.amount ? (
                    userCountry === 'NG' ? (<td>&#8358;{item.amount}</td>) : (<td>${toDollar(item.amount)}</td>)
                    ) :
                    (userCountry === 'NG' ? (<td>&#8358;{item['our_charge'] && (Number(item['our_charge']) + (item['institute_charge'] ? Number(item['institute_charge']) : 0))}</td>) : (
                      
                      <td>${toDollar(Number(item['our_charge'])) + toDollar(Number(item['institute_charge'] ? Number(item['institute_charge']) : 0))} </td>
                    ))}
                  <tr className="space"></tr>
                            </tr>
                        ))}
              </tbody>
            </table>
            <div className="pagination-line">
              <p>
                Showing{" "}
                {
                  allHistory.slice(
                    currentPage * pageSize,
                    (currentPage + 1) * pageSize
                  ).length
                }{" "}
                of {allHistory.length} of entries
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
                    pageCount={verificationsCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={(e) => handleNext(e)}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                  /> 
            </div>
          </div>
          {/* </Table> */}
        </div>
      </ReceiptBody>
    </Layout>
  );
};

const ReceiptBody = styled.div`
  height: 100%;
  padding: 30px;
  overflow-y: scroll;
  padding-right: 30px;
  background: #fafafb;
  font-family: "poppins";
  ::-webkit-scrollbar {
    display: none;
  }
  .new-table {
    margin-top: 1rem;
    width: 100%;
    background: #ffffff;
    padding-top: 1rem;
    border-radius: 7px;
    box-shadow: 0px 0px 10px #00000029;

    /* height: 90%; */
    overflow-x: hidden;
    margin-bottom: 10px;
    padding-bottom: 20px;
    .hide-table {
      display: none;
    }

    table {
      margin: 5rem auto;
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
        @media (max-width: 500px) {
          padding: 9px !important;
        }
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
    .history {
      margin-left: 50px;
      font-family: "poppins";
      font-weight: bold;
      letter-spacing: 0.44px;
      color: #173049;
      opacity: 1;
    }

    .showing {
      font-family: "poppins";
      letter-spacing: 0.44px;
      color: #707070;
      opacity: 1;
      margin-left: 50px;
    }
  }
`;

export default Receipts;
