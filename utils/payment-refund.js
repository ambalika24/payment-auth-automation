async function refund(stripeApi, paymentIntentId) {
  const response = await stripeApi.post("refunds", {
    form: {
      payment_intent: paymentIntentId,
    },
  });

  return response;
}

module.exports = { refund };
