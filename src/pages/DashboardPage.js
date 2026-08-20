const BasePage = require('./BasePage');
class DashboardPage extends BasePage {
constructor(page) {
super(page);
this.dashboardHeader =
page.locator(
'h6:has-text("Dashboard")'
);
}
async verifyDashboard() {
await this.page.waitForURL('**/dashboard/index');
await expect(this.dashboardTitle
).toBeVisible({timeout: 10000
})
}
}
module.exports = DashboardPage;