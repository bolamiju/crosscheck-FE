import React from 'react';
import Logo from "../../asset/CrossCheckLogo.png";
import Pdf from 'react-to-pdf';
import styled from 'styled-components';

const Receipt = () => {

    const ref = React.createRef();
    return (
        <>
        <PdfWrapper ref={ref}>
            <div className="first-section">
                <div className="img-text">
                    <img src={Logo} alt="" /> 
                    <h6>Trapezoid Limited</h6>
                    <p>Company No 23957483 <br/>VAT ID 9476392867 <br/>8 Ikeja <br/>Lagos Nigeria <br/>Nigeria</p>
                </div>
                <h1>Receipt</h1>
            </div>
            <div className="second-section">
                <div className="customer">
                <p>Customer</p>
                <p>Trapezoid Limited</p>
                <p>Nigeria</p>
                </div>
                <div className="invoice">
                    <div className="date">
                        <p>Invoice Date</p>
                        <p>Invoice#</p>
                        <p>Receipt id</p>
                        <p>Transaction id</p>
                    </div>
                    <div className="info">
                        <p>18 jul 2018</p>
                        <p>35648</p>
                        <p>53747</p>
                        <p>489567089</p>
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
padding: 1.5rem 12rem 1.5rem 1.5rem;
.first-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
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
        font-size: 0.8rem;
    }
}
.second-section {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
}
.customer {
    margin-top: 0.5rem;
    p {
        margin-bottom: -0.5rem;
        font-size: 0.8rem;
    }
}
.invoice {
    display: flex;
    justify-content: space-between;
}
.date {
    margin-right: 3rem;
    p {
        margin-bottom: -0.5rem;
        font-size: 0.8rem;
    }
}
.info {
    text-align: right;
    p {
        margin-bottom: -0.5rem;
        font-size: 0.8rem;
    }
}
`


export default Receipt
