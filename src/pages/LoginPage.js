const { expect } = require('@playwright/test');
class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.username = page.locator('input[name="username"]');
    this.password = page.locator('input[name="password"]');
    this.loginBtn = page.locator('button[type="submit"]');
    this.errorMsg = page.locator('.oxd-alert-content-text');
  }
  async goto() {
    const maxAttempts = 3;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        await this.page.goto('/web/index.php/auth/login', {
          waitUntil: 'domcontentloaded',
          timeout: 30_000,
        });
        await this.page.waitForLoadState('domcontentloaded', { timeout: 30_000 });
        await expect(this.username).toBeVisible({ timeout: 15_000 });
        return;
      } catch (error) {
        if (attempt === maxAttempts) {
          throw error;
        }
        await this.page.waitForTimeout(1000);
      }
    }
  }

  async login(username, password, options = {}) {
    const { shouldSucceed = true } = options;
    const resolvedUsername = username || process.env.UI_USER || 'Admin';
    const resolvedPassword = password || process.env.UI_PASS || 'admin123';

    await this.username.fill(resolvedUsername);
    await this.password.fill(resolvedPassword);
    await this.loginBtn.click();

    if (shouldSucceed) {
      await this.page.waitForURL('**/web/index.php/dashboard/index', { timeout: 30_000 });
      return;
    }

    await this.page.waitForTimeout(1_500);
  }

  async expectLoggedIn() {
    const dashboardHeader = this.page.getByRole('heading', { name: 'Dashboard' });
    await expect(dashboardHeader).toBeVisible({ timeout: 15_000 });
  }

  async expectInvalidCredentialsError(expectedMessage = 'Invalid credentials') {
    await expect(this.errorMsg).toBeVisible({ timeout: 15_000 });
    await expect(this.errorMsg).toContainText(expectedMessage);
  }
}

module.exports = LoginPage;
