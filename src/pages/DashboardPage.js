const { expect } = require('@playwright/test');

class DashboardPage {
  constructor(page) {
    this.page = page;
    this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
    this.userMenu = page.locator('.oxd-userdropdown');
    this.logoutOption = page.getByRole('menuitem', { name: 'Logout' });
  }

  async goto() {
    await this.page.goto('/web/index.php/dashboard/index');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async expectVisible() {
    await expect(this.dashboardHeading).toBeVisible({ timeout: 15_000 });
  }

  async logout() {
    await this.userMenu.click();
    await this.logoutOption.click();
    await this.page.waitForURL('**/web/index.php/auth/login');
  }
}

module.exports = DashboardPage;
