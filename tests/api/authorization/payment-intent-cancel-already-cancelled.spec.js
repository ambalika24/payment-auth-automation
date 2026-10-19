const { test, expect } = require("../../../fixtures/payment-fixture");
const { cancel } = require("../../../utils/payment-intent-cancel");
const { createPaymentIntent } = require("../../../utils/payment-intent-create");

test("should reject cancelling an already cancelled PaymentIntent", async ({
  stripeApi,
}) => {
  const createResponse = await createPaymentIntent(stripeApi, {
    amount: 2000,
    currency: "usd",
  });

  expect(createResponse.status()).toBe(200);

  const paymentIntent = await createResponse.json();

  const firstCancelResponse = await cancel(stripeApi, paymentIntent.id);

  expect(firstCancelResponse.status()).toBe(200);

  const firstCancelBody = await firstCancelResponse.json();

  expect(firstCancelBody.status).toBe("canceled");

  const secondCancelResponse = await cancel(stripeApi, paymentIntent.id);

  expect(secondCancelResponse.status()).toBe(400);

  const secondCancelBody = await secondCancelResponse.json();

  expect(secondCancelBody.error).toBeDefined();
});
