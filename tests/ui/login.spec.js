const { test, expect } = require('@playwright/test');
const LoginPage = require('../../src/pages/LoginPage');
const logger = require('../../src/utils/logger');
test.describe('Login flow', () => {
  test('login with valid credentials', async ({ page }, testInfo) => {
    logger.info({ test: testInfo.title, stage: 'start' });
    const loginPage = new LoginPage(page);
    const username = process.env.UI_USER || 'Admin';
    const password = process.env.UI_PASS || 'admin123';

    await loginPage.goto();
    await test.step('Login action', async () => {
      await loginPage.login(username, password);
    });
    await loginPage.expectLoggedIn();
    logger.info({ test: testInfo.title, stage: 'end' });
  });
});