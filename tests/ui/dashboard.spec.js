const { test, expect } = require('@playwright/test');
const LoginPage =
require('../../src/pages/LoginPage');
const env =
require('../../config/environments/qa.json');
test('@smoke Verify Dashboard Page', async ({ page }) => {
const loginPage =
new LoginPage(page);
await page.goto(env.baseURL);
await loginPage.login(
env.username,
env.password
);
await expect(page)
await page.waitForURL(
'**/dashboard/index'
);
await expect(
page.locator(
'h6.oxd-topbar-header-breadcrumb-module'
)
).toHaveText('Dashboard');
});