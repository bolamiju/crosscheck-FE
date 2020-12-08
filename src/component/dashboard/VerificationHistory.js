import React, { useState, useEffect } from 'react';
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import DashboardLayout from "./DashboardLayout";
import { getAllInstitutions } from "../../state/actions/institutions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


import {
  getUserVerification,
  getUserTranscript
} from "../../state/actions/verifications";
import Modal from '../FormModal';


const EmailActivation = ({history}) => {

  const [currentPage, setCurrentPage] = useState(0);

  const dispatch = useDispatch();
  const { userVerifications, newTranscript } = useSelector((state) => state.verifications);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
    const [searchParameter] = useState("status");
  const user = JSON.parse(localStorage.getItem("user"));


  useEffect(() => {
    dispatch(getUserTranscript(user.email))
  }, [dispatch])

  const allHistory = userVerifications.concat(newTranscript)
  useEffect(() => {
    dispatch(getUserVerification(user.email));
  }, [dispatch]);


  useEffect(() => {
    dispatch(getAllInstitutions());
    dispatch(getUserVerification(user.email));
  }, [dispatch]);




  


  const verificationsNavigation = (e, index) => {
    e.preventDefault();
    if (index < 0 || index >= verificationsCount) {
      return;
    } else {
      setCurrentPage(index);
    }
  };

  const filteredItems = allHistory.filter((history) =>
  history[searchParameter].toLocaleLowerCase().includes(input.toLocaleLowerCase())
    );
    
    const pageSize = 10;

  const verificationsCount = Math.ceil(filteredItems.length / pageSize);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleInputChange(e) {
    setInput(e.target.value);
  }


  return (
      <DashboardLayout history={history}>
      <WallWrapper>
        <h6>verification history</h6>
        {/* <Table> */}
        <div className="new-table" id="tableScroll">
        <p
            className="history"
            style={{ marginBottom: "45px", marginTop: "25px" }}
          >
              Verification history
          </p>
         <div className="showing-search">
         <p className="showing">
            Showing ({filteredItems.length}) entries
          </p>
           {searchParameter === "status" && (
            <div>
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="search"
            />
            <FontAwesomeIcon className="icon" icon={faSearch} style={{ fontSize: "20px" }} />
            </div>
                          
           )}
         </div>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Institution</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="t-body">
              {filteredItems.length > 0
                ? filteredItems
                  .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                  .map((verification) => (
                    <>
                      <tr onClick={handleOpen}>
                        <td>{verification.date}</td>
                        <td>{`${verification.firstName}  ${verification.lastName}`}</td>
                        <td>{verification.institution}</td>
                        <td>{verification.status}</td>
                      </tr>
                      <tr className="space"></tr>
                    </>
                  ))
                : ""}
            </tbody>
            <Modal
              open={open}
              onClose={handleClose}
            />
          </table>
          <div className="pagination-line">
            <p>
              Showing{" "}
              {
                filteredItems.slice(
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
        </WallWrapper>
      </DashboardLayout>
  )
};

const WallWrapper = styled.div`
overflow-y: scroll;
height: 100%;
padding-left: 2rem;
padding-right: 2rem;
background: var(--mainWhite);
h6 {
  font-family: MontserratRegular;
  letter-spacing: 0px;
  color: #0092E0;
  opacity: 1;
  text-transform: capitalize;
  font-size: 2rem;
  font-weight: normal;
  opacity: 1;
  padding-bottom: -1.5rem;
}
.new-table {
    /* margin-top: 10px; */
    width: 100%;
    background: #ffffff 0% 0% no-repeat padding-box;
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
    .showing-search {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-right: 4rem;

      .showing {
      font-family: MontserratRegular;
      letter-spacing: 0.44px;
      color: #707070;
      opacity: 1;
      margin-left: 50px;
    }
    input {
        height: 1rem;
        padding: 0.2rem;
        outline: none;
      }
    }

    
  }

`

export default EmailActivation;
