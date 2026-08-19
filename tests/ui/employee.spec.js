const apiLocator = require('../../src/utils/RetryLocator');
const { test } = require('@playwright/test');
const LoginPage = require('../../src/pages/LoginPage');
const PimPage = require('../../src/pages/PimPage');
const env = require('../../config/environments/qa.json');
test('@regression Verify Employee List Page', async ({ page }) => {
await page.goto(env.baseURL);
const loginPage = new LoginPage(page);
await loginPage.login(
env.username,
env.password);
const pimPage = new PimPage(page);
await pimPage.navigateToEmployeeList();
await pimPage.verifyEmployeePage();
});