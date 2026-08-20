const apiLocator = require('../../src/utils/ApiRetryUtil');
const ApiLogger = require('../../src/utils/ApiLogger');
const { test, expect } = require('@playwright/test');
const EmployeeApi = require('../../src/api/EmployeeApi');
test('@api @smoke Verify Employee PUT',
async ({}, testInfo) => {
const api = new EmployeeApi();
const payload = {
name: 'Sadhan',
job: 'QA Lead'
};
const startTime = Date.now();
const response = await api.updateEmployee(
'https://reqres.in/api/users/2',
payload
);
await ApiLogger.log(
testInfo,
'PUT',
'/users/2',
payload,
response,
startTime
);
expect(response.status()).toBe(200);
});