const { test, expect } = require("../../../fixtures/payment-fixture");
const { authorize } = require("../../../utils/payment-intent");
const { refund } = require("../../../utils/payment-refund");

test("should refund a successful PaymentIntent", async ({ stripeApi }) => {
  const paymentResponse = await authorize(stripeApi, {
    amount: 2000,
    currency: "usd",
  });

  expect(paymentResponse.status()).toBe(200);

  const paymentIntent = await paymentResponse.json();

  expect(paymentIntent.status).toBe("succeeded");

  const refundResponse = await refund(stripeApi, paymentIntent.id);

  expect(refundResponse.status()).toBe(200);

  const refundBody = await refundResponse.json();

  expect(refundBody.object).toBe("refund");
  expect(refundBody.payment_intent).toBe(paymentIntent.id);
  expect(refundBody.amount).toBe(2000);
  expect(refundBody.currency).toBe("usd");
  expect(refundBody.status).toBe("succeeded");
});
