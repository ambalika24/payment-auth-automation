const { expect } = require("@playwright/test");

async function createPaymentIntent(stripeApi, paymentData) {
  const response = await stripeApi.post("payment_intents", {
    form: {
      amount: String(paymentData.amount),
      currency: paymentData.currency,
    },
  });

  return response;
}

module.exports = { createPaymentIntent };
