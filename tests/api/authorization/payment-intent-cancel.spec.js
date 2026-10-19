const { test, expect } = require("../../../fixtures/payment-fixture");
const { cancel } = require("../../../utils/payment-intent-cancel");
const { createPaymentIntent } = require("../../../utils/payment-intent-create");

test("should cancel a PaymentIntent", async ({ stripeApi }) => {
  const createResponse = await createPaymentIntent(stripeApi, {
    amount: 2000,
    currency: "usd",
  });

  expect(createResponse.status()).toBe(200);

  const body = await createResponse.json();

  expect(body.status).toBe("requires_payment_method");

  const cancelResponse = await cancel(stripeApi, body.id);

  expect(cancelResponse.status()).toBe(200);

  const cancelBody = await cancelResponse.json();

  expect(cancelBody.id).toBe(body.id);
  expect(cancelBody.status).toBe("canceled");
});
