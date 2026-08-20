# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.js >> @regression Verify Employee List Page
- Location: tests\ui\login.spec.js:6:1

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: expect(locator).toBeVisible() failed

Locator: locator('h6')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('h6')

```

```
Test timeout of 60000ms exceeded while running "afterEach" hook.
```

# Test source

```ts
  1  | const base = require('@playwright/test');
  2  | const fs = require('fs');
  3  | exports.test = base.test.extend({
  4  | networkLogs: async ({ page }, use) => {
  5  | const logs = [];
  6  | page.on('request', req => {
  7  | logs.push(
  8  | `REQUEST ==> ${req.method()} ${req.url()}`
  9  | );
  10 | });
  11 | page.on('response', async res => {
  12 | logs.push(
  13 | `RESPONSE ==> ${res.status()} ${res.url()}`
  14 | );
  15 | });
  16 | await use(logs);
  17 | },
  18 | consoleLogs: async ({ page }, use) => {
  19 | const logs = [];
  20 | page.on('console', msg => {
  21 | logs.push(
  22 | `[${msg.type()}] ${msg.text()}`
  23 | );
  24 | });
  25 | await use(logs);
  26 | }
  27 | });
  28 | exports.expect = base.expect;
> 29 | exports.test.afterEach(async ({
     |              ^ Test timeout of 60000ms exceeded while running "afterEach" hook.
  30 | page,
  31 | networkLogs,
  32 | consoleLogs
  33 | }, testInfo) => {
  34 | const screenshotPath =
  35 | `test-results/${Date.now()}-${testInfo.title}.png`;
  36 | await page.screenshot({
  37 | path: screenshotPath,
  38 | fullPage: true
  39 | });
  40 | await testInfo.attach(
  41 | 'Screenshot',
  42 | {
  43 | path: screenshotPath,
  44 | contentType: 'image/png'
  45 | }
  46 | );
  47 | await testInfo.attach(
  48 | 'Browser Console Logs',
  49 | {
  50 | body: Buffer.from(consoleLogs.join('\n')),
  51 | contentType: 'text/plain'
  52 | }
  53 | );
  54 | await testInfo.attach(
  55 | 'Network Logs',
  56 | {
  57 | body: Buffer.from(networkLogs.join('\n')),
  58 | contentType: 'text/plain'
  59 | }
  60 | );
  61 | const video = testInfo.attachments.find(
  62 | a => a.name === 'video'
  63 | );
  64 | if (video?.path) {
  65 | await testInfo.attach(
  66 | 'Execution Video',
  67 | {
  68 | path: video.path,
  69 | contentType: 'video/webm'
  70 | }
  71 | );
  72 | }
  73 | const trace = testInfo.attachments.find(
  74 | a => a.name === 'trace'
  75 | );
  76 | if (trace?.path) {
  77 | await testInfo.attach(
  78 | 'Playwright Trace',
  79 | {
  80 | path: trace.path,
  81 | contentType: 'application/zip'
  82 | }
  83 | );
  84 | }
  85 | });
```