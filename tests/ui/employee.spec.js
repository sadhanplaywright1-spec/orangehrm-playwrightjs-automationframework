const { test } = require('@playwright/test');
const LoginPage = require('../../src/pages/LoginPage');
const PimPage = require('../../src/pages/PimPage');

test.describe('Employee management', () => {
  test('create employee from PIM page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const pimPage = new PimPage(page);

    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');
    await loginPage.expectLoggedIn();

    await pimPage.goto();
    await pimPage.openAddEmployeeForm();

    const firstName = `Auto${Date.now()}`;
    const lastName = `User${Date.now()}`;

    await pimPage.createEmployee({ firstName, lastName });
    await pimPage.expectEmployeeCreated({ firstName, lastName });
  });
});
