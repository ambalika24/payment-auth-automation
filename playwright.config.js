const { defineConfig, devices } = require("@playwright/test");
require("dotenv").config();

const IS_CI = !!process.env.CI;

module.exports = defineConfig({
  testDir: "./tests",

  forbidOnly: IS_CI,

  retries: IS_CI ? 2 : 0,

  workers: IS_CI ? 4 : undefined,

  timeout: 30_000,

  expect: {
    timeout: 5_000,
  },

  reporter: IS_CI
    ? [["github"], ["html", { open: "never" }], ["list"]]
    : [["html", { open: "never" }], ["list"]],

  use: {
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 10_000,
  },

  projects: [
    {
      name: "api",
      testDir: "./tests/api",
      use: {
        baseURL: process.env.STRIPE_API_BASE_URL || "https://api.stripe.com/v1",
      },
    },

    {
      name: "chromium",
      testDir: "./tests/ui",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: process.env.CHECKOUT_BASE_URL || "http://localhost:4242",
      },
    },

    {
      name: "firefox",
      testDir: "./tests/ui",
      use: {
        ...devices["Desktop Firefox"],
        baseURL: process.env.CHECKOUT_BASE_URL || "http://localhost:4242",
      },
    },

    {
      name: "webkit",
      testDir: "./tests/ui",
      use: {
        ...devices["Desktop Safari"],
        baseURL: process.env.CHECKOUT_BASE_URL || "http://localhost:4242",
      },
    },
  ],
});
