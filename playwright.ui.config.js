const { defineConfig } = require('@playwright/test');
const environments = {
QA: require('./config/environments/qa.json').baseUrl,
UAT: require('./config/environments/uat.json').baseUrl,
STAGING: require('./config/environments/staging.json').baseUrl
};
const browsers = ['chromium', 'firefox', 'webkit'];
const projects = Object.entries(environments).flatMap(
([env, baseURL]) =>
browsers.map(browser => ({
name: `${env}-${browser}`,
use: {
browserName: browser,
baseURL
}
}))
);
module.exports = defineConfig({
testDir: './tests/ui',
fullyParallel: true,
timeout: 60000,
expect: {
timeout: 10000
},
retries: process.env.CI ? 2 : 1,
workers: process.env.CI ? 12 : 9,
reporter: [
['list'],
[
'html',
{
outputFolder: 'playwright-report'
}
],
['allure-playwright']
],
use: {
headless:true, 
screenshot: "only-on-failure",
trace: 'on-first-retry',
video: "retain-on-failure",
viewport: {
width: 1920,
height: 1080
}
},
projects
});
