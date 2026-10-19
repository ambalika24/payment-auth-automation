async function cancel(stripeApi, paymentIntentId) {
  const response = await stripeApi.post(
    `payment_intents/${paymentIntentId}/cancel`,
  );

  return response;
}

module.exports = { cancel };
