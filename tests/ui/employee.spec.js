const { test, expect } = require('../../src/fixtures/CustomFixtures');
const LoginPage = require('../../src/pages/LoginPage');
const PimPage = require('../../src/pages/PimPage');
const env = require('../../config/environments/qa.json');
const logger = require('../../src/utils/logger');
test('@regression Verify Employee List Page', async ({ page }) => {
logger.info('Starting Employee List Page test');
logger.info(`Navigating to application: ${env.baseURL}`);
await page.goto(env.baseURL);
const loginPage = new LoginPage(page);
logger.info('Logging into application');
await loginPage.login(
env.username,
env.password
);
const pimPage = new PimPage(page);
logger.info('Navigating to Employee List page');
await pimPage.navigateToEmployeeList();
logger.info('Verifying Employee List page');
await pimPage.verifyEmployeePage();
logger.info('Employee List page verification completed successfully');
});