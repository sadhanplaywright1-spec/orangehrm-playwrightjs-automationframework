const base = require('@playwright/test');
const test = base.extend({});
test.afterEach(async ({ page }, testInfo) => {
// Capture screenshot only if test failed
if (testInfo.status !== testInfo.expectedStatus) {
const screenshotPath =
`screenshots/${testInfo.title.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
await page.screenshot({
path: screenshotPath,
fullPage: true
});
// Attach screenshot to Playwright Report
await testInfo.attach(
'Failure Screenshot',
{
path: screenshotPath,
contentType: 'image/png'
}
);
console.log(
`Screenshot captured: ${screenshotPath}`
);
}
});
module.exports = {
test,
expect: base.expect
};