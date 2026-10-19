require("dotenv").config();

const { test, expect } = require("@playwright/test");

const STRIPE_BASE_URL =
  process.env.STRIPE_API_BASE_URL || "https://api.stripe.com/v1";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

if (!STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is missing. Check your local .env file.");
}

if (!STRIPE_SECRET_KEY.startsWith("sk_test_")) {
  throw new Error(
    "Only a Stripe test secret key beginning with sk_test_ is allowed.",
  );
}

const stripeAuth = Buffer.from(`${STRIPE_SECRET_KEY}:`).toString("base64");

const testWithStripe = test.extend({
  stripeApi: async ({ playwright }, use) => {
    const stripeApi = await playwright.request.newContext({
      baseURL: STRIPE_BASE_URL,
      extraHTTPHeaders: {
        Authorization: `Basic ${stripeAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    try {
      await use(stripeApi);
    } finally {
      await stripeApi.dispose();
    }
  },
});

module.exports = {
  test: testWithStripe,
  expect,
};