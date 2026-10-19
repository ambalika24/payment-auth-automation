const { test, expect } = require("../../../fixtures/payment-fixture");
const { cancel } = require("../../../utils/payment-intent-cancel");

test("should reject cancellation with an invalid PaymentIntent ID", async ({
  stripeApi,
}) => {
  const response = await cancel(stripeApi, "pi_123");

  expect(response.status()).toBe(404);

  const body = await response.json();

  expect(body.error).toBeDefined();
  expect(body.error.code).toBe("resource_missing");
});
