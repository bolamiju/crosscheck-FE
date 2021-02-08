import React from 'react';
import Logo from "../../asset/CrossCheckLogo.png";
import Pdf from 'react-to-pdf';
import styled from 'styled-components';

const Receipt = ({receiptDetails,userCountry}) => {
    const ref = React.createRef();
    const convertedUsd = 382
    const user = JSON.parse(localStorage.getItem("user"));

      const toDollar = (amount) => {
        return Math.round(Number(amount) / Number(convertedUsd));
      };

    return (
        <>
        <PdfWrapper ref={ref}>
            <div className="first-section">
                <div className="img-text">
                    <img src={Logo} alt="" /> 
                    <h6>Crosscheck Limited</h6>
                    <p>Company No 23957483 </p>
                    <p>39 Opebi Road, Opebi, Ikeja</p>
                    <p>Lagos, Nigeria</p>
                </div>
                <h1>Receipt</h1>
            </div>
            <div className="second-section">
                <div className="customer">
                <strong>Customer Details</strong>
                <p>{user?.firstName} {user?.lastName}</p>
                <p>{user?.organizationName || ''}</p>
                </div>
                <div className="invoice">
                    <div className="date">
                       <p> <strong>Invoice Date</strong></p>
                       <p> <strong>Amount</strong></p>
                       <p> <strong>Transaction id</strong></p>
                       <p> <strong>Request Type</strong></p>
                    </div>
                    <div className="info">
                        <p>{receiptDetails?.date}</p>
                        {
                            receiptDetails.amount ? (userCountry && userCountry === 'NG' ? (<p>&#8358;{receiptDetails?.amount}</p>) : (<p>${toDollar(receiptDetails?.amount)}</p>)) :  (userCountry && userCountry === 'NG' ? (<p>&#8358;{receiptDetails['our_charge'] && (Number(receiptDetails['our_charge']) + (receiptDetails['institute_charge'] ? Number(receiptDetails['institute_charge']) : 0))}</p>) : (
                      
                                <p>${toDollar(Number(receiptDetails['our_charge'])) + toDollar(Number(receiptDetails['institute_charge'] ? Number(receiptDetails['institute_charge']) : 0))} </p>
                              ))
                        }
                        <p>{receiptDetails?.tranId || 'NA'}</p>
                        <p>{receiptDetails?.amount ? 'Transcript Request' : 'Education Verification'}</p>
                    </div>
                </div>
            </div>
            
        </PdfWrapper>
            <Pdf targetRef={ref} filename="receipt.pdf">
                {({ toPdf }) => <button style={{ backgroundColor: "#0092e0", border: "none", padding: "0.8rem", color: "#ffffff", float: "right",  marginRight:"1.5rem", borderRadius: "15px", outline: "none", cursor: "pointer" }}
                    onClick={toPdf}>Download as PDF</button>}
        </Pdf>
            </>
    )
};

const PdfWrapper = styled.div`
padding: 1.5rem 18rem 1.5rem 1.5rem;
@media (max-width: 400px) {
    width: 750px;
}
@media (max-width: 400px) {
    width: 750px;
}
.first-section {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    align-content: center;
    width:85%;
    @media (max-width: 400px) {
        h1 {
        font-size: 1.5rem;
        margin-left: -2.5rem;
    }
    }
    @media (max-width: 500px) {
        h1 {
        font-size: 1.5rem;
        margin-left: -2.5rem;
    }
    }
}
.img-text  {
    display: block;
    h6 {
        margin: 0;
        font-size: 1.2rem;
        font-weight: normal;
    }
    p {
        margin: 0;
        margin-top:5px;
        font-size: 0.8rem;
    }
    
}
.second-section {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    width:85%
}
.customer {
    margin-top: 0.5rem;
    p {
        margin-bottom: -0.5rem;
        font-size: 16px;
    }
}
.invoice {
    display: flex;
    justify-content: space-between;
}
.date {
    margin-right: 3rem;
    text-align: right;
    p {
        margin-bottom: -0.5rem;
        font-size: 0.8rem;
    }
}
.info {
    text-align: left;
    p {
        margin-bottom: -0.5rem;
        font-size: 0.8rem;
    }
}
`


export default Receipt
