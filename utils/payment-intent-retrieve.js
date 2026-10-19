async function retrieve(stripeApi, paymentIntentId) {

    const response = await stripeApi.get(`payment_intents/${paymentIntentId}`);
        return response;
    
}

module.exports = { retrieve };