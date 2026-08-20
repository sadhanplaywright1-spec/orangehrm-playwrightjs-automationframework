const apiLocator = require('../../src/utils/ApiRetryUtil');
const ApiLogger = require('../../src/utils/ApiLogger');
const { test, expect } = require('@playwright/test');
const EmployeeApi = require('../../src/api/EmployeeApi');
test('@api @regression Verify Employee DELETE',
async ({}, testInfo) => {
const api = new EmployeeApi();
const startTime = Date.now();
const response = await api.deleteEmployee(
'https://reqres.in/api/users/2'
);
await ApiLogger.log(
testInfo,
'DELETE',
'/users/2',
{},
response,
startTime
);
expect(response.status()).toBe(204);
});