const RetryLocator = require('../utils/RetryLocator');
class LoginPage {
constructor(page) {
this.page = page;
this.usernameTxt = page.locator('input[name="username"]');
this.passwordTxt = page.locator('input[name="password"]');
this.loginBtn = page.locator('button[type="submit"]');
}
async login(username, password) {
await RetryLocator.fill(
this.usernameTxt,
username
);
await RetryLocator.fill(
this.passwordTxt,
password
);
await RetryLocator.click(
this.loginBtn
);
}
}
module.exports = LoginPage;