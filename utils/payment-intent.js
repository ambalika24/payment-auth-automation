async function authorize(stripeApi,paymentData) {
  const response = await stripeApi.post("payment_intents", {
    form: {
      //id:"pi_123",
      amount: paymentData.amount,
      currency: paymentData.currency,
      payment_method: "pm_card_visa",
      confirm: "true",
      'automatic_payment_methods[enabled]': "true",
      'automatic_payment_methods[allow_redirects]': "never",
      
    },
  });

  return response;
 
}

module.exports = { authorize };
