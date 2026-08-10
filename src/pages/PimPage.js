const { expect } = require('@playwright/test');

class PimPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.addEmployeeButton = page.getByRole('link', { name: /add employee/i });
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.middleNameInput = page.locator('input[name="middleName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.saveButton = page.getByRole('button', { name: /^save$/i });
  }

  async goto() {
    await this.page.goto('/web/index.php/pim/viewPimModule');
    await expect(this.page).toHaveURL(/\/web\/index\.php\/pim\//, { timeout: 20_000 });
    await expect(this.addEmployeeButton).toBeVisible({ timeout: 20_000 });
  }

  async openAddEmployeeForm() {
    await this.addEmployeeButton.click();
    await expect(this.firstNameInput).toBeVisible({ timeout: 20_000 });
  }

  async createEmployee({ firstName, lastName }) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.saveButton.click();
  }

  async expectEmployeeCreated({ firstName, lastName }) {
    await expect(this.page).toHaveURL(/\/web\/index\.php\/pim\/viewPersonalDetails\/empNumber\/\d+/, { timeout: 30_000 });
    await expect(this.firstNameInput).toHaveValue(firstName, { timeout: 20_000 });
    await expect(this.lastNameInput).toHaveValue(lastName, { timeout: 20_000 });
  }
}

module.exports = PimPage;
