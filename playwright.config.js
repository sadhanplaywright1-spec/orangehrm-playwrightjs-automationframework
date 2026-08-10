// @ts-check
const os = require('os');
const { defineConfig } = require('@playwright/test');
require('dotenv').config();

const env = process.env.TEST_ENV || 'qa';
const configForEnv = require(`./config/${env}.json`);
const environmentInfo = {
  TEST_ENV: env,
  ENVIRONMENT: configForEnv.environment || env,
  BASE_URL: configForEnv.baseUrl,
  API_BASE_URL: configForEnv.apiBaseUrl,
  NODE_VERSION: process.version,
  OS: `${process.platform} ${os.release()}`,
  BROWSER: 'chromium',
};

module.exports = defineConfig({
  testDir: './tests',
  timeout: 90_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: [
    ['list'],
    ['allure-playwright', { environmentInfo }],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
  ],
  use: {
    baseURL: configForEnv.baseUrl,
    headless: false,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 20_000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
  globalSetup: require.resolve('./src/fixtures/global-setup.js'),
  globalTeardown: require.resolve('./src/fixtures/global-teardown.js'),
});

