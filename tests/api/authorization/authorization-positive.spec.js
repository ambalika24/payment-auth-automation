const { test, expect } = require("../../../fixtures/payment-fixture");
const { authorize } = require("../../../utils/payment-intent");

test("should authorize a valid card payment", async ({ stripeApi }) => {
  const response = await authorize(stripeApi, {
    amount: 2000,
    currency: "usd",
  });

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.object).toBe("payment_intent");
  expect(body.status).toBe("succeeded");
  expect(body.amount).toBe(2000);
  expect(body.currency).toBe("usd");
  expect(body.amount_received).toBe(2000);
  expect(body.id).toBeTruthy();
});
