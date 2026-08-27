const { defineConfig } = require('@playwright/test');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({
    path: path.resolve(__dirname, '.env.crud')
});
const environments = require(
    './api-crud-config/config/environments'
);
console.log('========================================');
console.log('CRUD PLAYWRIGHT CONFIG');
console.log('========================================');
console.log('Base URL:', environments.baseURL);
console.log('Authentication: None');
console.log('========================================');
module.exports = defineConfig({
    testDir: './tests-api',
    testMatch: '**/test.spec.js',
    timeout: 60000,
    expect: {
        timeout: 10000
    },
    workers: 1,
    fullyParallel: false,
    reporter: [
        ['list'],
        [
            'html',
            {
                outputFolder: 'playwright-crud-report',
                open: 'never'
            }
        ]
    ],
    use: {
        baseURL: environments.baseURL,
        extraHTTPHeaders: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        trace: 'retain-on-failure'
    }
});