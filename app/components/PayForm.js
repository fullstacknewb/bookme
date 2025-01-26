'use client'
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import { submitPayment } from "../handlers/createpayment";

export default function PayForm(){

    return (
        <div>
        <h1>Payment</h1>
        <PaymentForm
        applicationId= 'sq0idp-hb8BTaJzFHnTBAKensUMrA'
        locationId='LY2QRHG0Q0XZ7'
        cardTokenizeResponseReceived={async (token) => {
          const result = await submitPayment(token.token);
        console.log(token);
      }}
    >
      <CreditCard />
    </PaymentForm>
        </div>
    )
}