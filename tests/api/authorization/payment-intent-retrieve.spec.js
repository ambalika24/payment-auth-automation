const { test, expect } = require("../../../fixtures/payment-fixture");
const { authorize } = require("../../../utils/payment-intent");
const { retrieve } = require("../../../utils/payment-intent-retrieve");

test("should retrieve an existing PaymentIntent", async ({ stripeApi }) => {
  const createResponse = await authorize(stripeApi, {
    amount: 2000,
    currency: "usd",
  });

  expect(createResponse.status()).toBe(200);

  const createdPaymentIntent = await createResponse.json();

  const retrieveResponse = await retrieve(stripeApi, createdPaymentIntent.id);

  expect(retrieveResponse.status()).toBe(200);

  const retrievedPaymentIntent = await retrieveResponse.json();

  expect(retrievedPaymentIntent.id).toBe(createdPaymentIntent.id);
  expect(retrievedPaymentIntent.object).toBe("payment_intent");
  expect(retrievedPaymentIntent.amount).toBe(2000);
  expect(retrievedPaymentIntent.currency).toBe("usd");
  expect(retrievedPaymentIntent.status).toBe("succeeded");
});
