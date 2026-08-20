const base = require('@playwright/test');
const fs = require('fs');
exports.test = base.test.extend({
networkLogs: async ({ page }, use) => {
const logs = [];
page.on('request', req => {
logs.push(
`REQUEST ==> ${req.method()} ${req.url()}`
);
});
page.on('response', async res => {
logs.push(
`RESPONSE ==> ${res.status()} ${res.url()}`
);
});
await use(logs);
},
consoleLogs: async ({ page }, use) => {
const logs = [];
page.on('console', msg => {
logs.push(
`[${msg.type()}] ${msg.text()}`
);
});
await use(logs);
}
});
exports.expect = base.expect;
exports.test.afterEach(async ({
page,
networkLogs,
consoleLogs
}, testInfo) => {
const screenshotPath =
`test-results/${Date.now()}-${testInfo.title}.png`;
await page.screenshot({
path: screenshotPath,
fullPage: true
});
await testInfo.attach(
'Screenshot',
{
path: screenshotPath,
contentType: 'image/png'
}
);
await testInfo.attach(
'Browser Console Logs',
{
body: Buffer.from(consoleLogs.join('\n')),
contentType: 'text/plain'
}
);
await testInfo.attach(
'Network Logs',
{
body: Buffer.from(networkLogs.join('\n')),
contentType: 'text/plain'
}
);
const video = testInfo.attachments.find(
a => a.name === 'video'
);
if (video?.path) {
await testInfo.attach(
'Execution Video',
{
path: video.path,
contentType: 'video/webm'
}
);
}
const trace = testInfo.attachments.find(
a => a.name === 'trace'
);
if (trace?.path) {
await testInfo.attach(
'Playwright Trace',
{
path: trace.path,
contentType: 'application/zip'
}
);
}
});