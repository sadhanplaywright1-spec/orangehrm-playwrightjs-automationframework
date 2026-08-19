const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
testDir: './tests/api',
timeout: 60000,
retries:process.env.CI ? 2 : 1,
workers:process.env.CI ? 4 : 2,
fullyParallel: true,
reporter: [
['list'],
['html', {
outputFolder: 'api-playwright-report'}],
['allure-playwright']],
use: {trace: 'retain-on-failure'},
projects: [{name: 'api'},                                                                                                                   
{name: 'QA',use: {apiBaseUrl: require('./config/environments/qa.json').apiBaseUrl}},
{name: 'UAT',use: {apiBaseUrl: require('./config/environments/uat.json').apiBaseUrl}},
{name: 'STAGING',use: {apiBaseUrl: require('./config/environments/staging.json').apiBaseUrl}}],
});