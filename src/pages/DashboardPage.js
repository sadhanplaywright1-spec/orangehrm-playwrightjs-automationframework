const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');
class DashboardPage extends BasePage {
constructor(page) {
super(page);
this.dashboardHeader = page.locator(
'h6:has-text("Dashboard")'
);
}
async verifyDashboard() {
await this.page.waitForURL(
'**/dashboard/**',
{ timeout: 30000 }
);
await expect(
this.dashboardHeader
).toBeVisible({
timeout: 10000
});
}
}
module.exports = DashboardPage;