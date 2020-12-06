import React, { useState } from 'react';
import Layout from './DashboardLayout';
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import Receipt from './Receipt';

// import Institution from "../../asset/institution.svg";
import styled from "styled-components";

const Receipts = ({ history }) => {
    
  const [currentPage, setCurrentPage] = useState(0);
  const [show, setShow] = useState("close");

    // const dispatch = useDispatch();
    const { userVerifications } = useSelector((state) => state.verifications);

    const pageSize = 10;

    const verificationsCount = Math.ceil(userVerifications.length / pageSize);
    
    const verificationsNavigation = (e, index) => {
        e.preventDefault();
        if (index < 0 || index >= verificationsCount) {
          return;
        } else {
          setCurrentPage(index);
        }
  };
    
    return (
        <Layout history={history}>
        <RequisitionBody>
       
          <div className="new-table">
            {show === "open" && (
              <Receipt style={{ padding: "3rem", textAlign: "center"}} />
            )}
            {/* <Table> */}
        <div  id="tableScroll">
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Institute Surcharge</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody className="t-body">
                  <tr onClick={() => {
                    setShow("open")
                  }}>
                          <td>University of Lagos/Student Verification</td>
                          <td>$20.00</td>
                          <td>$0.00</td>
                          <td>$20.00</td>
                        </tr>
                  <tr onClick={() => {
                    setShow("open")
                  }}>
                          <td>University of Lagos/Student Verification</td>
                          <td>$20.00</td>
                          <td>$0.00</td>
                          <td>$20.00</td>
                        </tr>
                        <tr className="space"></tr>
            </tbody>
          </table>
          <div className="pagination-line">
            <p>
              Showing{" "}
              {
                userVerifications.slice(
                  currentPage * pageSize,
                  (currentPage + 1) * pageSize
                ).length
              }{" "}
              of {verificationsCount} of entries
            </p>
            <Pagination aria-label="Page navigation example">
              <PaginationItem
                disabled={currentPage <= 0}
                className="prev"
                onClick={(e) => verificationsNavigation(e, currentPage - 1)}
              >
                <PaginationLink previous href={() => false} />
              </PaginationItem>

              {[...Array(verificationsCount)].map((page, i) => (
                <PaginationItem
                  active={i === currentPage}
                  key={i}
                  onClick={(e) => verificationsNavigation(e, i)}
                >
                  <PaginationLink href={() => false}>{i + 1}</PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem
                disabled={currentPage >= verificationsCount - 1}
                onClick={(e) => verificationsNavigation(e, currentPage + 1)}
              >
                <PaginationLink next href={() => false} className="next" />
              </PaginationItem>
            </Pagination>
          </div>
        </div>
        {/* </Table> */}
        </div> 
            </RequisitionBody>
        </Layout>
    )
}

const RequisitionBody = styled.div`
   
  height: 100%;
  padding: 30px;
  overflow-y: scroll;
  padding-right: 30px;
  background: #fafafb;
  font-family: "Rubik", sans-serif;
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
      font-family: MontserratBold;
      letter-spacing: 0.44px;
      color: #173049;
      opacity: 1;
    }

    .showing {
      font-family: MontserratRegular;
      letter-spacing: 0.44px;
      color: #707070;
      opacity: 1;
      margin-left: 50px;
    }
  }
`;

export default Receipts;
