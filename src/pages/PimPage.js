const { expect } =require('@playwright/test');
class PimPage {
constructor(page) {
this.page = page;
this.pimMenu =
page.locator(
'//span[text()="PIM"]'
);
this.employeeInfoHeader =
page.locator(
'h5:has-text("Employee Information")'
);
}
async navigateToEmployeeList() {
await this.pimMenu.click();
await this.page.waitForURL(
'**/pim/viewEmployeeList'
);
}
async verifyEmployeePage() {
await expect(
this.employeeInfoHeader
).toBeVisible();
}
}
module.exports = PimPage;