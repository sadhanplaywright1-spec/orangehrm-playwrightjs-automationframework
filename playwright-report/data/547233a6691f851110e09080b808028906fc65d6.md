# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dashboard.spec.js >> @smoke Verify Dashboard Page
- Location: tests\ui\dashboard.spec.js:5:1

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: page.goto: Test timeout of 60000ms exceeded.
Call log:
  - navigating to "https://opensource-demo.orangehrmlive.com/", waiting until "load"

```

# Test source

```ts
  1  | const { test, expect } = require('../../src/fixtures/CustomFixtures');
  2  | const LoginPage = require('../../src/pages/LoginPage');
  3  | const env = require('../../config/environments/qa.json');
  4  | const logger = require('../../src/utils/logger');
  5  | test('@smoke Verify Dashboard Page', async ({ page }) => {
  6  | logger.info('Starting Dashboard verification test');
  7  | const loginPage = new LoginPage(page);
  8  | logger.info(`Navigating to: ${env.baseURL}`);
> 9  | await page.goto(env.baseURL);
     |            ^ Error: page.goto: Test timeout of 60000ms exceeded.
  10 | logger.info('Logging into OrangeHRM');
  11 | await loginPage.login(
  12 | env.username,
  13 | env.password
  14 | );
  15 | logger.info('Waiting for Dashboard page to load');
  16 | await page.waitForURL('**/dashboard/index');
  17 | logger.info('Validating Dashboard heading');
  18 | await expect(
  19 | page.locator('h6.oxd-topbar-header-breadcrumb-module')
  20 | ).toHaveText('Dashboard');
  21 | logger.info('Dashboard verification completed successfully');
  22 | });
```