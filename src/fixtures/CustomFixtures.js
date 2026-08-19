const base = require('@playwright/test');
const test = base.test.extend({});
test.afterEach(async ({ page }, testInfo) => {
if (testInfo.status !== testInfo.expectedStatus) {
// Screenshot
const screenshotPath =
testInfo.outputPath('failure-screenshot.png');
await page.screenshot({
path: screenshotPath,
fullPage: true
});
await testInfo.attach(
'Failure Screenshot',
{
path: screenshotPath,
contentType: 'image/png'
}
);
console.log(`Screenshot attached: ${screenshotPath}`);
}
// Video
const video = page.video();
if (video) {
try {
const videoPath = await video.path();
await testInfo.attach(
'Execution Video',
{
path: videoPath,
contentType: 'video/webm'
}
);
console.log(`Video attached: ${videoPath}`);
} catch (error) {
console.log('Video attachment skipped');
}
}
});
module.exports = {
test,
expect: base.expect
};