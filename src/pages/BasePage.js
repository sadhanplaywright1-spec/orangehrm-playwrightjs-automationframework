const RetryLocator = require('../../src/utils/RetryLocator');
class BasePage {
constructor(page) {
this.page = page;
}
async click(locator) {
await RetryLocator.click(locator);
}
async fill(locator, value) {
await locator.fill(value);
}
async getText(locator) {
return await locator.textContent();
}
async waitFor(locator) {
await locator.waitFor({
state: 'visible'
});
}
}
module.exports = BasePage;
