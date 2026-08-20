const apiLocator = require('../../src/utils/ApiRetryUtil');
const ApiLogger = require('../../src/utils/ApiLogger');
const { test, expect } = require('@playwright/test');
const EmployeeApi = require('../../src/api/EmployeeApi');
test('@api @regression Verify Employee POST',
async ({}, testInfo) => {
const api = new EmployeeApi();
const payload = {
name: 'Sadhan',
job: 'QA Engineer'
};
const startTime = Date.now();
const response = await api.createEmployee(
'https://reqres.in/api/users',
payload
);
console.log(await response.text());
await ApiLogger.log(
testInfo,
'POST',
'/users',
payload,
response,
startTime
);
expect(response.status()).toBe(201);
});