require('dotenv').config();
const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
testDir: './tests/api',
timeout: 60000,
fullyParallel: true,
retries: process.env.CI ? 2 : 1,
workers: process.env.CI ? 4 : 2,
reporter: [
['list'],
['html', {
outputFolder: 'api-playwright-report'
}],
['allure-playwright']
],
use: {
    baseURL: process.env.BASE_URL,
trace: 'on-first-retry'},
projects: [
{name: 'QA',
use: {
apiBaseUrl:
require('./config/environments/qa.json').apiBaseUrl
}
},
{
name: 'UAT',
use: {
apiBaseUrl:
require('./config/environments/uat.json').apiBaseUrl
}
},
{
name: 'STAGING',
use: {
apiBaseUrl:
require('./config/environments/staging.json').apiBaseUrl
}}
]
});