import React from "react";
import styled from "styled-components";
import { useFlutterwave } from "flutterwave-react-v3";

export default function FlutterWave({ submitRequest, amount }) {
  console.log("process", process.env.PUBLIC_URL);
  const config = {
    public_key: process.env.REACT_APP_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: amount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: "adetolaakere1@gmail.com",
      phonenumber: "08093215257",
      name: "Adetola Akere",
    },
    customizations: {
      title: "Verification Payment",
      description: "Payment for verification",
      logo:
        "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        handleFlutterPayment({
          callback: (response) => {
            console.log(response);
            if (response.status === "successful") {
              submitRequest("paid");
              console.log("payment successful");
            }
          },
          onClose: () => {},
        });
      }}
    >
      Proceed to payment
    </Button>
  );
}

const Button = styled.button`
  float: right;
  display: flex;
  align-items: center;
  justify-content: space-around;

  /* width: 80px; */
  color: white;
  margin-right: 20px;
  background: #0092e0 0% 0% no-repeat padding-box;
  border-radius: 10px;
  opacity: 1;
  height: 30px;
  outline: none;
  border-color: #0092e0;
`;
