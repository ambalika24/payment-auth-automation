const { test, expect } = require("../../../fixtures/payment-fixture");
const { retrieve } = require("../../../utils/payment-intent-retrieve");

test("should reject retrieving a PaymentIntent with an invalid ID", async ({
  stripeApi,
}) => {
  const response = await retrieve(stripeApi, "pi_123");

  expect(response.status()).toBe(404);

  const body = await response.json();

  expect(body.error).toBeDefined();
  expect(body.error.code).toBe("resource_missing");
});
