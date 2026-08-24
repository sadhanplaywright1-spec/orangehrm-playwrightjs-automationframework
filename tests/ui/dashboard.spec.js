const { test, expect } = require('../../src/fixtures/CustomFixtures');
const LoginPage = require('../../src/pages/LoginPage');
const env = require('../../config/environments/qa.json');
const logger = require('../../src/utils/logger');
test('@smoke Verify Dashboard Page', async ({ page }) => {
logger.info('Starting Dashboard verification test');
const loginPage = new LoginPage(page);
logger.info(`Navigating to: ${env.baseURL}`);
await page.goto(env.baseURL);
logger.info('Logging into OrangeHRM');
await loginPage.login(
env.username,
env.password
);
logger.info('Waiting for Dashboard page to load');
await page.waitForURL('**/dashboard/index');
logger.info('Validating Dashboard heading');
await expect(
page.locator('h6.oxd-topbar-header-breadcrumb-module')
).toHaveText('Dashboard');
logger.info('Dashboard verification completed successfully');
});
await expect(page.locator('.oxd-topbar-header-title')).toContainText('Dashboard');