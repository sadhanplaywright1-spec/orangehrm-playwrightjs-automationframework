const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
testDir: './tests/ui',
fullyParallel: true,
timeout: 60000,
expect: {
timeout: 10000
},
retries: process.env.CI ? 2 : 1,
workers: process.env.CI ? 6 : 3,
reporter: [
['list'],
['html', {
outputFolder: 'playwright-report'
}],
['allure-playwright']
],
use: {
headless: false,
trace: 'retain-on-failure',
screenshot: 'only-on-failure',
video: 'retain-on-failure'
},
/*use: {
headless: process.env.CI ? true : false,
trace: 'retain-on-failure',
screenshot: 'only-on-failure',
video: 'retain-on-failure',
viewport: {
width: 1920,
height: 1080
}*/
projects: [
{
name: 'QA',
use: {
browserName: 'chromium',
baseURL: require('./config/environments/qa.json').baseUrl
}
},
{
name: 'UAT',
use: {
browserName: 'chromium',
baseURL: require('./config/environments/uat.json').baseUrl
}
},
{
name: 'STAGING',
use: {
browserName: 'chromium',
baseURL: require('./config/environments/staging.json').baseUrl
}
}
]
});