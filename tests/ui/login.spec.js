const apiLocator = require('../../src/utils/RetryLocator');
const {test,expect} = require('../../src/fixtures/CustomFixtures');
const LoginPage =require('../../src/pages/LoginPage');
const DashboardPage =require('../../src/pages/DashboardPage');
const env =require('../../src/utils/EnvironmentManager');
test('@regression Verify Employee List Page', async ({ page }) =>{
await page.goto(env.baseURL);
const loginPage =new LoginPage(page);
await loginPage.login(env.username,env.password)
await expect(page.locator('h6')).toBeVisible();
const dashboardPage =new DashboardPage(page);
await expect(dashboardPage.dashboardHeader).toBeVisible();
});