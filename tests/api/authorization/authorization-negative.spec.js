const { test, expect } = require("../../../fixtures/payment-fixture");
const { authorize } = require("../../../utils/payment-intent");

test("should reject a request with a missing amount", async ({ stripeApi }) => {
  const response = await authorize(stripeApi, {
    currency: "usd",
  });

  expect(response.status()).toBe(400);

  const body = await response.json();

  expect(body.error).toBeDefined();
  expect(body.error.code).toBe("parameter_missing");
  expect(body.error.param).toBe("amount");
  expect(body.error.type).toBe("invalid_request_error");
});

test("should reject a negative amount", async ({ stripeApi }) => {
  const response = await authorize(stripeApi, {
    amount: -100,
    currency: "usd",
  });

  expect(response.status()).toBe(400);

  const body = await response.json();

  expect(body.error).toBeDefined();
  expect(body.error.code).toBe("parameter_invalid_integer");
  expect(body.error.param).toBe("amount");
  expect(body.error.type).toBe("invalid_request_error");
});

test("should reject an invalid currency", async ({ stripeApi }) => {
  const response = await authorize(stripeApi, {
    amount: 2000,
    currency: "xyz",
  });

  expect(response.status()).toBe(400);

  const body = await response.json();

  expect(body.error).toBeDefined();
  expect(body.error.param).toBe("currency");
  expect(body.error.type).toBe("invalid_request_error");
});
