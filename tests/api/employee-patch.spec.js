const apiLocator = require('../../src/utils/ApiRetryUtil');
const ApiLogger = require('../../src/utils/ApiLogger');
const { test, expect } = require('@playwright/test');
const EmployeeApi = require('../../src/api/EmployeeApi');
test('@api @regression Verify Employee PATCH',
async ({}, testInfo) => {
const api = new EmployeeApi();
const payload = {
name: 'PatchedJohn'
};
const startTime = Date.now();
const response = await api.patchEmployee(
'https://reqres.in/api/users/2',
payload
);
await ApiLogger.log(
testInfo,
'PATCH',
'/users/2',
payload,
response,
startTime
);
expect(response.status()).toBe(200);
});