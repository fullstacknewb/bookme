'use server'
import { Client } from "square";
import { randomUUID } from "crypto";

const { paymentsApi } = new Client({
  accessToken: 'EAAAl1ObzCX7S9AkD193gc2B_UymC23Wg1t7Q6zp0x9OgUVWGa7W_hAc3lIwci_n',
  environment: "sandbox",
});

export async function submitPayment(sourceID) {
  try {
    const { result } = await paymentsApi.createPayment({
      idempotencyKey: crypto.randomUUID(),
      sourceId: 'cnon:card-nonce-ok',
      amountMoney: {
        currency: "CAD",
        amount: 3000,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
}