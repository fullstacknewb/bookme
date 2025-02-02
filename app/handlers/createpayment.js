'use server'
import { Client } from "square";
import { randomUUID } from "crypto";

const { paymentsApi } = new Client({
  accessToken: process.env.ACCESS_TOKEN,
  environment: "sandbox",
});

export async function submitPayment(sourceID) {
  console.log(process.env.ACCESS_TOKEN);
  try {
    const { result } = await paymentsApi.createPayment({
      idempotencyKey: crypto.randomUUID(),
      sourceId: 'cnon:card-nonce-ok',
      amountMoney: {
        currency: "CAD",
        amount: 3000,
      },
    });

    if(result.payment.status === 'COMPLETED'){
      
    }
    return result;
  } catch (error) {
    console.log(error);
  }
}