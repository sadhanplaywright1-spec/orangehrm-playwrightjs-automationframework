const logger = require('../../src/utils/logger');
const { test, expect } = require('../../src/fixtures/CustomFixtures');
const LoginPage = require('../../src/pages/LoginPage');
const DashboardPage = require('../../src/pages/DashboardPage');
const env = require('../../src/utils/EnvironmentManager');
test('@regression Verify Employee List Page', async ({ page }) => {
try {
logger.info('Starting Employee List verification test');
logger.info(`Navigating to application: ${env.baseURL}`);
await page.goto(env.baseURL);
const loginPage = new LoginPage(page);
logger.info('Logging into application');
await loginPage.login(
env.username,
env.password
);
// Wait for Dashboard page after successful login
await page.waitForURL('**/dashboard/**', {
timeout: 30000
});
logger.info('Verifying dashboard page loaded');
const dashboardPage = new DashboardPage(page);
logger.info('Validating Dashboard page');
// Use DashboardPage method
await dashboardPage.verifyDashboard();
// Additional validation
await expect(
dashboardPage.dashboardHeader
).toBeVisible({
timeout: 10000
});
logger.info('Employee List verification completed successfully');
} catch (error) {
logger.error(`Employee List test failed: ${error.message}`);
await page.screenshot({
path: 'login-failure.png',
fullPage: true
});
throw error;
}
});