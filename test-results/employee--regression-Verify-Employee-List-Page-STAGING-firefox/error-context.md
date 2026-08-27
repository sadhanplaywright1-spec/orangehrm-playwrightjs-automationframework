# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: employee.spec.js >> @regression Verify Employee List Page
- Location: tests\ui\employee.spec.js:6:1

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
  3  | const PimPage = require('../../src/pages/PimPage');
  4  | const env = require('../../config/environments/qa.json');
  5  | const logger = require('../../src/utils/logger');
  6  | test('@regression Verify Employee List Page', async ({ page }) => {
  7  | logger.info('Starting Employee List Page test');
  8  | logger.info(`Navigating to application: ${env.baseURL}`);
> 9  | await page.goto(env.baseURL);
     |            ^ Error: page.goto: Test timeout of 60000ms exceeded.
  10 | const loginPage = new LoginPage(page);
  11 | logger.info('Logging into application');
  12 | await loginPage.login(
  13 | env.username,
  14 | env.password
  15 | );
  16 | const pimPage = new PimPage(page);
  17 | logger.info('Navigating to Employee List page');
  18 | await pimPage.navigateToEmployeeList();
  19 | logger.info('Verifying Employee List page');
  20 | await pimPage.verifyEmployeePage();
  21 | logger.info('Employee List page verification completed successfully');
  22 | });
```