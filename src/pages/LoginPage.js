const BasePage = require('./BasePage');
class LoginPage extends BasePage {
constructor(page) {
super(page);
this.username =
page.locator('input[name="username"]');
this.password =
page.locator('input[name="password"]');
this.loginBtn =
page.locator('button[type="submit"]');
}
async login(username, password) {
await this.fill(this.username, username);
await this.fill(this.password, password);
await this.click(this.loginBtn);
}
}
module.exports = LoginPage;