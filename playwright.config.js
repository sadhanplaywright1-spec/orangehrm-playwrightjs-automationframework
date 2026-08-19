const { defineConfig } =require('@playwright/test');
module.exports = defineConfig({ 
testDir: './tests/ui',
fullyParallel: true,
timeout: 60000,
expect: {timeout: 10000},
retries:process.env.CI ? 2 : 1,
workers:process.env.CI ? 6 : 3,
reporter: [['list'],['html'],['allure-playwright']],
use:{
headless:false,
/*launchOptions: {
slowMo: 6000},*/
trace:'retain-on-failure',
screenshot:'only-on-failure',
video:'retain-on-failure'
},
projects:[
{name: 'QA',use: {baseURL: require('./config/environments/qa.json').baseUrl}},
{name: 'UAT',use: {baseURL: require('./config/environments/uat.json').baseUrl}},
{name: 'STAGING',use: {baseURL: require('./config/environments/staging.json').baseUrl}},
{name:'chromium',testIgnore: ['**/api/**'],use:{browserName:'chromium'}},
{name:'firefox',testIgnore: ['**/api/**'],use:{browserName:'firefox'}},
{name:'webkit',testIgnore: ['**/api/**'],use:{browserName:'webkit'}}]
});