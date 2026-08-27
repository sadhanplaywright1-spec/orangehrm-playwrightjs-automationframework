# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.js >> @regression Verify Employee List Page
- Location: tests\ui\login.spec.js:6:1

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: page.screenshot: Target page, context or browser has been closed
```

# Test source

```ts
  1  | const logger = require('../../src/utils/logger');
  2  | const { test, expect } = require('../../src/fixtures/CustomFixtures');
  3  | const LoginPage = require('../../src/pages/LoginPage');
  4  | const DashboardPage = require('../../src/pages/DashboardPage');
  5  | const env = require('../../src/utils/EnvironmentManager');
  6  | test('@regression Verify Employee List Page', async ({ page }) => {
  7  | try {
  8  | logger.info('Starting Employee List verification test');
  9  | logger.info(`Navigating to application: ${env.baseURL}`);
  10 | await page.goto(env.baseURL);
  11 | const loginPage = new LoginPage(page);
  12 | logger.info('Logging into application');
  13 | await loginPage.login(
  14 | env.username,
  15 | env.password
  16 | );
  17 | // Wait for Dashboard page after successful login
  18 | await page.waitForURL('**/dashboard/**', {
  19 | timeout: 30000
  20 | });
  21 | logger.info('Verifying dashboard page loaded');
  22 | const dashboardPage = new DashboardPage(page);
  23 | logger.info('Validating Dashboard page');
  24 | // Use DashboardPage method
  25 | await dashboardPage.verifyDashboard();
  26 | // Additional validation
  27 | await expect(
  28 | dashboardPage.dashboardHeader
  29 | ).toBeVisible({
  30 | timeout: 10000
  31 | });
  32 | logger.info('Employee List verification completed successfully');
  33 | } catch (error) {
  34 | logger.error(`Employee List test failed: ${error.message}`);
> 35 | await page.screenshot({
     |            ^ Error: page.screenshot: Target page, context or browser has been closed
  36 | path: 'login-failure.png',
  37 | fullPage: true
  38 | });
  39 | throw error;
  40 | }
  41 | });
```